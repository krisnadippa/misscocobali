import React from "react";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata = {
  title: "Checkout Pesanan — Zestó Sparkling Refreshment",
  description:
    "Selesaikan pesanan minuman segar Zestó dengan aman melalui payment gateway resmi Xendit Indonesia.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

