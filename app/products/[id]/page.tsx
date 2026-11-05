import React from "react";
import ProductDetailClient from "@/components/ProductDetailClient";
import { FLAVORS_DATA } from "@/data/flavors";

export async function generateStaticParams() {
  return FLAVORS_DATA.map((f) => ({ id: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const flavor = FLAVORS_DATA.find((f) => f.id === id);
  const name = flavor ? flavor.name : "Sparkling Beverage";
  return {
    title: `${name} — Zestó Sparkling Refreshment`,
    description: `Nikmati kesegaran alami ${name} dari Zestó. Dibuat dengan sari buah asli Bali berkarbonasi halus.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailClient productId={id} />;
}

