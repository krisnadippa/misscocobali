import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      amount,
      customerName,
      customerEmail,
      customerPhone,
      address,
      items,
      shippingCost,
    } = body;

    const secretKey = process.env.XENDIT_SECRET_KEY || "";
    const isRealKeyConfigured =
      secretKey.startsWith("xnd_") && !secretKey.includes("YOUR_SECRET_KEY_HERE");

    const externalId = `INV-ZST-${Date.now().toString().slice(-7)}`;

    // If real Xendit API key is configured in .env.local, call Xendit v2 Invoice API
    if (isRealKeyConfigured) {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const xenditPayload = {
          external_id: externalId,
          amount: Math.round(amount),
          payer_email: customerEmail || "customer@zestobali.com",
          description: `Pembelian Minuman Zestó Sparkling Bali (${externalId})`,
          customer: {
            given_names: customerName || "Customer Zesto",
            email: customerEmail || "customer@zestobali.com",
            mobile_number: customerPhone || "+6281234567890",
            addresses: [
              {
                city: "Denpasar",
                country: "Indonesia",
                postal_code: "80228",
                state: "Bali",
                street_line1: address || "Bali, Indonesia",
              },
            ],
          },
          items: Array.isArray(items)
            ? items.map((it: { name: string; quantity: number; price: number }) => ({
                name: it.name,
                quantity: it.quantity,
                price: it.price,
                category: "Beverage",
              }))
            : [],
          fees:
            shippingCost > 0
              ? [
                  {
                    type: "Pengiriman Dingin Bali",
                    value: Math.round(shippingCost),
                  },
                ]
              : [],
          success_redirect_url: `${baseUrl}/checkout?status=success&external_id=${externalId}`,
          failure_redirect_url: `${baseUrl}/checkout?status=failed`,
          currency: "IDR",
        };

        const authHeader = `Basic ${Buffer.from(secretKey + ":").toString("base64")}`;

        const xenditResponse = await fetch("https://api.xendit.co/v2/invoices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify(xenditPayload),
        });

        const xenditData = await xenditResponse.json();

        if (xenditResponse.ok && xenditData.invoice_url) {
          return NextResponse.json({
            success: true,
            mode: "live_xendit",
            invoice_url: xenditData.invoice_url,
            id: xenditData.id,
            external_id: xenditData.external_id,
          });
        }

        // If Xendit returned an API error (e.g., invalid permissions or invalid test phone)
        console.warn("Xendit API warning, fallback to simulation:", xenditData);
        return NextResponse.json({
          success: true,
          mode: "simulation",
          external_id: externalId,
          warning: xenditData.message || "Xendit response failed, using interactive simulation.",
        });
      } catch (apiError) {
        console.error("Xendit API connection failed:", apiError);
        return NextResponse.json({
          success: true,
          mode: "simulation",
          external_id: externalId,
          warning: "Gagal menghubungi Xendit server, dialihkan ke simulasi.",
        });
      }
    }

    // Default: Simulation mode (when API key is still the placeholder)
    return NextResponse.json({
      success: true,
      mode: "simulation",
      external_id: externalId,
      message:
        "Xendit API Key belum diisi di .env.local. Mode simulasi pembayaran Xendit aktif secara otomatis.",
    });
  } catch (err) {
    console.error("Invoice creation route error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

