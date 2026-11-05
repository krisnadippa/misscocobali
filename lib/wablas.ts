import { saveWhatsAppLog, updateOrderNotificationStatus, StoredOrder } from "./orders-db";

export interface WablasSendResult {
  success: boolean;
  messageId?: string;
  response?: unknown;
  error?: string;
}

/**
 * Normalisasi nomor HP Indonesia (08xxx -> 628xxx)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    return "62" + cleaned.slice(1);
  }
  if (cleaned.startsWith("62")) {
    return cleaned;
  }
  return cleaned;
}

/**
 * Helper untuk memanggil API Wablas dengan timeout aman
 */
async function callWablasApi(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<WablasSendResult> {
  const apiUrl = (process.env.WABLAS_API_URL || "https://kudus.wablas.com").replace(/\/$/, "");
  const token = process.env.WABLAS_API_TOKEN || "";
  const secretKey = process.env.WABLAS_SECRET_KEY || "";

  if (!token) {
    return {
      success: false,
      error: "Wablas API Token belum dikonfigurasi di file environment (.env.local)",
    };
  }

  // Format otentikasi resmi Wablas: {token}.{secret_key} atau {token}
  const authHeader = secretKey && !token.includes(".") ? `${token}.${secretKey}` : token;

  const fullUrl = `${apiUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik timeout

  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await res.json().catch(() => null);

    if (res.ok && json && (json.status === true || json.status === "success" || json.code === 200)) {
      return {
        success: true,
        response: json,
      };
    }

    return {
      success: false,
      error: json?.message || `Wablas API error with status: ${res.status}`,
      response: json,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: errorMessage.includes("aborted") ? "Koneksi ke Wablas timeout" : errorMessage,
    };
  }
}

/**
 * Kirim pesan teks ke nomor WhatsApp personal
 */
export async function sendWhatsAppMessage(
  targetPhone: string,
  message: string
): Promise<WablasSendResult> {
  const phone = formatPhoneNumber(targetPhone);
  return callWablasApi("/api/send-message", {
    phone,
    message,
  });
}

/**
 * Kirim pesan WhatsApp ke GROUP resmi via Wablas
 */
export async function sendWhatsAppToGroup(
  groupId: string,
  message: string
): Promise<WablasSendResult> {
  if (!groupId) {
    return {
      success: false,
      error: "Group ID WhatsApp tujuan kosong / belum diatur",
    };
  }

  // Bersihkan ID grup (hapus @g.us jika ada agar format angka murni sesuai payload Wablas)
  const cleanGroupId = groupId.replace(/@g\.us$/, "");

  return callWablasApi("/api/send-message", {
    phone: cleanGroupId,
    message,
    isGroup: "true",
  });
}

/**
 * Kirim Notifikasi Pesanan Baru dari Website ke WhatsApp Group
 */
export async function notifyNewOrderToWhatsAppGroup(order: StoredOrder): Promise<WablasSendResult> {
  const targetGroupId = process.env.WABLAS_GROUP_ID || "";

  // Template Pesan Sesuai Format Spesifikasi
  const textMessage = `🔔 *PESANAN BARU DARI WEBSITE*

*ID Pesanan:* ${order.id}
*Invoice:* ${order.invoiceNo}
*Nama Customer:* ${order.customerName}
*Nomor HP:* ${order.customerPhone}
*Alamat:* ${order.address || "Ambil di Toko / Bali Area"}${order.mapsUrl ? `\n📍 *Link Google Maps Kurir:*\n${order.mapsUrl}` : ""}

*Rincian Item:*
${order.detailedItems && order.detailedItems.length > 0
  ? order.detailedItems.map((it) => `• ${it.name} (x${it.qty}) - Rp ${(it.total || it.unitPrice * it.qty).toLocaleString("id-ID")}`).join("\n")
  : `• ${order.itemsSummary}`}

*Total Biaya:* Rp ${order.totalAmount.toLocaleString("id-ID")}
*Metode Bayar:* ${order.paymentMethod}
*Status:* ${order.status}

Silakan cek dashboard admin untuk proses pesanan & tracking kurir dingin.`;

  if (!targetGroupId) {
    updateOrderNotificationStatus(order.id, "skipped", "WABLAS_GROUP_ID belum dikonfigurasi");
    return {
      success: false,
      error: "WABLAS_GROUP_ID belum diset di .env.local",
    };
  }

  const result = await sendWhatsAppToGroup(targetGroupId, textMessage);

  // Catat log
  saveWhatsAppLog({
    id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    orderId: order.id,
    destination: targetGroupId,
    isGroup: true,
    status: result.success ? "success" : "failed",
    response: JSON.stringify(result.response || {}),
    error: result.error,
    timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" }),
  });

  updateOrderNotificationStatus(order.id, result.success ? "sent" : "failed", result.error);

  return result;
}

/**
 * Cek status device Wablas (untuk panel admin)
 */
export async function getWablasDeviceStatus(): Promise<{
  connected: boolean;
  phone?: string;
  quota?: string | number;
  package?: string;
  raw?: unknown;
  error?: string;
}> {
  const apiUrl = (process.env.WABLAS_API_URL || "https://solo.wablas.com").replace(/\/$/, "");
  const token = process.env.WABLAS_API_TOKEN || "";

  if (!token) {
    return {
      connected: false,
      error: "Token API belum diisi",
    };
  }

  try {
    const res = await fetch(`${apiUrl}/api/device/info?token=${encodeURIComponent(token)}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const json = await res.json().catch(() => null);

    if (res.ok && json && (json.status === true || json.status === "success" || json.code === 200)) {
      const data = json.data || {};
      return {
        connected: data.status === "connected" || data.connected === true,
        phone: data.phone || data.sender || data.device_phone,
        quota: data.quota ?? data.messages_quota ?? "Free Trial",
        package: data.package || "Free Trial",
        raw: json,
      };
    }

    return {
      connected: false,
      error: json?.message || "Tidak dapat mengambil data device Wablas",
      raw: json,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      error: errorMsg,
    };
  }
}

