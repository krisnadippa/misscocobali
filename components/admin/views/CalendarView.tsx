"use client";

import React from "react";

export default function CalendarView() {
  const events = [
    {
      date: "05 Nov 2024",
      time: "08:00 - 12:00 WITA",
      title: "Batch Bottling #24 (Lime Splash & Citrus Bloom)",
      location: "Fasilitas Produksi Tabanan, Bali",
      type: "Produksi",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: "Pengalengan 15.000 kaleng dengan infusi sari buah asli dan CO2 bertekanan.",
    },
    {
      date: "06 Nov 2024",
      time: "14:00 - 17:00 WITA",
      title: "Pengiriman Grosir Ekspedisi Dingin (Cold Chain)",
      location: "Gudang Logistik Sanur → 12 Beach Club Seminyak",
      type: "Distribusi",
      badgeColor: "bg-blue-100 text-blue-800",
      description: "Pengiriman 120 krat kayu Zestó dengan armada truk berpendingin.",
    },
    {
      date: "08 Nov 2024",
      time: "16:00 - 21:00 WITA",
      title: "Pop-Up Booth & Free Tasting (Zestó Refresh Lab)",
      location: "Pantai Echo Beach, Canggu",
      type: "Event & Promo",
      badgeColor: "bg-amber-100 text-amber-800",
      description: "Sesi sampling langsung ke wisatawan lokal & mancanegara dengan photobooth.",
    },
    {
      date: "12 Nov 2024",
      time: "10:00 WITA",
      title: "Audit Standar Mutu BPOM & Sertifikasi Organik",
      location: "Kantor Pusat Denpasar",
      type: "Kepatuhan",
      badgeColor: "bg-purple-100 text-purple-800",
      description: "Pemeriksaan kelayakan sanitasi dan higienitas proses produksi berkala.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-black text-zesto-forest">
            Jadwal Operasional &amp; Produksi
          </h2>
          <p className="text-xs text-zesto-gray-500 mt-1">
            Kalender terintegrasi batch pengalengan, jadwal pengiriman dingin, dan event tasting.
          </p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-zesto-forest text-zesto-lime rounded-xl text-xs font-bold hover:bg-zesto-forest-hover transition-colors shadow-sm cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span>Tambah Agenda Baru</span>
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((ev) => (
          <div
            key={ev.title}
            className="bg-white p-5 rounded-2xl border border-zesto-gray-200/80 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zesto-lime transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Date Box */}
              <div className="w-16 h-16 rounded-xl bg-zesto-forest text-zesto-lime flex flex-col items-center justify-center shrink-0">
                <span className="text-lg font-black leading-none">{ev.date.split(" ")[0]}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-white mt-1">
                  {ev.date.split(" ")[1]}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ev.badgeColor}`}>
                    {ev.type}
                  </span>
                  <span className="text-xs text-zesto-gray-400 font-medium">⏱ {ev.time}</span>
                  <span className="text-xs text-zesto-gray-500 font-medium">📍 {ev.location}</span>
                </div>
                <h3 className="text-base font-bold text-zesto-forest mt-1.5">{ev.title}</h3>
                <p className="text-xs text-zesto-gray-600 mt-1">{ev.description}</p>
              </div>
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl border border-zesto-gray-200 text-xs font-bold text-zesto-forest hover:bg-zesto-mint transition-colors self-start md:self-auto cursor-pointer"
            >
              Lihat Rincian
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

