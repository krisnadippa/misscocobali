"use client";

import React from "react";
import Header from "./Header";
import { useCart } from "@/context/CartContext";

export default function HeroSection() {
  const { addToCart } = useCart();

  return (
    <div
      className="relative w-full overflow-hidden hero-container flex flex-col justify-between"
      style={{ minHeight: "min(88vh, 780px)", height: "min(88vh, 780px)" }}
    >
      {/* Background Hero Visual (Sky, Models, Splashes & Cans) */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Zestó Sparkling Drink with cheerful models enjoying lime and matcha flavors under blue sky"
          className="w-full h-full object-cover object-center scale-[1.01]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsZ2kdphE6DLGqM9zqVseUgLTaJwvdim9oNfpZWr9H878Xt-sVntzIA2EDJ6mXgl6Poh7Gk-WXpzrUh63E4QEr8GaUqHYwu5IzeBEHOeytkgaRfaq8iGr7yL-YxhS9N1TPOk49BMbuTQ2roUvGsYVSHHA5WYTCJ6M3O2htF_Ua6xkJt1k7wpv7sOkGvsyjdxNFmy4bXHvsirA4f0ffXS2HidDaniPOy7FOhqxchenb"
        />
        {/* Gentle ambient gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15 pointer-events-none" />
      </div>

      {/* Header Navigation */}
      <Header />

      {/* Hero Body And Cards */}
      <main
        className="relative z-20 flex-1 flex flex-col justify-between max-w-7xl w-full mx-auto px-6 sm:px-10 pb-8 pointer-events-none"
        style={{ paddingBottom: "0px" }}
      >
        {/* Central Layer with Floating Interactive Callout Cards */}
        <div className="w-full flex-1 flex items-center justify-between py-6">
          {/* Left Product Tag: Lime Rush */}
          <div
            className="pointer-events-auto w-[180px] sm:w-[215px] -mt-10 sm:-mt-6"
            style={{
              transform:
                "translate(calc(160px + clamp(20px, 6vw, 70px)), -25px)",
            }}
          >
            <div className="rounded-3xl border-2 border-white/80 transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-end h-[280px] sm:h-[320px] p-2 relative pointer-events-auto shadow-2xl">
              <div className="bg-white rounded-[20px] pt-2.5 pb-2 px-3 flex items-center justify-between shadow-lg">
                <div>
                  <h3 className="font-condensed text-base sm:text-lg font-bold uppercase tracking-tight text-[#0a3321] leading-tight">
                    LIME RUSH
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                    Rp 28.000
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: "lime-rush",
                      name: "LIME RUSH",
                      price: 28000,
                      image:
                        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
                    })
                  }
                  aria-label="Add Lime Rush to cart"
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
          </div>

          {/* Right Product Tag: Matcha Fizz */}
          <div
            className="pointer-events-auto w-[180px] sm:w-[215px] mt-10 sm:mt-16"
            style={{
              transform:
                "translate(calc(-80px - clamp(90px, 12vw, 170px)), 10px)",
            }}
          >
            <div className="rounded-3xl border-2 border-white/80 transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-end h-[280px] sm:h-[320px] p-2 relative pointer-events-auto shadow-2xl">
              <div className="bg-white rounded-[20px] pt-2.5 pb-2 px-3 flex items-center justify-between shadow-lg">
                <div>
                  <h3 className="font-condensed text-base sm:text-lg font-bold uppercase tracking-tight text-[#0a3321] leading-tight">
                    MATCHA FIZZ
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
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
          </div>
        </div>

        {/* Bottom Gigantic Typography Backdrop "SPARKLING" */}
        <div
          className="w-full text-center flex justify-center items-end select-none pointer-events-none"
          style={{ transform: "translateY(0px)" }}
        >
          <h1
            className="font-condensed font-black tracking-tighter uppercase select-none pointer-events-none text-white leading-none text-center"
            style={{
              fontSize: "clamp(6.5rem, 23vw, 22rem)",
              letterSpacing: "-0.02em",
              transform: "translateY(32%) scaleY(1.42)",
              transformOrigin: "center bottom",
              lineHeight: 0.8,
            }}
          >
            SPARKLING
          </h1>
        </div>
      </main>
    </div>
  );
}
