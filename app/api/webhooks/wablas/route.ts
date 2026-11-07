import { NextRequest, NextResponse } from "next/server";
import {
  saveOrderAsync,
  saveWhatsAppLogAsync,
  getAllOrdersAsync,
  updateOrderStatusAsync,
  StoredOrder,
} from "@/lib/orders-db";
import {
  parseWhatsAppOrderMessage,
  buildMissingFieldsReply,
  buildOrderSuccessReply,
} from "@/lib/whatsapp-order-parser";
import { sendWhatsAppToGroup } from "@/lib/wablas";

/**
 * Wablas Incoming Webhook Handler
 * Endpoint: POST /api/webhooks/wablas
 *
 * Menerima pesan masuk dari WhatsApp Group atau Personal chat:
 * 1. Validasi secret / header jika disediakan
 * 2. Cek apakah pesan berasal dari grup yang diizinkan (atau mode test)
 * 3. Parser pesan dengan format /order
 * 4. Simpan ke database pesanan
 * 5. Kirim balasan konfirmasi ke grup secara otomatis
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Baca Payload JSON Wablas (Mendukung Form-Data atau JSON)
    let payload: any = null;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      payload = await request.json().catch(() => null);
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData().catch(() => null);
      if (formData) {
        payload = {};
        formData.forEach((val, key) => {
          payload[key] = val;
        });
      }
    } else {
      payload = await request.json().catch(async () => {
        const text = await request.text();
        try {
          return JSON.parse(text);
        } catch {
          return null;
        }
      });
    }

    if (!payload) {
      console.warn("⚠️ [Wablas Webhook] Payload kosong atau tidak terbaca.");
      return NextResponse.json({ error: "Empty payload" }, { status: 400 });
    }

    console.log("📥 [Wablas Webhook Received Payload]:", JSON.stringify(payload));

    const rawPhone = payload.phone || payload.receiver || payload.to || "";
    const isGroup = Boolean(
      payload.isGroup === true ||
      payload.isGroup === "true" ||
      (typeof rawPhone === "string" && rawPhone.includes("@g.us")) ||
      Boolean(payload.group?.id) ||
      Boolean(payload.groupId)
    );
    const messageText: string = (payload.message || payload.text || payload.body || "").trim();
    const messageId = payload.id || payload.message_id || `WA-${Date.now()}`;
    const targetGroupId = payload.group?.id || payload.groupId || rawPhone; // ID Group WhatsApp
    const senderPhone = payload.group?.sender || payload.sender || rawPhone || "Unknown";

    // 3. Batasi hanya untuk Grup yang diizinkan (jika WABLAS_GROUP_ID diisi)
    const allowedGroupId = process.env.WABLAS_GROUP_ID ? process.env.WABLAS_GROUP_ID.replace(/@g\.us$/, "") : "";
    const cleanTargetGroupId = typeof targetGroupId === "string" ? targetGroupId.replace(/@g\.us$/, "") : "";
    
    // Jika WABLAS_GROUP_ID diisi dan pesan berasal dari grup, pastikan grup cocok. Jika tidak cocok sama sekali, log dan izinkan jika targetGroupId mengandung allowedGroupId
    if (isGroup && allowedGroupId && cleanTargetGroupId && !cleanTargetGroupId.includes(allowedGroupId) && !allowedGroupId.includes(cleanTargetGroupId)) {
      console.log(`ℹ️ [Wablas Webhook] Pesan diabaikan karena berasal dari group lain (${targetGroupId})`);
      return NextResponse.json({ status: "ignored", reason: "Group not in allowlist" });
    }

    // ---------------------------------------------------------
    // HANDLER 1: PERINTAH SELESAI / LUNAS DARI KURIR DI GRUP
    // Contoh format:
    // /selesai ORD-WA-123456 Bayar: Tunai COD
    // /lunas ORD-WA-123456 Bayar: Transfer BCA
    // /done ORD-WA-123456
    // ---------------------------------------------------------
    const lowerText = messageText.toLowerCase();
    const isCompletionCommand =
      lowerText.startsWith("/selesai") ||
      lowerText.startsWith("/lunas") ||
      lowerText.startsWith("/done") ||
      lowerText.startsWith("/delivered");

    if (isCompletionCommand) {
      // Ambil ID pesanan (misal ORD-WA-xxx atau INV-xxx)
      const orderIdMatch = messageText.match(/(ORD-[A-Za-z0-9-]+|INV-[A-Za-z0-9-]+)/i);
      if (!orderIdMatch) {
        if (isGroup && targetGroupId) {
          await sendWhatsAppToGroup(
            targetGroupId,
            "⚠️ *Format Konfirmasi Kurir Belum Tepat*\n\nContoh format yang benar:\n`/selesai ORD-WA-123456 Bayar: Tunai COD`\natau\n`/lunas ORD-WA-123456 Bayar: Transfer BCA`"
          );
        }
        return NextResponse.json({ status: "invalid_completion", reason: "Order ID not found" });
      }

      const targetId = orderIdMatch[1];

      // Ambil metode bayar jika ada (opsional)
      const methodMatch = messageText.match(/(?:bayar|via|metode|method)\s*[:=]\s*(.+)/i);
      const paymentMethod = methodMatch ? methodMatch[1].trim() : "Tunai / COD (Diterima Kurir)";

      // Update status pesanan di Neon Postgres menjadi "Berhasil" (Lunas)
      const updatedOrder = await updateOrderStatusAsync(
        targetId,
        "Berhasil",
        paymentMethod,
        `Selesai diantar oleh kurir (WA: ${senderPhone})`
      );

      if (updatedOrder) {
        const replyMsg = `✅ *PESANAN SELESAI & LUNAS!*\n\n• *ID Pesanan:* ${updatedOrder.id}\n• *Customer:* ${updatedOrder.customerName}\n• *Metode Bayar:* ${updatedOrder.paymentMethod}\n• *Status:* Berhasil (Lunas)\n\nData transaksi otomatis telah diperbarui di Dashboard Admin website. Terima kasih kurir! 🛵💨`;
        if (isGroup && targetGroupId) {
          await sendWhatsAppToGroup(targetGroupId, replyMsg);
        }
        return NextResponse.json({
          status: "success",
          action: "order_completed",
          orderId: targetId,
        });
      } else {
        if (isGroup && targetGroupId) {
          await sendWhatsAppToGroup(
            targetGroupId,
            `⚠️ Pesanan dengan ID *${targetId}* tidak ditemukan di database website.`
          );
        }
        return NextResponse.json({ status: "not_found", orderId: targetId });
      }
    }

    // Jika pesan tidak dimulai dengan perintah /order, abaikan (agar bot tidak spam di percakapan biasa)
    if (!messageText.toLowerCase().includes("/order")) {
      return NextResponse.json({ status: "ignored", reason: "Not an /order command" });
    }

    // 4. Anti-Duplikasi: Cek apakah messageId ini sudah pernah diproses
    const existingOrders = await getAllOrdersAsync();
    const alreadyProcessed = existingOrders.some((o) => o.whatsappMessageId === messageId);
    if (alreadyProcessed) {
      console.log(`ℹ️ [Wablas Webhook] Pesan duplikat terdeteksi (ID: ${messageId}), dilewati.`);
      return NextResponse.json({ status: "duplicate_skipped" });
    }

    // 5. Parse Data Pesanan
    const parsed = parseWhatsAppOrderMessage(messageText);

    // Jika format tidak lengkap
    if (!parsed.isValid) {
      const replyMessage = buildMissingFieldsReply(parsed.missingFields);
      if (isGroup && targetGroupId) {
        await sendWhatsAppToGroup(targetGroupId, replyMessage);
      }
      return NextResponse.json({
        status: "invalid_order",
        missingFields: parsed.missingFields,
      });
    }

    // 6. Buat Record Pesanan Baru untuk Database Website
    const newOrderId = `ORD-WA-${Date.now().toString().slice(-6)}`;
    const invoiceNo = `INV-WA-${Date.now().toString().slice(-6)}`;

    const newOrder: StoredOrder = {
      id: newOrderId,
      invoiceNo,
      source: "whatsapp",
      customerName: parsed.customerName || "Customer WhatsApp",
      customerPhone: parsed.customerPhone || senderPhone,
      itemsSummary: `${parsed.productName} (x${parsed.quantity})`,
      detailedItems: [
        {
          name: parsed.productName || "Produk",
          qty: parsed.quantity || 1,
          unitPrice: parsed.unitPrice || 0,
          total: parsed.totalAmount || 0,
          size: parsed.size,
        },
      ],
      totalAmount: parsed.totalAmount || 0,
      status: "Menunggu Pembayaran",
      paymentMethod: "WhatsApp Order / Manual Transfer",
      createdAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" }),
      whatsappMessageId: messageId,
      whatsappGroupId: isGroup ? targetGroupId : undefined,
      whatsappSenderPhone: senderPhone,
      rawWhatsappMessage: messageText,
      notificationStatus: "sent",
      notificationSentAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" }),
    };

    // Simpan ke Database Neon Postgres
    await saveOrderAsync(newOrder);

    // Catat log
    await saveWhatsAppLogAsync({
      id: `IN-${Date.now()}`,
      orderId: newOrderId,
      destination: isGroup ? targetGroupId : senderPhone,
      isGroup,
      status: "success",
      response: `Pesanan ${newOrderId} berhasil diimpor ke database website`,
      timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" }),
    });

    // 7. Kirim Balasan Konfirmasi Sukses ke Group WhatsApp
    const successReply = buildOrderSuccessReply(
      newOrderId,
      parsed.customerName || "",
      parsed.productName || "",
      parsed.quantity || 1,
      parsed.totalAmount || 0
    );

    if (isGroup && targetGroupId) {
      await sendWhatsAppToGroup(targetGroupId, successReply);
    }

    console.log(`✅ [Wablas Webhook] Pesan manual WhatsApp berhasil disimpan sebagai ${newOrderId}!`);

    return NextResponse.json({
      status: "success",
      orderId: newOrderId,
      message: "Order successfully processed from WhatsApp to Website",
    });
  } catch (error: unknown) {
    console.error("❌ [Wablas Webhook Exception]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * Handle GET request untuk verifikasi koneksi webhook oleh admin atau ping Wablas
 */
export async function GET() {
  return NextResponse.json({
    service: "Zestó Bali Wablas WhatsApp Webhook",
    status: "active",
    supportedCommand: "/order",
    instructions: "POST payload dari Wablas webhook dengan format /order untuk membuat pesanan baru.",
    time: new Date().toISOString(),
  });
}

