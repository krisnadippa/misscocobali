"use client";

import React, { useState } from "react";

export default function ReportsView() {
  const [reportPeriod, setReportPeriod] = useState("Kuartal 4 (Okt - Des 2024)");

  const flavorsReport = [
    {
      name: "Lime Splash (Original Sparkling)",
      unitsSold: "24.850 Kaleng",
      revenue: "Rp 372.750.000",
      percentage: "42%",
      trend: "↑ +18%",
      color: "bg-[#b5e800]",
    },
    {
      name: "Citrus Bloom (Grapefruit & Orange)",
      unitsSold: "16.400 Kaleng",
      revenue: "Rp 246.000.000",
      percentage: "28%",
      trend: "↑ +12%",
      color: "bg-amber-400",
    },
    {
      name: "Berry Breeze (Strawberry Wild)",
      unitsSold: "11.200 Kaleng",
      revenue: "Rp 168.000.000",
      percentage: "19%",
      trend: "↑ +7%",
      color: "bg-rose-400",
    },
    {
      name: "Mint Chill (Refreshing Garden Mint)",
      unitsSold: "6.450 Kaleng",
      revenue: "Rp 96.750.000",
      percentage: "11%",
      trend: "↑ +4%",
      color: "bg-emerald-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-black text-zesto-forest">
            Laporan Finansial &amp; Penjualan
          </h2>
          <p className="text-xs text-zesto-gray-500 mt-1">
            Rekapitulasi penjualan per varian rasa, performa mitra grosir, dan net profit margin.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-zesto-gray-200 bg-zesto-mint text-zesto-forest font-semibold focus:outline-none"
          >
            <option>Kuartal 4 (Okt - Des 2024)</option>
            <option>Kuartal 3 (Jul - Sep 2024)</option>
            <option>Kuartal 2 (Apr - Jun 2024)</option>
            <option>Tahun Buku 2024 Lengkap</option>
          </select>
          <button
            type="button"
            className="px-3.5 py-2 bg-zesto-forest text-zesto-lime rounded-xl text-xs font-bold hover:bg-zesto-forest-hover transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            <span>Ekspor PDF / Excel</span>
          </button>
        </div>
      </div>

      {/* 3 Summary Big Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-zesto-forest text-white p-6 rounded-2xl shadow-elevated relative overflow-hidden">
          <p className="text-xs font-bold text-zesto-lime uppercase tracking-wider">
            Total Omset Penjualan (Gross)
          </p>
          <h3 className="text-3xl font-black text-white mt-2">
            Rp 883.500.000
          </h3>
          <div className="flex items-center gap-2 mt-3 text-xs text-zesto-mint">
            <span className="font-bold text-zesto-lime">↑ +24.6%</span>
            <span>dibandingkan kuartal sebelumnya</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-card border border-zesto-gray-200/80">
          <p className="text-xs font-bold text-zesto-gray-500 uppercase tracking-wider">
            Total Unit Kaleng Terjual
          </p>
          <h3 className="text-3xl font-black text-zesto-forest mt-2">
            58.900 Kaleng
          </h3>
          <div className="flex items-center gap-2 mt-3 text-xs text-emerald-600 font-semibold">
            <span>Rata-rata 654 kaleng/hari di Bali</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-card border border-zesto-gray-200/80">
          <p className="text-xs font-bold text-zesto-gray-500 uppercase tracking-wider">
            Laba Bersih Operasional (Net)
          </p>
          <h3 className="text-3xl font-black text-zesto-forest mt-2">
            Rp 312.450.000
          </h3>
          <div className="flex items-center gap-2 mt-3 text-xs text-zesto-gray-500">
            <span>Net profit margin stabil pada 35.3%</span>
          </div>
        </div>
      </div>

      {/* Flavor Contribution Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80">
        <h3 className="text-sm font-bold text-zesto-forest mb-4">
          Kontribusi Pendapatan Berdasarkan Varian Rasa Zestó
        </h3>

        <div className="space-y-4">
          {flavorsReport.map((f) => (
            <div key={f.name} className="p-4 rounded-xl bg-zesto-mint-subtle border border-zesto-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${f.color}`} />
                  <span className="font-bold text-zesto-forest text-sm">{f.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="text-zesto-gray-500">{f.unitsSold}</span>
                  <span className="font-black text-zesto-forest text-sm">{f.revenue}</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                    {f.trend}
                  </span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-zesto-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-zesto-forest h-full rounded-full"
                  style={{ width: f.percentage }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

