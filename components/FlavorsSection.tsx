"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const FLAVORS = [
  {
    id: "kiwi-pop",
    name: "KIWI POP",
    price: 28000,
    formattedPrice: "Rp 28.000",
    tag: "FUN",
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lime-rush",
    name: "LIME RUSH",
    price: 28000,
    formattedPrice: "Rp 28.000",
    tag: "FRESH",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "melon-burst",
    name: "MELON BURST",
    price: 32000,
    formattedPrice: "Rp 32.000",
    tag: "HAPPY",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coconut-breeze",
    name: "COCONUT BREEZE",
    price: 30000,
    formattedPrice: "Rp 30.000",
    tag: "TROPICAL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBknECjab9xvKrqqeifclw9Ebqn420ofq7lU_izNMckrzvUDRUkmizTC4L4yPkoXJyf5qUOOdBP8OcdY9fTJFIqdKyzqToqlXbe_G7-S5yoWeCgRTfih2v83YtnBiO_Lhlf7hKETwWPbU5gU36JrkCkLev7hDN7F6UOE6PAiduR5721b-m0COtEDKfVlklboATbAaBLj_q5LfTGXhoJqjsj8xe2sde7nvNRZxx2H_7y",
  },
  {
    id: "coconut-lime",
    name: "COCONUT LIME",
    price: 32000,
    formattedPrice: "Rp 32.000",
    tag: "EXOTIC",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDl63BkAH-hsrDQT9cc2JUpP7BhgdTrAb4W8sZBJ7vCfhRDCMEMtETUt4v09h2TVfqOTXONWPa6PdzwdkXZn2sSissHmPtl90X3Rdygvtxp8sJ8Y2sAa4X1vj0IqxV-RUTRG000Ci1ar9KXS99uPWhg_t29qFNuwxHBsFJ1vKqeteBGvZj8W2MrW7HqPrBebmjOD_wxC6KyvOJ0tNvSrHSH4woC0PaERpOMoZMXLnmB",
  },
  {
    id: "toasted-coconut",
    name: "TOASTED COCONUT",
    price: 35000,
    formattedPrice: "Rp 35.000",
    tag: "TOASTED",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2p2YFEDDq4d55DdqJfHPMF9kHty8hiB2I7QVL0TGj55sgAjnE2fBDj0N37V7JG0IidMYxDpJ1146oJSNY77ezxlrlLJdmOJittPhNrR-9fxHn7dApPhol50hS1TsqgiLtfMH5G1BBLPk-DIsGRme5ER9v0A5DMnt4wfnya4ysiwGJrIPaMk1CkJHXhq7rPOEcQ17bXGN0rbEvuLLsKAdF3rCYOTkB8zTTbgVnJRJj",
  },
];

export default function FlavorsSection() {
  const { addToCart } = useCart();

  return (
    <section
      id="flavors"
      className="bg-white py-16 sm:py-20 px-6 sm:px-10 font-sans text-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200/80 bg-gray-50/60 w-fit text-[11px] font-bold tracking-wider text-slate-600 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
              <span>OUR FLAVORS</span>
            </div>
            <div className="relative mt-1">
              <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0a3321] uppercase tracking-tight leading-[0.95]">
                SIX FLAVORS, ENDLESS
                <br />
                SUMMER ENERGY.
              </h2>
              <span
                className="font-script absolute left-[260px] sm:left-[360px] bottom-[-10px] sm:bottom-[-8px] text-3xl sm:text-4xl lg:text-5xl text-[#ccff00] drop-shadow-sm font-bold select-none pointer-events-none whitespace-nowrap"
                style={{ transform: "rotate(-4deg)" }}
              >
                Summer In a Can
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto mb-2">
            <button
              aria-label="Previous flavors"
              className="w-12 h-12 rounded-full border border-gray-200 text-slate-400 hover:text-black hover:border-black flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>
            <button
              aria-label="Next flavors"
              className="w-12 h-12 rounded-full border-2 border-[#ccff00] text-black hover:bg-[#ccff00] flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 6 Flavor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FLAVORS.map((flavor) => (
            <div
              key={flavor.id}
              className="bg-white rounded-3xl border border-gray-200/70 p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <Link
                href={`/products/${flavor.id}`}
                className="relative w-full aspect-[4/5] rounded-[22px] overflow-hidden bg-[#e0f1fc] block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flavor.image}
                  alt={`${flavor.name} Can Mockup`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 right-3.5 bg-[#ccff00] text-black text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-10">
                  <span>✦</span>
                  <span>{flavor.tag}</span>
                </div>
              </Link>

              <div className="p-3 sm:p-4 flex items-center justify-between">
                <Link href={`/products/${flavor.id}`} className="block group-hover:text-emerald-800 transition-colors">
                  <h3 className="font-condensed font-bold text-xl sm:text-2xl uppercase tracking-tight text-[#0a3321] leading-none">
                    {flavor.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1.5">
                    {flavor.formattedPrice}
                  </p>
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: flavor.id,
                      name: flavor.name,
                      price: flavor.price,
                      image: flavor.image,
                    })
                  }
                  aria-label={`Add ${flavor.name} to cart`}
                  className="w-11 h-11 rounded-full bg-[#ccff00] hover:bg-black hover:text-[#ccff00] text-black flex items-center justify-center transition-all duration-200 active:scale-90 shadow-sm cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
          ))}
        </div>
      </div>
    </section>
  );
}
