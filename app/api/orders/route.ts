import { NextResponse } from "next/server";
import { getAllOrders } from "@/lib/orders-db";

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

