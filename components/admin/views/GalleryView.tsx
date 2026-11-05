"use client";

import React from "react";

export default function GalleryView() {
  const assets = [
    {
      title: "Zestó Lime Splash 330ml Can Render",
      tag: "Product Render 3D",
      res: "3840 x 2160 px",
      size: "4.8 MB",
      format: "PNG (Alpha)",
      color: "from-lime-400 to-emerald-600",
    },
    {
      title: "Citrus Bloom Sparkling Can Hero Shot",
      tag: "Product Render 3D",
      res: "3840 x 2160 px",
      size: "5.1 MB",
      format: "PNG (Alpha)",
      color: "from-amber-400 to-orange-600",
    },
    {
      title: "Berry Breeze Wild Strawberry Studio Shot",
      tag: "Studio Photography",
      res: "4000 x 3000 px",
      size: "6.2 MB",
      format: "JPG (High-Res)",
      color: "from-rose-400 to-pink-600",
    },
    {
      title: "Mint Chill Botanical Garden Flatlay",
      tag: "Lifestyle Marketing",
      res: "3840 x 2160 px",
      size: "4.2 MB",
      format: "JPG (High-Res)",
      color: "from-emerald-400 to-teal-700",
    },
    {
      title: "Zestó Wooden Crate & 12-Can Pack Box",
      tag: "Packaging Assets",
      res: "2560 x 1440 px",
      size: "3.7 MB",
      format: "PNG (Alpha)",
      color: "from-stone-400 to-stone-700",
    },
    {
      title: "Bali Beach Club Sunset Promotional Banner",
      tag: "Social Media Banner",
      res: "1080 x 1920 px",
      size: "2.9 MB",
      format: "MP4 / Loop",
      color: "from-cyan-400 to-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-black text-zesto-forest">
            Galeri Aset Visual &amp; Media Brand
          </h2>
          <p className="text-xs text-zesto-gray-500 mt-1">
            Kumpulan aset visual resmi, render kemasan kaleng 330ml, dan materi promosi siap pakai.
          </p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-zesto-forest text-zesto-lime rounded-xl text-xs font-bold hover:bg-zesto-forest-hover transition-colors shadow-sm cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
          </svg>
          <span>Unggah Aset Baru</span>
        </button>
      </div>

      {/* Grid of Assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {assets.map((asset) => (
          <div
            key={asset.title}
            className="bg-white rounded-2xl border border-zesto-gray-200/80 shadow-card overflow-hidden hover:shadow-elevated transition-shadow flex flex-col"
          >
            {/* Mock Visual Thumbnail */}
            <div
              className={`h-40 bg-gradient-to-br ${asset.color} p-4 flex flex-col justify-between text-white relative overflow-hidden`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full">
                  {asset.tag}
                </span>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md">
                  {asset.format}
                </span>
              </div>
              <div className="text-xs font-bold opacity-80">{asset.res}</div>
            </div>

            {/* Asset Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-zesto-forest">{asset.title}</h4>
                <p className="text-xs text-zesto-gray-400 mt-1">Ukuran file: {asset.size}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-zesto-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700">✓ Siap Digunakan</span>
                <button
                  type="button"
                  className="px-3 py-1 bg-zesto-mint hover:bg-zesto-lime text-zesto-forest font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Unduh File
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

