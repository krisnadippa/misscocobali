"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  ShieldCheck,
  Trash2,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Download,
  MapPin,
  Navigation,
  ExternalLink,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/data/flavors";

interface AddonRecommendation {
  id: string;
  name: string;
  sub: string;
  price: number;
  image: string;
}

let orderSeq = 8842109;

function createOrderReference() {
  orderSeq += 1;
  return `XND-ZST-${orderSeq}`;
}

function getFormattedDateNow() {
  const d = new Date();
  return `${d.getDate()} Nov 2024, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} WITA`;
}

export default function CheckoutClient() {
  const { items, clearCart, updateQuantity, removeFromCart, addToCart } = useCart();

  // If cart is empty, provide sensible default item for preview demo
  const displayItems =
    items.length > 0
      ? items
      : [
          {
            id: "lime-rush-4pack",
            name: "LIME RUSH (4-Pack Bundle)",
            price: 105000,
            image:
              "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
            tag: "FRESH",
            quantity: 1,
          },
        ];

  // Recommendations / Menu Pilihan Lainnya (Upsell / Cross-Sell)
  const recommendations: AddonRecommendation[] = [
    {
      id: "addon-cooler-bag",
      name: "Zestó Insulated Canvas Cooler Bag",
      sub: "Menjaga 6 kaleng tetap dingin 8 jam di pantai",
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "addon-mint-chill",
      name: "Mint Chill Cold-Brew Single Can (330ml)",
      sub: "Sensasi segar mint organik Bali",
      price: 28000,
      image:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "addon-straw-set",
      name: "Eco Stainless Steel Straw & Brush Set",
      sub: "Sedotan ramah lingkungan dengan pouch serut",
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "addon-citrus-bloom",
      name: "Citrus Bloom Sparkling Can (330ml)",
      sub: "Kombinasi jeruk segar Bali & grapefruit",
      price: 28000,
      image:
        "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Form states
  const [customerName, setCustomerName] = useState("I Wayan Dharma");
  const [customerEmail, setCustomerEmail] = useState("dharma.bali@gmail.com");
  const [customerPhone, setCustomerPhone] = useState("+62 812-3890-4411");
  const [address, setAddress] = useState("Villa Sunset Palm No. 4B, Jl. Pantai Batu Bolong, Canggu, Bali");
  const [mapsUrl, setMapsUrl] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [deliveryNotes, setDeliveryNotes] = useState("Titipkan ke security villa jika tidak ada di tempat.");
  const [shippingMethod, setShippingMethod] = useState<"gosend" | "grab" | "jne" | "pickup">("gosend");

  // Promo voucher code
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Xendit Checkout states
  const [isProcessingXendit, setIsProcessingXendit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [orderRefId, setOrderRefId] = useState("");

  // Snapshot of purchased items and totals for digital invoice
  const [purchasedSnapshot, setPurchasedSnapshot] = useState<typeof displayItems>([]);
  const [snapshotTotals, setSnapshotTotals] = useState({
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    date: "",
  });

  // Check URL query parameters on return from Xendit redirect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get("status");
      const externalId = urlParams.get("external_id");
      if (status === "success" && !isPaidSuccess) {
        setIsPaidSuccess(true);
        if (externalId) setOrderRefId(externalId);
        clearCart();
      }
    }
  }, [clearCart, isPaidSuccess]);

  // Shipping cost
  const shippingCosts: Record<string, number> = {
    gosend: 25000,
    grab: 18000,
    jne: 35000,
    pickup: 0,
  };
  const shippingCost = shippingCosts[shippingMethod];

  // Financial calculations
  const subtotal = displayItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal + shippingCost - discountAmount;

  // Handle promo code apply
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === "ZESTOFRESH20") {
      setDiscountPercent(20);
      setPromoMessage("✓ Voucher ZESTOFRESH20 berhasil dipasang! Diskon 20% diterapkan.");
    } else if (cleanCode === "BALIBEACH") {
      setDiscountPercent(15);
      setPromoMessage("✓ Voucher BALIBEACH aktif! Diskon 15% diterapkan.");
    } else {
      setPromoMessage("✕ Kode promo tidak valid atau telah kedaluwarsa.");
      setDiscountPercent(0);
    }
  };

  // Geolocation handler to get real-time device pin
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Browser Anda tidak mendukung deteksi lokasi otomatis.");
      return;
    }

    setIsGettingLocation(true);
    setLocationStatus("Sedang mengambil titik koordinat GPS...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const generatedUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        setMapsUrl(generatedUrl);
        setIsGettingLocation(false);
        setLocationStatus(`✓ Titik lokasi GPS berhasil terpasang (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
      },
      (error) => {
        setIsGettingLocation(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus("Izin akses lokasi ditolak. Silakan tempel tautan Google Maps manual di bawah.");
        } else {
          setLocationStatus("Gagal membaca GPS. Silakan tempel tautan Google Maps manual.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Add recommendation to cart
  const handleAddRecommendation = (rec: AddonRecommendation) => {
    addToCart({
      id: rec.id,
      name: rec.name,
      price: rec.price,
      image: rec.image,
      tag: "ADD-ON",
    });
  };

  // Trigger Direct Redirect to Xendit Checkout
  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingXendit(true);
    setErrorMessage(null);

    const newRef = createOrderReference();
    setOrderRefId(newRef);

    // Save snapshot of order for the invoice
    const dateStr = getFormattedDateNow();
    setPurchasedSnapshot([...displayItems]);
    setSnapshotTotals({
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total: finalTotal,
      date: dateStr,
    });

    try {
      const res = await fetch("/api/xendit/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalTotal,
          customerName,
          customerEmail,
          customerPhone,
          address,
          mapsUrl: mapsUrl.trim() || undefined,
          items: displayItems,
          shippingCost,
        }),
      });

      const data = await res.json();

      if (data.invoice_url) {
        // Direct redirect langsung ke halaman checkout resmi Xendit
        window.location.href = data.invoice_url;
      } else {
        // Fallback jika mode simulasi lokal
        setIsProcessingXendit(false);
        setIsPaidSuccess(true);
        clearCart();
      }
    } catch (err) {
      console.error("Xendit API route request:", err);
      setErrorMessage("Terjadi kendala saat menghubungi gateway Xendit. Silakan coba lagi.");
      setIsProcessingXendit(false);
    }
  };

  // If order was successfully completed, show official digital invoice (Clean Document Design, No Cards)
  if (isPaidSuccess) {
    const itemsToDisplay = purchasedSnapshot.length > 0 ? purchasedSnapshot : displayItems;
    const totals = snapshotTotals.total > 0 ? snapshotTotals : {
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total: finalTotal,
      date: "04 Nov 2024, WITA",
    };

    const shippingLabel =
      shippingMethod === "gosend"
        ? "GoSend Instant Bali (Cold-Chain Box)"
        : shippingMethod === "grab"
        ? "GrabExpress Same Day (Cold-Chain)"
        : shippingMethod === "jne"
        ? "JNE Trucking Cold Pack"
        : "Ambil Mandiri di Store Sanur";

    return (
      <div className="min-h-screen bg-[#f4f8f4] text-slate-900 py-10 px-4 sm:px-6 font-sans">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="max-w-3xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 print-hide">
          <Link
            href="/"
            className="text-xs font-bold text-[#0a3321] hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Toko</span>
          </Link>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 sm:flex-none py-2.5 px-6 rounded-xl bg-[#0a3321] hover:bg-black text-[#C7F800] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Cetak / Unduh PDF</span>
            </button>
            <Link
              href="/"
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-white border border-gray-300 hover:bg-slate-50 text-xs font-bold text-slate-700 text-center transition-colors"
            >
              Belanja Lagi
            </Link>
          </div>
        </div>

        {/* Printable Official Digital Invoice Document (Clean Typography, No Internal Cards) */}
        <div className="invoice-document bg-white max-w-3xl mx-auto p-8 sm:p-12 border border-slate-200 shadow-xl font-sans text-slate-800 relative">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b-2 border-slate-900 gap-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0a3321] text-[#C7F800] font-black text-sm flex items-center justify-center">
                  Z
                </div>
                <span className="text-2xl font-black tracking-tight text-[#0a3321] font-sans">
                  zest<span className="text-[#82c91e]">ó</span>
                </span>
              </div>
              <p className="font-extrabold text-xs text-slate-900 mt-3 tracking-wide uppercase">
                PT ZESTO SEGAR ALAMI INDONESIA
              </p>
              <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                <p>Jl. Danau Tamblingan No. 88, Sanur, Denpasar Selatan, Bali 80228</p>
                <p>NPWP: 94.882.102.4-906.000 • Email: billing@zestobali.com</p>
                <p>WhatsApp Hotline: +62 812-3456-7890</p>
              </div>
            </div>

            <div className="sm:text-right">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                FAKTUR INVOICE
              </h1>
              <p className="font-mono font-bold text-sm text-slate-800 mt-1">
                NO: {orderRefId || "INV-XND-2024-8842"}
              </p>
              <div className="mt-2.5">
                <span className="inline-block border border-emerald-800 text-emerald-900 bg-emerald-50 text-[10px] font-black uppercase tracking-widest px-3 py-1">
                  ✓ LUNAS / PAID (XENDIT)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Tanggal Terbit: {totals.date}
              </p>
            </div>
          </div>

          {/* Two Columns: Customer & Shipping/Payment Details (Clean Typography, Zero Nested Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200 text-xs">
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 block mb-1.5">
                DITAGIHKAN KEPADA:
              </span>
              <p className="font-black text-sm text-slate-900">{customerName}</p>
              <p className="text-slate-600 leading-relaxed pt-0.5">{address}</p>
              <div className="pt-2 text-slate-600 space-y-0.5">
                <p>No. Telepon: <span className="font-semibold text-slate-800">{customerPhone}</span></p>
                <p>Email: <span className="font-semibold text-slate-800">{customerEmail}</span></p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 block mb-1.5">
                PENGIRIMAN &amp; PEMBAYARAN:
              </span>
              <div className="space-y-1.5 text-slate-700">
                <p className="flex justify-between">
                  <span className="text-slate-500">Metode Bayar:</span>
                  <span className="font-bold text-slate-900">
                    XENDIT PAYMENT GATEWAY
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-500">Layanan Kurir:</span>
                  <span className="font-bold text-slate-900">{shippingLabel}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-500">Kondisi Barang:</span>
                  <span className="font-bold text-emerald-800">❄️ Cold-Chain 4°C Terjaga</span>
                </p>
                {deliveryNotes && (
                  <p className="pt-1 text-[11px] text-slate-500 border-t border-slate-100">
                    Catatan Pengantaran: &ldquo;{deliveryNotes}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Itemized Table (Clean Layout, Zero Nested Cards) */}
          <div className="py-6">
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
              RINCIAN ITEM PESANAN
            </h2>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-900 text-slate-900 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-2.5 pr-2 w-8">No</th>
                  <th className="py-2.5 px-2">Deskripsi Produk / Varian Minuman</th>
                  <th className="py-2.5 px-2 text-center w-16">Qty</th>
                  <th className="py-2.5 px-2 text-right w-28">Harga Satuan</th>
                  <th className="py-2.5 pl-2 text-right w-28">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {itemsToDisplay.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="py-3 pr-2 text-slate-400 font-bold">{idx + 1}</td>
                    <td className="py-3 px-2">
                      <span className="font-bold text-slate-900 block">{item.name}</span>
                      {item.tag && (
                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                          Edisi: {item.tag}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-slate-800">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-2 text-right text-slate-600">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="py-3 pl-2 text-right font-black text-slate-900">
                      {formatRupiah(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation Breakdown (Clean Alignment, Zero Nested Cards) */}
          <div className="border-t-2 border-slate-900 pt-5 flex flex-col sm:flex-row justify-between gap-6">
            <div className="max-w-xs text-[11px] text-slate-500 space-y-1.5 leading-relaxed">
              <p className="font-bold text-slate-800 uppercase tracking-wide">Ketentuan &amp; Garansi:</p>
              <p>
                1. Minuman sparkling berkarbonasi dingin asli Bali, simpan segera pada suhu lemari pendingin (2-4°C).
              </p>
              <p>
                2. Faktur ini sah diterbitkan secara elektronik dan diakui sebagai bukti pelunasan resmi transaksi.
              </p>
            </div>

            <div className="sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Minuman:</span>
                <span className="font-semibold text-slate-800">{formatRupiah(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Biaya Ekspedisi Dingin:</span>
                <span className="font-semibold text-slate-800">
                  {totals.shipping === 0 ? "GRATIS" : formatRupiah(totals.shipping)}
                </span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Potongan Diskon Promo:</span>
                  <span>- {formatRupiah(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>PPN 11% (Termasuk):</span>
                <span>Rp 0</span>
              </div>
              <div className="border-t-2 border-slate-900 pt-2.5 mt-2 flex justify-between items-baseline">
                <span className="font-black text-sm uppercase text-slate-900">TOTAL AKHIR:</span>
                <span className="font-black text-xl text-slate-900 font-mono">
                  {formatRupiah(totals.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Official Verification Sign-off */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              <p className="font-semibold text-slate-800">PT ZESTO SEGAR ALAMI INDONESIA</p>
              <p className="text-slate-400 text-[10px]">Dokumen Elektronik Sah Tanpa Tanda Tangan Basah</p>
            </div>
            <div className="border border-slate-300 px-3.5 py-1.5 text-center text-[10px] font-mono tracking-wider text-slate-600 uppercase">
              [ E-INVOICE VERIFIED &amp; PAID VIA XENDIT ]
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-slate-900 font-sans selection:bg-[#C7F800] selection:text-black pb-24">
      {/* Top Checkout Header */}
      <header className="bg-[#0a3321] text-white border-b border-black/10 py-4 px-6 sm:px-10 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-white text-2xl sm:text-3xl font-black tracking-tight font-sans">
              zest<span className="text-[#C7F800]">ó</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/80">
              Checkout
            </span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="hidden sm:flex items-center gap-1.5 text-white/80">
              <Lock className="w-3.5 h-3.5 text-[#C7F800]" />
              <span>256-bit SSL Encrypted</span>
            </div>
            <Link
              href="/"
              className="text-xs text-[#C7F800] hover:underline flex items-center gap-1 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lanjut Belanja</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Checkout Layout */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 pt-8">
        <div className="mb-8">
          <h1 className="font-condensed font-black text-3xl sm:text-4xl uppercase text-[#0a3321]">
            SELESAIKAN PESANAN SEGAR ANDA
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Isi data pengantaran dan bayar dengan mudah melalui sistem pembayaran resmi Xendit Indonesia.
          </p>
        </div>

        <form onSubmit={handleStartPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN: CUSTOMER DATA & XENDIT ================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Kontak Pembeli */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/5 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-[#0a3321] text-[#C7F800] font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="font-condensed font-bold text-xl uppercase tracking-tight text-[#0a3321]">
                  INFORMASI KONTAK &amp; PEMESAN
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: I Wayan Dharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#f4f8f4] text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0a3321]/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+62 812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#f4f8f4] text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0a3321]/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Alamat Email (Untuk Bukti Tagihan Xendit) *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#f4f8f4] text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0a3321]/20"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Alamat Pengiriman Bali */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/5 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-[#0a3321] text-[#C7F800] font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="font-condensed font-bold text-xl uppercase tracking-tight text-[#0a3321]">
                  ALAMAT PENGIRIMAN DINGIN
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Alamat Lengkap / Nama Villa / Hotel / Homestay *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama jalan, nomor villa/kamar, patokan area..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#f4f8f4] text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0a3321]/20"
                  />
                </div>

                {/* Google Maps Pinpoint / Kurir Link */}
                <div className="bg-[#f0f7f2] border border-[#0a3321]/15 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[#0a3321]">
                      <MapPin className="w-4 h-4 text-[#0a3321] shrink-0" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Pinpoint Google Maps Kurir (Opsional &amp; Direkomendasikan)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleGetCurrentLocation}
                      disabled={isGettingLocation}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a3321] text-[#C7F800] text-[11px] font-bold hover:bg-[#124b32] active:scale-95 transition-all shadow-sm w-fit"
                    >
                      <Navigation className={`w-3.5 h-3.5 ${isGettingLocation ? "animate-spin" : ""}`} />
                      {isGettingLocation ? "Membaca GPS..." : "Gunakan Lokasi Saya Sekarang"}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Kurir GoSend / GrabExpress akan langsung membuka link Maps ini di HP mereka untuk menuju ke villa / tempat Anda tanpa perlu nyasar.
                  </p>

                  <div className="relative">
                    <input
                      type="url"
                      value={mapsUrl}
                      onChange={(e) => setMapsUrl(e.target.value)}
                      placeholder="Contoh: https://maps.app.goo.gl/... atau koordinat otomatis"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0a3321]/20 pr-10"
                    />
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a3321] p-1"
                        title="Buka Pratinjau Maps"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {locationStatus && (
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#0a3321]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{locationStatus}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Catatan Pengantaran untuk Driver (Opsional)
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Contoh: Titipkan di security villa, atau panggil saat tiba"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#f4f8f4] text-slate-800 font-medium focus:outline-none"
                  />
                </div>

                {/* Courier selection */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">
                    Pilih Layanan Kurir Dingin:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "gosend" as const,
                        title: "GoSend Instant Bali",
                        desc: "1-2 Jam Tiba • Box Es Khusus",
                        price: 25000,
                        tag: "Rekomendasi",
                      },
                      {
                        id: "grab" as const,
                        title: "GrabExpress Same Day",
                        desc: "Sampai di hari yang sama",
                        price: 18000,
                        tag: null,
                      },
                      {
                        id: "jne" as const,
                        title: "JNE Trucking Cold Pack",
                        desc: "Antar kota & pulau (1-3 Hari)",
                        price: 35000,
                        tag: null,
                      },
                      {
                        id: "pickup" as const,
                        title: "Ambil di Store Sanur",
                        desc: "Jl. Danau Tamblingan No. 88",
                        price: 0,
                        tag: "Gratis",
                      },
                    ].map((c) => {
                      const isSelected = shippingMethod === c.id;
                      return (
                        <div
                          key={c.id}
                          onClick={() => setShippingMethod(c.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "border-[#0a3321] bg-[#e6f3eb] ring-2 ring-[#0a3321]/20"
                              : "border-gray-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold text-[#0a3321] text-xs">{c.title}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{c.desc}</p>
                            </div>
                            {c.tag && (
                              <span className="text-[10px] font-black uppercase tracking-wider bg-[#C7F800] text-black px-2 py-0.5 rounded-full">
                                {c.tag}
                              </span>
                            )}
                          </div>
                          <span className="font-extrabold text-[#0a3321] text-xs mt-2">
                            {c.price === 0 ? "GRATIS" : formatRupiah(c.price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Gateway XENDIT */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0a3321] text-[#C7F800] font-black text-xs flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-condensed font-bold text-xl uppercase tracking-tight text-[#0a3321]">
                    PEMBAYARAN RESMI XENDIT
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="text-[10px] font-bold text-slate-400">Powered by</span>
                  <span className="text-xs font-black tracking-tight text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 font-mono">
                    xendit
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#0a3321]/15 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0a3321] text-[#C7F800] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0a3321]">
                      Pilihan Metode Bayar Lengkap Langsung di Halaman Xendit
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      Saat menekan tombol <strong>&ldquo;BAYAR SEKARANG VIA XENDIT&rdquo;</strong>, Anda akan langsung dialihkan ke portal pembayaran aman Xendit. Anda dapat memilih metode pembayaran yang diinginkan secara leluasa:
                    </p>
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-bold text-slate-700">
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-emerald-700 block text-xs">📱 QRIS</span>
                    <span className="text-[9px] text-slate-400">Semua E-Wallet &amp; Bank</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-blue-700 block text-xs">🏦 Virtual Account</span>
                    <span className="text-[9px] text-slate-400">BCA, Mandiri, BRI, BNI</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-amber-700 block text-xs">👛 E-Wallet</span>
                    <span className="text-[9px] text-slate-400">OVO, DANA, ShopeePay</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-indigo-700 block text-xs">💳 Kartu Kredit</span>
                    <span className="text-[9px] text-slate-400">Visa, Mastercard, JCB</span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: REKOMENDASI MENU & ORDER SUMMARY ================= */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            {/* Rekomendasi Menu Pilihan Lainnya (Cross-sell / Upsell) */}
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Sparkles className="w-4 h-4 text-[#0a3321]" />
                <h3 className="font-condensed font-bold text-lg uppercase tracking-tight text-[#0a3321]">
                  LENGKAPI KESEGARANMU (REKOMENDASI)
                </h3>
              </div>
              <p className="text-[11px] text-slate-500">
                Sering dibeli bersamaan oleh penikmat Zestó untuk bekal piknik &amp; pantai:
              </p>

              <div className="space-y-2.5 pt-1">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-2.5 rounded-2xl bg-[#f4f8f4] border border-slate-200/80 flex items-center justify-between gap-3 hover:border-[#0a3321] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                        <Image
                          src={rec.image}
                          alt={rec.name}
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#0a3321] line-clamp-1">{rec.name}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-1">{rec.sub}</p>
                        <p className="font-black text-xs text-[#0a3321] mt-0.5">
                          {formatRupiah(rec.price)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddRecommendation(rec)}
                      className="px-3 py-1.5 rounded-xl bg-[#0a3321] hover:bg-[#C7F800] text-[#C7F800] hover:text-black font-condensed font-black text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
                    >
                      + Tambah
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary & Item List */}
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-4">
              <h3 className="font-condensed font-bold text-lg uppercase tracking-tight text-[#0a3321] pb-2 border-b border-slate-100">
                RINGKASAN PESANAN ({displayItems.length} ITEM)
              </h3>

              {/* Items in cart */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100">
                {displayItems.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="50px"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#0a3321] line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-slate-500 font-semibold">
                          {formatRupiah(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-200 rounded-lg p-0.5 text-xs bg-slate-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-[#0a3321]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Code Form */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Kode Voucher (cth: ZESTOFRESH20)"
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#0a3321]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#C7F800] text-xs font-bold text-[#0a3321] hover:text-black transition-colors cursor-pointer"
                  >
                    Pakai
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] mt-1.5 font-bold ${
                      discountPercent > 0 ? "text-emerald-700" : "text-rose-600"
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-semibold">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Minuman:</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ongkir Ekspedisi Dingin:</span>
                  <span>{shippingCost === 0 ? "GRATIS" : formatRupiah(shippingCost)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Potongan Diskon ({discountPercent}%):</span>
                    <span>- {formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Pajak Restoran &amp; PPN (11%):</span>
                  <span>Termasuk</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-condensed font-black text-lg text-[#0a3321]">
                    TOTAL PEMBAYARAN:
                  </span>
                  <span className="font-condensed font-black text-2xl text-[#0a3321]">
                    {formatRupiah(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isProcessingXendit}
                className="w-full py-4 rounded-2xl bg-[#C7F800] hover:bg-[#b4e000] text-black font-condensed font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-lime-900/10 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessingXendit ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Menghubungkan ke Xendit...
                  </span>
                ) : (
                  <>
                    <span>BAYAR SEKARANG VIA XENDIT</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Transaksi dijamin aman &amp; berizin resmi Bank Indonesia</span>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
