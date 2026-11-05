import { NextRequest, NextResponse } from "next/server";
import { saveOrder, saveWhatsAppLog, getAllOrders, StoredOrder } from "@/lib/orders-db";
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
    // 1. Verifikasi Header / Token Keamanan (Opsional)
    const secretHeader = request.headers.get("x-wablas-secret") || request.headers.get("authorization");
    const configuredSecret = process.env.WABLAS_WEBHOOK_SECRET;

    if (configuredSecret && secretHeader && secretHeader !== configuredSecret && secretHeader !== `Bearer ${configuredSecret}`) {
      console.warn("⚠️ [Wablas Webhook] Token rahasia webhook tidak cocok.");
      return NextResponse.json({ error: "Unauthorized webhook" }, { status: 401 });
    }

    // 2. Baca Payload JSON Wablas
    const payload = await request.json().catch(() => null);

    if (!payload) {
      return NextResponse.json({ error: "Empty or invalid JSON body" }, { status: 400 });
    }

    console.log("📥 [Wablas Webhook Received]:", {
      event: payload.event,
      isGroup: payload.isGroup,
      phone: payload.phone,
      message: typeof payload.message === "string" ? payload.message.slice(0, 80) : "",
    });

    const isGroup = Boolean(payload.isGroup === true || payload.isGroup === "true" || (typeof payload.phone === "string" && payload.phone.includes("@g.us")));
    const messageText: string = (payload.message || "").trim();
    const messageId = payload.id || payload.message_id || `WA-${Date.now()}`;
    const targetGroupId = payload.phone; // Jika group, field phone berisi ID Group WhatsApp (cth: 120363xxx@g.us)
    const senderPhone = payload.group?.sender || payload.sender || payload.phone || "Unknown";

    // 3. Batasi hanya untuk Grup yang diizinkan (jika WABLAS_GROUP_ID diisi)
    const allowedGroupId = process.env.WABLAS_GROUP_ID;
    if (isGroup && allowedGroupId && targetGroupId !== allowedGroupId) {
      console.log(`ℹ️ [Wablas Webhook] Pesan diabaikan karena berasal dari group lain (${targetGroupId})`);
      return NextResponse.json({ status: "ignored", reason: "Group not in allowlist" });
    }

    // Jika pesan tidak dimulai dengan perintah /order, abaikan (agar bot tidak spam di percakapan biasa)
    if (!messageText.toLowerCase().includes("/order")) {
      return NextResponse.json({ status: "ignored", reason: "Not an /order command" });
    }

    // 4. Anti-Duplikasi: Cek apakah messageId ini sudah pernah diproses
    const existingOrders = getAllOrders();
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

    // Simpan ke Database
    saveOrder(newOrder);

    // Catat log
    saveWhatsAppLog({
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

