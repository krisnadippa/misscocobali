"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function SpotlightSection() {
  const { addToCart } = useCart();

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 font-sans min-h-[620px] lg:min-h-[680px] flex items-center lg:py-16 select-none py-24 min-h-[540px]">
      {/* Full-width background image matching IMAGE_1 */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXDyzDHFhD00YtH4oJYHB4Bm2KnLWgCnIpCfZB6GgrsuvHAaKAhO0zGAjW3abKCOwN48NJXC2aQBGBWGBgI3SIvDI5njvegSekxJVTxu1RwqT0IcSKa0amVs3NtMvP7YnYvkZZURu04W-12oEOPLAwMHOFq6VNPOApTbpbJ0P9jW21ElqmRA26mO_8fzoR9kvLCGvfWxH2fSAPQNPsVh5kZy5JMoOe-kSgBsjygC62"
          alt="When the sun finds you, bring Zesto beach background"
          className="w-full h-full object-cover object-center filter brightness-[0.98]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 flex flex-col justify-between min-h-[540px]">
        {/* Top Row: Left Headline & Right Description */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 pt-2">
          {/* Left Headline */}
          <div className="relative max-w-xl">
            <h2 className="font-condensed font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.92] drop-shadow-md">
              WHEN THE SUN FIND
              <br />
              YOU, BRING ZESTO.
            </h2>
            {/* Script Accent Text */}
            <span className="font-script absolute left-[120px] sm:left-[170px] top-[40px] sm:top-[48px] text-4xl sm:text-5xl lg:text-6xl text-[#ccff00] drop-shadow-md font-bold pointer-events-none -rotate-6 tracking-wide whitespace-nowrap z-20">
              Not Just a Drink
            </span>
          </div>

          {/* Right Description Copy */}
          <div className="max-w-xs sm:max-w-sm text-right lg:text-right self-end lg:self-start">
            <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed drop-shadow">
              Earthy matcha lifted by sparkling citrus bubbles. Smooth, bright, and made for moments that need a little extra focus.
            </p>
          </div>
        </div>

        {/* Middle Row: Vertical Thumbnails (Left) + Center Floating Card with Nav Arrows */}
        <div className="relative w-full flex items-center justify-between my-auto py-6">
          {/* Left Vertical Product Thumbnails */}
          <div className="flex flex-col gap-2.5 z-20">
            <button
              type="button"
              aria-label="Thumbnail 1"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/70 backdrop-blur-md border border-white/60 p-1 flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ"
                alt="Flavor thumbnail 1"
                className="h-full object-contain filter saturate-75 opacity-90"
              />
            </button>
            <button
              type="button"
              aria-label="Thumbnail 2"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/70 backdrop-blur-md border border-white/60 p-1 flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ"
                alt="Flavor thumbnail 2"
                className="h-full object-contain filter saturate-75 opacity-90"
              />
            </button>
            <button
              type="button"
              aria-label="Thumbnail 3"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/70 backdrop-blur-md border border-white/60 p-1 flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ"
                alt="Flavor thumbnail 3"
                className="h-full object-contain filter saturate-75 opacity-90"
              />
            </button>
            {/* Highlighted Active Thumbnail */}
            <button
              type="button"
              aria-label="Matcha Fizz Thumbnail Active"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white backdrop-blur-md border-2 border-[#ccff00] p-1 flex items-center justify-center shadow-md scale-105 ring-2 ring-[#ccff00]/50 transition-all cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ"
                alt="Matcha Fizz selected thumbnail"
                className="h-full object-contain"
              />
            </button>
          </div>

          {/* Center Featured Product Card with Navigation Arrows */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-6 z-20">
            {/* Left Nav Arrow Button */}
            <button
              type="button"
              aria-label="Previous product"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 border border-white/50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>

            {/* Floating Product Card (Transparent outline matching IMAGE_1 and IMAGE_3) */}
            <div className="w-56 sm:w-64 bg-white/20 backdrop-blur-[2px] border-2 border-white/90 rounded-[26px] p-2 flex flex-col justify-end shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 min-h-[300px] sm:min-h-[330px]">
              {/* Product Can Visual Center Overlay */}
              <div className="flex-1 flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ"
                  alt="Matcha Fizz Can"
                  className="h-48 sm:h-56 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                />
              </div>
              {/* Bottom Product Info Banner */}
              <div className="bg-white rounded-[20px] px-3.5 py-2.5 flex items-center justify-between shadow-lg">
                <div>
                  <h3 className="font-condensed text-base sm:text-lg font-bold uppercase tracking-tight text-[#0a3321] leading-none">
                    MATCHA FIZZ
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                    Rp 35.000
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: "matcha-fizz",
                      name: "MATCHA FIZZ",
                      price: 35000,
                      image:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ",
                    })
                  }
                  aria-label="Add Matcha Fizz to cart"
                  className="w-9 h-9 rounded-full bg-[#ccff00] hover:bg-black hover:text-[#ccff00] text-black flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-basket"
                  >
                    <path d="m15 11-1 9" />
                    <path d="m19 11-4-7" />
                    <path d="M2 11h20" />
                    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                    <path d="M4.5 15.5h15" />
                    <path d="m5 11 4-7" />
                    <path d="m9 11 1 9" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Nav Arrow Button */}
            <button
              type="button"
              aria-label="Next product"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 border border-white/50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Row: Taste Notes Pills on Bottom Right */}
        <div className="flex justify-end items-center pb-2 z-20">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-condensed font-bold tracking-wider text-white text-xs sm:text-sm uppercase drop-shadow mr-1">
              TASTE NOTES :
            </span>
            {/* Pill 1: Matcha */}
            <div className="bg-white rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#82c91e]" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase">
                MATCHA
              </span>
            </div>
            {/* Pill 2: Citrus */}
            <div className="bg-white rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shadow-md">
              <span className="text-[#e69b00] text-xs leading-none">▶</span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase">
                CITRUS
              </span>
            </div>
            {/* Pill 3: Sparkling */}
            <div className="bg-white rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shadow-md">
              <span className="text-[#82c91e] text-xs font-black leading-none">
                ✦
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase">
                SPARKLING
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
