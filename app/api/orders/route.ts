import { NextResponse } from "next/server";
import { getAllOrdersAsync } from "@/lib/orders-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const orders = await getAllOrdersAsync();
    return NextResponse.json(
      { success: true, orders },
      {
        headers: {
          "Cache-Control": "public, s-maxage=5, stale-while-revalidate=15",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

