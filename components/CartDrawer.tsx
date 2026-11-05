"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    recentAdded,
  } = useCart();

  return (
    <>
      {/* Toast notification when added */}
      {recentAdded && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C7F800] text-black font-condensed font-black px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-black/10 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
          <span className="text-sm tracking-wide">
            ADDED &ldquo;{recentAdded}&rdquo; TO CART!
          </span>
        </div>
      )}

      {/* Cart Drawer Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0a3321]" />
            <h2 className="font-condensed font-bold text-xl uppercase tracking-tight text-[#0a3321]">
              YOUR CART ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-slate-500 hover:text-black hover:border-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#e0f1fc]/60 border-b border-[#c8e5f7] text-xs font-semibold text-[#0a3321] flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span>
              {totalPrice >= 100000
                ? "🎉 Anda mendapatkan GRATIS Ongkos Kirim!"
                : `Tambah Rp ${(100000 - totalPrice).toLocaleString("id-ID")} lagi untuk GRATIS Ongkir`}
            </span>
            <span>{Math.min(100, Math.round((totalPrice / 100000) * 100))}%</span>
          </div>
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-[#195B30] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalPrice / 100000) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-16 h-16 stroke-1 text-slate-300 mb-3" />
              <p className="font-condensed font-bold text-lg text-slate-700 uppercase">
                YOUR CART IS EMPTY
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Looks like you haven&apos;t added any crisp sparkling refreshments yet!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 bg-[#C7F800] text-black font-condensed font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-black hover:text-[#C7F800] transition-colors"
              >
                EXPLORE FLAVORS
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#e0f1fc] relative shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-condensed font-bold text-base text-[#0a3321] uppercase truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-slate-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-slate-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-[#0a3321]">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-slate-400 hover:text-red-500 mt-2 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-slate-50 flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">Subtotal</span>
              <span className="font-black text-lg text-[#0a3321]">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Pajak dan ongkos kirim dihitung saat checkout.
            </p>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-[#C7F800] hover:bg-[#b4e000] text-black font-condensed font-black text-sm uppercase tracking-wider py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <span>CHECKOUT SEKARANG</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

