"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { FLAVORS_DATA, Flavor, formatRupiah } from "@/data/flavors";

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();

  // Find flavor or fallback to first
  const flavor: Flavor =
    FLAVORS_DATA.find((f) => f.id === productId) || FLAVORS_DATA[0];

  const [selectedPack, setSelectedPack] = useState<"single" | "4pack" | "12pack">("4pack");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("ingredients");
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Price calculations based on selected pack
  const basePrice = flavor.price;
  const packMultiplier = selectedPack === "single" ? 1 : selectedPack === "4pack" ? 3.75 : 10.5;
  const packPrice = Math.round((basePrice * packMultiplier) / 1000) * 1000;
  const totalPrice = packPrice * quantity;

  const packOptions = [
    {
      id: "single" as const,
      label: "1 Kaleng",
      sublabel: "330ml Slim Can",
      price: basePrice,
      savings: null,
      badge: null,
    },
    {
      id: "4pack" as const,
      label: "4-Pack Bundle",
      sublabel: "4x 330ml Cans",
      price: Math.round((basePrice * 3.75) / 1000) * 1000,
      savings: "Hemat 6%",
      badge: "Paling Populer",
    },
    {
      id: "12pack" as const,
      label: "12-Pack Wood Crate",
      sublabel: "12x 330ml Party Box",
      price: Math.round((basePrice * 10.5) / 1000) * 1000,
      savings: "Hemat 15%",
      badge: "Grosir / Event",
    },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: `${flavor.id}-${selectedPack}`,
      name: `${flavor.name} (${selectedPack === "single" ? "1 Kaleng" : selectedPack === "4pack" ? "4-Pack" : "12-Pack Crate"})`,
      price: packPrice,
      image: flavor.image,
      tag: flavor.tag,
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart({
      id: `${flavor.id}-${selectedPack}`,
      name: `${flavor.name} (${selectedPack === "single" ? "1 Kaleng" : selectedPack === "4pack" ? "4-Pack" : "12-Pack Crate"})`,
      price: packPrice,
      image: flavor.image,
      tag: flavor.tag,
    });
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Other flavors for recommendation section
  const otherFlavors = FLAVORS_DATA.filter((f) => f.id !== flavor.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-slate-900 font-sans selection:bg-[#C7F800] selection:text-black">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Top Header with Dark Green Background */}
      <div className="bg-[#13231B] border-b border-white/10">
        <Header />
      </div>

      <CartDrawer />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0a3321] transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/#flavors" className="hover:text-[#0a3321] transition-colors">
            Varian Rasa
          </Link>
          <span>/</span>
          <span className="text-[#0a3321] font-bold uppercase">{flavor.name}</span>
        </nav>
      </div>

      {/* Main Product Detail Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Showcase Visual */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-xl shadow-emerald-950/5 relative overflow-hidden flex flex-col items-center">
              {/* Tone Aura Backdrop */}
              <div
                className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ backgroundColor: flavor.bgTone || "#b5e800" }}
              />
              <div
                className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: "#0a3321" }}
              />

              {/* Badges on Top */}
              <div className="w-full flex items-center justify-between z-10 mb-4">
                <span className="bg-[#C7F800] text-black text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{flavor.tag} EDITION</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    title="Bagikan Tautan Produk"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#C7F800] text-slate-700 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    title="Simpan ke Favorit"
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                      isLiked
                        ? "bg-rose-500 text-white"
                        : "bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-500"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Main Product Image */}
              <div className="relative w-full aspect-[4/5] max-w-md my-4 rounded-2xl overflow-hidden group">
                <Image
                  src={flavor.image}
                  alt={`${flavor.name} Zestó Can`}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Taste Notes Pills */}
              <div className="w-full pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 z-10">
                {flavor.tasteNotes?.map((note) => (
                  <span
                    key={note.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#f4f8f4] text-[#0a3321] border border-black/5"
                  >
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: note.color }}
                    />
                    {note.name}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#e6f3eb] text-[#0a3321]">
                  ✦ 0g Sugar
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#e6f3eb] text-[#0a3321]">
                  ✦ 5 Kalori
                </span>
              </div>
            </div>

            {copied && (
              <div className="mt-3 text-center text-xs font-bold text-emerald-700 bg-emerald-100 py-2 rounded-xl">
                ✓ Tautan produk berhasil disalin ke clipboard!
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Options */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header Product Info */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#0a3321] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C7F800] inline-block" />
                ZESTÓ CRAFT SPARKLING SODA • BALI
              </p>
              <h1 className="font-condensed font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#0a3321] leading-none">
                {flavor.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">4.9 / 5.0</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">164 Ulasan Pembeli Terverifikasi</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Terjual 2.400+ Kaleng
                </span>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium">Harga Total Pesanan:</p>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="font-condensed font-black text-3xl sm:text-4xl text-[#0a3321]">
                    {formatRupiah(totalPrice)}
                  </span>
                  {selectedPack !== "single" && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Hemat Promo Aktif
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Status Stok:
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-end mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Tersedia di Gudang Bali
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm text-slate-600 leading-relaxed">
              Dibuat dari infusi sari buah asli segar Bali berpadu dengan air mata air Tabanan
              berkarbonasi halus. Menghasilkan gelembung sparkling segar tanpa rasa manis berlebih,
              bebas kalori jahat, dan sempurna untuk menyegarkan petualangan pantaimu.
            </p>

            {/* Pack Size Selection Cards */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                Pilih Ukuran Paket Kemasan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {packOptions.map((opt) => {
                  const isSelected = selectedPack === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedPack(opt.id)}
                      className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#0a3321] bg-[#e6f3eb] ring-2 ring-[#0a3321]/20 shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-slate-50"
                      }`}
                    >
                      {opt.badge && (
                        <span className="absolute -top-2.5 right-3 bg-[#C7F800] text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                          {opt.badge}
                        </span>
                      )}
                      <p className="font-condensed font-bold text-base text-[#0a3321] leading-tight">
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{opt.sublabel}</p>
                      <p className="font-extrabold text-xs text-[#0a3321] mt-2">
                        {formatRupiah(opt.price)}
                      </p>
                      {opt.savings && (
                        <span className="text-[10px] font-bold text-emerald-700 mt-1 inline-block">
                          {opt.savings}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Jumlah Pesanan:</span>
                <div className="flex items-center border border-gray-200 bg-white rounded-full p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#0a3321]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 rounded-full bg-white border-2 border-[#0a3321] text-[#0a3321] hover:bg-[#e6f3eb] font-condensed font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>TAMBAH KE KERANJANG</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-4 px-6 rounded-full bg-[#C7F800] hover:bg-[#b4e000] text-black font-condensed font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-900/10 active:scale-95 cursor-pointer"
                >
                  <span>BELI SEKARANG (CHECKOUT)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Pengiriman Dingin Instan Seluruh Bali</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Garansi 100% Segar atau Uang Kembali</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Pembayaran Aman Resmi Terverifikasi</span>
              </div>
            </div>

            {/* Accordion: Detail Komposisi, Nutrisi & Panduan */}
            <div className="space-y-2 pt-4">
              {/* Accordion 1: Komposisi Alami */}
              <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "ingredients" ? null : "ingredients")
                  }
                  className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#0a3321] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>1. Komposisi Alami &amp; Asal Bahan</span>
                  {activeAccordion === "ingredients" ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {activeAccordion === "ingredients" && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    Air berkarbonasi alami pegunungan Bedugul, perasan sari buah asli Bali pilihan,
                    ekstrak botani organik, asam sitrat alami, dan ekstrak daun stevia murni. Bebas dari
                    pengawet kimia sintetik dan pewarna buatan.
                  </div>
                )}
              </div>

              {/* Accordion 2: Nilai Gizi */}
              <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "nutrition" ? null : "nutrition")
                  }
                  className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#0a3321] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>2. Informasi Nilai Gizi (Per Kaleng 330ml)</span>
                  {activeAccordion === "nutrition" ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {activeAccordion === "nutrition" && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 space-y-1.5">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Energi Total:</span>
                      <strong className="text-[#0a3321]">5 kkal</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Gula Alami:</span>
                      <strong className="text-[#0a3321]">0 gram</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Lemak &amp; Kolesterol:</span>
                      <strong className="text-[#0a3321]">0 mg (0%)</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Vitamin C Harian:</span>
                      <strong className="text-emerald-700">35% AKG</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Panduan Penyajian */}
              <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "serving" ? null : "serving")
                  }
                  className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#0a3321] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>3. Saran Penyajian &amp; Mocktail Pairing</span>
                  {activeAccordion === "serving" ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {activeAccordion === "serving" && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    Sajikan dingin maksimal pada suhu 4°C. Nikmati langsung dari kaleng dingin, atau tuang ke
                    dalam gelas kristal berisi es batu dengan garnish irisan daun mint segar atau potongan lemon.
                    Sangat cocok dinikmati saat piknik pantai, setelah surfing, atau teman santai saat senja.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Rekomendasi Varian Lainnya */}
        <div className="mt-24 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-emerald-800">
                EKSPLORASI RASA LAINNYA
              </p>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl uppercase text-[#0a3321] mt-1">
                COBA JUGA VARIAN ZESTÓ INI
              </h2>
            </div>
            <Link
              href="/#flavors"
              className="text-xs font-bold text-[#0a3321] hover:text-emerald-700 underline underline-offset-4 flex items-center gap-1"
            >
              Lihat Seluruh Menu Rasa →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherFlavors.map((other) => (
              <div
                key={other.id}
                className="bg-white rounded-3xl p-4 border border-black/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#e0f1fc] mb-4">
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute top-3 right-3 bg-[#C7F800] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    {other.tag}
                  </div>
                </div>

                <div>
                  <h3 className="font-condensed font-black text-xl text-[#0a3321] uppercase">
                    {other.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 mt-1">{other.formattedPrice}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`/products/${other.id}`}
                    className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-slate-100 hover:bg-[#C7F800] text-[#0a3321] hover:text-black transition-colors"
                  >
                    Lihat Rincian
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: other.id,
                        name: other.name,
                        price: other.price,
                        image: other.image,
                        tag: other.tag,
                      })
                    }
                    className="w-9 h-9 rounded-xl bg-[#0a3321] text-[#C7F800] flex items-center justify-center hover:bg-black transition-colors cursor-pointer shrink-0"
                    title={`Tambah ${other.name} ke Keranjang`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Storefront Footer */}
      <Footer />
    </div>
  );
}
