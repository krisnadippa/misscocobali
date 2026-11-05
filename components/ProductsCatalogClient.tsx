"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ShoppingBag,
  Sparkles,
  ArrowLeft,
  Check,
  Star,
} from "lucide-react";
import { FLAVORS_DATA, formatRupiah } from "@/data/flavors";
import { useCart } from "@/context/CartContext";

// Extended product catalog for the rich catalog page
const ALL_CATALOG_PRODUCTS = [
  ...FLAVORS_DATA.map((f) => ({
    ...f,
    category: f.tag === "TROPICAL" || f.tag === "TOASTED" ? "tropical" : "citrus",
    rating: 4.9,
    reviews: 128,
    calories: "15 kkal",
    isBestSeller: f.id === "lime-rush" || f.id === "kiwi-pop",
    badge: f.tag,
  })),
  {
    id: "matcha-fizz",
    name: "MATCHA FIZZ",
    price: 35000,
    formattedPrice: "Rp 35.000",
    tag: "FOCUS",
    badge: "EDISI SPESIAL",
    category: "tea_craft",
    rating: 5.0,
    reviews: 94,
    calories: "20 kkal",
    isBestSeller: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ",
    bgTone: "#e4fae7",
  },
  {
    id: "citrus-bloom",
    name: "CITRUS BLOOM",
    price: 29000,
    formattedPrice: "Rp 29.000",
    tag: "BLOOM",
    badge: "BARU",
    category: "citrus",
    rating: 4.8,
    reviews: 67,
    calories: "18 kkal",
    isBestSeller: false,
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    bgTone: "#fff3db",
  },
  {
    id: "bali-summer-bundle",
    name: "SUMMER BUNDLE (6 CAN MIX)",
    price: 165000,
    formattedPrice: "Rp 165.000",
    tag: "BUNDLE",
    badge: "HEMAT 15%",
    category: "bundles",
    rating: 5.0,
    reviews: 210,
    calories: "Multi-Pack",
    isBestSeller: true,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    bgTone: "#dcfce7",
  },
  {
    id: "thermal-cooler-bag",
    name: "ZESTÓ THERMAL COOLER BAG",
    price: 45000,
    formattedPrice: "Rp 45.000",
    tag: "MERCH",
    badge: "AKSESORIS",
    category: "merch",
    rating: 4.9,
    reviews: 82,
    calories: "8 Jam Dingin",
    isBestSeller: false,
    image:
      "https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=800&q=80",
    bgTone: "#f1f5f9",
  },
];

const CATEGORIES = [
  { id: "all", label: "Semua Koleksi" },
  { id: "citrus", label: "Citrus & Fruity" },
  { id: "tropical", label: "Kelapa & Tropical" },
  { id: "tea_craft", label: "Tea & Craft Fizz" },
  { id: "bundles", label: "Paket Hemat Bundle" },
  { id: "merch", label: "Aksesoris & Cooler" },
];

export default function ProductsCatalogClient() {
  const { addToCart, totalItems, toggleCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price_low" | "price_high" | "rating">("featured");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    const result = ALL_CATALOG_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price_low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: typeof ALL_CATALOG_PRODUCTS[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      tag: product.tag,
    });
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-slate-900 font-sans selection:bg-[#C7F800] selection:text-black pb-28">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#0a3321] text-white border-b border-black/10 py-3.5 px-6 sm:px-10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-1.5 rounded-xl hover:bg-white/10 text-[#C7F800] transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali ke Beranda</span>
            </Link>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <Link href="/" className="flex items-center gap-1.5 group">
              <span className="text-white text-2xl font-black tracking-tight font-sans">
                zest<span className="text-[#C7F800]">ó</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/80">
                Katalog
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleCart}
              className="px-3.5 py-2 rounded-xl bg-[#C7F800] hover:bg-[#b5e800] text-black font-condensed font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Keranjang ({totalItems})</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION (FULL WIDTH KIRI-KANAN, TIDAK TERLALU PANJANG ATAS-BAWAH) ================= */}
      <header className="relative w-full overflow-hidden bg-[#0a3321] text-white h-[260px] sm:h-[320px] lg:h-[360px] flex items-center">
        {/* Full Edge-to-Edge Background Image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=2000&q=85"
            alt="Zestó Sparkling Beverage Flavors Bali"
            className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.05] scale-105"
          />
          {/* Subtle brand color gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a3321]/95 via-[#0a3321]/70 to-[#0a3321]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f8f4] via-transparent to-transparent opacity-80" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 flex flex-col justify-center">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7F800]/20 border border-[#C7F800]/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C7F800]" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#C7F800]">
                KOLEKSI MINUMAN DINGIN BALI
              </span>
            </div>

            <h1 className="font-condensed font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              SEMUA RASA SEGAR, <br />
              <span className="text-[#C7F800]">UNTUK SETIAP MOMENMU.</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-200/90 font-medium max-w-xl leading-relaxed">
              Dibuat dari 100% buah asli tropis Bali &amp; karbonasi alami berbusa halus. Rendah kalori, tanpa pemanis buatan, diantar langsung dalam box es pendingin.
            </p>
          </div>
        </div>
      </header>

      {/* ================= FILTER & SEARCH BAR SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-black/5 space-y-4">
          {/* Top Bar: Search Input & Sort Options */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari varian rasa, buah, atau bundle..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#f4f8f4] border border-gray-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3321]/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Urutkan:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-xl bg-[#f4f8f4] border border-gray-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0a3321]/20 cursor-pointer"
              >
                <option value="featured">Paling Populer</option>
                <option value="price_low">Harga: Rendah ke Tinggi</option>
                <option value="price_high">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Category Tabs Filter */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs font-bold text-slate-400 hidden lg:inline mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Kategori:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#0a3321] text-[#C7F800] shadow-md shadow-[#0a3321]/20 scale-102"
                      : "bg-[#f4f8f4] text-slate-600 hover:bg-slate-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT GRID DISPLAY ================= */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 mt-10">
        {/* Results Counter Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-slate-600">
            Menampilkan <span className="text-[#0a3321] font-black">{filteredProducts.length}</span> produk pilihan Zestó
          </p>
          {selectedCategory !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="text-xs text-[#0a3321] font-bold hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-3">
            <p className="text-4xl">🍹</p>
            <h3 className="font-condensed font-bold text-xl text-slate-800 uppercase">
              Tidak Ada Produk yang Cocok
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba gunakan kata kunci pencarian yang lain atau reset kategori filter Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0a3321] text-[#C7F800] text-xs font-bold uppercase"
            >
              Lihat Semua Produk
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isJustAdded = addedItem === product.id;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0a3321]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Image & Badge Container */}
                  <div className="relative w-full aspect-square bg-[#f4f8f4] overflow-hidden p-6 flex items-center justify-center">
                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#0a3321] text-[#C7F800] px-2.5 py-1 rounded-full shadow-sm">
                        {product.badge}
                      </span>
                      {product.isBestSeller && (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-400 text-black px-2 py-0.5 rounded-full shadow-sm">
                          Favorit
                        </span>
                      )}
                    </div>

                    {/* Calories Tag */}
                    <div className="absolute top-3.5 right-3.5 z-10 text-[10px] font-bold text-slate-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-200">
                      {product.calories}
                    </div>

                    {/* Product Photo */}
                    <Link
                      href={`/products/${product.id}`}
                      className="relative w-full h-full block transform group-hover:scale-105 transition-transform duration-500"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </Link>
                  </div>

                  {/* Card Content & Action */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Rating & Review */}
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1.5">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-extrabold text-slate-800 text-[11px]">
                          {product.rating}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-condensed font-black text-lg uppercase tracking-tight text-[#0a3321] hover:text-[#82c91e] transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Price */}
                      <p className="font-mono font-black text-base text-slate-900 mt-1">
                        {formatRupiah(product.price)}
                      </p>
                    </div>

                    {/* Button Add & Detail */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <Link
                        href={`/products/${product.id}`}
                        className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 text-center transition-colors flex items-center justify-center"
                      >
                        Detail
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        className={`py-2.5 px-3 rounded-xl font-condensed font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 ${
                          isJustAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-[#0a3321] hover:bg-[#C7F800] text-[#C7F800] hover:text-black"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Ditambah</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>+ Beli</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

