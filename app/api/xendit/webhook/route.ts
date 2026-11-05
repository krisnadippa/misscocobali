import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. Verifikasi callback token dari Xendit
    const callbackTokenHeader = request.headers.get("x-callback-token");
    const configuredToken = process.env.XENDIT_WEBHOOK_VERIFICATION_TOKEN;

    if (configuredToken && callbackTokenHeader !== configuredToken) {
      console.warn("⚠️ [Xendit Webhook] Token verifikasi tidak cocok!");
      return NextResponse.json(
        { error: "Unauthorized webhook token" },
        { status: 401 }
      );
    }

    const payload = await request.json();
    console.log("🔔 [Xendit Webhook Diterima]:", {
      id: payload.id,
      external_id: payload.external_id,
      status: payload.status,
      amount: payload.amount,
      payment_method: payload.payment_method,
      payment_channel: payload.payment_channel,
      paid_at: payload.paid_at,
    });

    // Contoh penanganan status pembayaran:
    if (payload.status === "PAID" || payload.status === "SETTLED") {
      // Pembayaran berhasil diselesaikan oleh pelanggan
      console.log(`✅ Pesanan ${payload.external_id} BERHASIL dibayar!`);
      // Disini Anda dapat mengupdate status database transaksi jika nanti sudah menggunakan DB.
    } else if (payload.status === "EXPIRED") {
      console.log(`⌛ Pesanan ${payload.external_id} KADALUARSA.`);
    }

    return NextResponse.json({
      status: "success",
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("❌ [Xendit Webhook Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

