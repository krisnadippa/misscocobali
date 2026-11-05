"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-30 w-full px-6 sm:px-10 py-5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link className="flex items-center gap-1 group" href="#">
          <span className="text-white text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md font-sans">
            zest
            <span className="text-zesto-lime inline-block group-hover:scale-110 transition-transform">
              ó
            </span>
          </span>
        </Link>

        {/* Middle: Nav Links (Desktop) */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] font-medium text-white/95 drop-shadow"
        >
          <Link
            className="hover:text-zesto-lime transition-colors"
            href="/products"
          >
            Koleksi Produk
          </Link>
          <Link
            className="hover:text-zesto-lime flex items-center gap-1 transition-colors group"
            href="/#flavors"
          >
            Flavors
          </Link>
          <a className="hover:text-zesto-lime transition-colors" href="#about">
            About
          </a>
          <a
            className="hover:text-zesto-lime flex items-center gap-1 transition-colors group"
            href="#testimonials"
          >
            Stories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down w-3.5 h-3.5 opacity-80 group-hover:translate-y-0.5 transition-transform"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
          <a className="hover:text-zesto-lime transition-colors" href="#community">
            Community
          </a>
          <a className="hover:text-zesto-lime transition-colors" href="#footer">
            Contact
          </a>
        </nav>

        {/* Right: Actions & Cart */}
        <div className="flex items-center gap-3 sm:gap-4 text-white">
          {/* Language Selector */}
          <button
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full hover:bg-white/15 transition-all drop-shadow cursor-pointer"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-globe w-4 h-4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span>EN</span>
          </button>

          {/* Cart Badge */}
          <button
            type="button"
            onClick={toggleCart}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full hover:bg-white/15 transition-all drop-shadow cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag w-4 h-4"
            >
              <path d="M16 10a4 4 0 0 1-8 0" />
              <path d="M3.103 6.034h17.794" />
              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
            </svg>
            <span>Cart ({totalItems})</span>
          </button>

          {/* Primary CTA Button */}
          <a
            className="bg-white text-slate-900 font-extrabold text-[12px] tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-zesto-lime hover:text-black transition-all shadow-md active:scale-95"
            href="#flavors"
          >
            GET FRESH
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex flex-col gap-3 text-white text-sm font-semibold">
          <a
            href="#flavors"
            onClick={() => setMobileOpen(false)}
            className="py-1 hover:text-zesto-lime border-b border-white/10"
          >
            Flavors
          </a>
          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="py-1 hover:text-zesto-lime border-b border-white/10"
          >
            About
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileOpen(false)}
            className="py-1 hover:text-zesto-lime border-b border-white/10"
          >
            Stories
          </a>
          <a
            href="#community"
            onClick={() => setMobileOpen(false)}
            className="py-1 hover:text-zesto-lime border-b border-white/10"
          >
            Community
          </a>
          <a
            href="#footer"
            onClick={() => setMobileOpen(false)}
            className="py-1 hover:text-zesto-lime"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
