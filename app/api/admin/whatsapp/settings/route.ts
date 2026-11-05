import { NextRequest, NextResponse } from "next/server";
import {
  getWablasDeviceStatus,
  sendWhatsAppToGroup,
  sendWhatsAppMessage,
} from "@/lib/wablas";
import { getWhatsAppLogs } from "@/lib/orders-db";

/**
 * GET: Mengambil status koneksi Wablas, webhook URL, dan log notifikasi
 */
export async function GET() {
  try {
    const status = await getWablasDeviceStatus();
    const logs = getWhatsAppLogs();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const webhookUrl = `${baseUrl.replace(/\/$/, "")}/api/webhooks/wablas`;

    // Masked Token untuk keamanan frontend (jangan tampilkan full token)
    const rawToken = process.env.WABLAS_API_TOKEN || "";
    const maskedToken =
      rawToken.length > 8
        ? `${rawToken.slice(0, 4)}••••••••••••${rawToken.slice(-4)}`
        : rawToken ? "••••••••" : "";

    return NextResponse.json({
      success: true,
      data: {
        serverUrl: process.env.WABLAS_API_URL || "https://solo.wablas.com",
        maskedToken,
        groupId: process.env.WABLAS_GROUP_ID || "",
        webhookUrl,
        deviceStatus: status,
        recentLogs: logs.slice(0, 20),
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

/**
 * POST: Tes kirim pesan WhatsApp ke group atau nomor percobaan
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, target, message } = body;

    if (action === "test_group") {
      const groupId = target || process.env.WABLAS_GROUP_ID;
      if (!groupId) {
        return NextResponse.json(
          { success: false, error: "Group ID WhatsApp tujuan belum diisi" },
          { status: 400 }
        );
      }
      const testMsg = message || "🧪 *Pesan Uji Coba dari Sistem Zestó Bali Website*\n\nKoneksi Wablas API berjalan normal dan siap mengirim notifikasi pesanan ke grup ini.";
      const res = await sendWhatsAppToGroup(groupId, testMsg);
      return NextResponse.json(res);
    }

    if (action === "test_personal") {
      if (!target) {
        return NextResponse.json(
          { success: false, error: "Nomor WhatsApp tujuan belum diisi" },
          { status: 400 }
        );
      }
      const testMsg = message || "🧪 Halo, ini adalah pesan uji coba dari sistem Zestó Bali WhatsApp Gateway.";
      const res = await sendWhatsAppMessage(target, testMsg);
      return NextResponse.json(res);
    }

    return NextResponse.json(
      { success: false, error: "Action tidak dikenali (gunakan 'test_group' atau 'test_personal')" },
      { status: 400 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

