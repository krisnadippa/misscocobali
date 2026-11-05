"use client";

import React from "react";

export default function StatisticsView() {
  const trafficSources = [
    { source: "Instagram Ads (Beach & Summer Vibes)", visitors: "42.800", convRate: "5.4%", revenue: "Rp 184.200.000" },
    { source: "Organic Search / Google Bali", visitors: "28.400", convRate: "6.2%", revenue: "Rp 156.400.000" },
    { source: "Direct QR Code (Di Kemasan Kaleng)", visitors: "19.600", convRate: "8.9%", revenue: "Rp 138.900.000" },
    { source: "TikTok Viral & Bali Influencers", visitors: "34.100", convRate: "4.1%", revenue: "Rp 112.500.000" },
    { source: "Mitra Kafe & Beach Club Referrals", visitors: "12.500", convRate: "9.8%", revenue: "Rp 98.400.000" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <h2 className="text-xl font-black text-zesto-forest">
          Statistik &amp; Analitik Pengunjung
        </h2>
        <p className="text-xs text-zesto-gray-500 mt-1">
          Performa konversi situs, efektivitas kampanye, dan retensi pelanggan setia Zestó.
        </p>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-xs font-bold text-zesto-gray-500 uppercase">Conversion Rate</p>
          <h3 className="text-2xl font-black text-zesto-forest mt-2">5.82%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">↑ +1.2% dari rata-rata e-commerce</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-xs font-bold text-zesto-gray-500 uppercase">Average Order Value (AOV)</p>
          <h3 className="text-2xl font-black text-zesto-forest mt-2">Rp 485.000</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">↑ Pelanggan memilih bundle isi 12</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-xs font-bold text-zesto-gray-500 uppercase">Repeat Customer Rate</p>
          <h3 className="text-2xl font-black text-zesto-forest mt-2">68.4%</h3>
          <p className="text-xs text-zesto-forest font-semibold mt-1">Tingkat kepuasan rasa sangat tinggi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-xs font-bold text-zesto-gray-500 uppercase">Cart Abandonment Rate</p>
          <h3 className="text-2xl font-black text-zesto-forest mt-2">18.2%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Rendah berkat checkout kilat</p>
        </div>
      </div>

      {/* Traffic Table */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80">
        <h3 className="text-sm font-bold text-zesto-forest mb-4">Sumber Lalu Lintas &amp; Pendapatan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-zesto-gray-400 border-b border-zesto-gray-100 uppercase tracking-wider text-[10px]">
                <th className="font-bold py-3 pr-4">Channel Akuisisi</th>
                <th className="font-bold py-3 px-4">Pengunjung Unik</th>
                <th className="font-bold py-3 px-4">Tingkat Konversi</th>
                <th className="font-bold py-3 pl-4 text-right">Kontribusi Omset (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zesto-gray-100 font-medium">
              {trafficSources.map((t) => (
                <tr key={t.source} className="hover:bg-zesto-mint-subtle transition-colors">
                  <td className="py-3.5 pr-4 font-bold text-zesto-forest">{t.source}</td>
                  <td className="py-3.5 px-4 text-zesto-gray-600">{t.visitors}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[11px]">
                      {t.convRate}
                    </span>
                  </td>
                  <td className="py-3.5 pl-4 text-right font-black text-zesto-forest">{t.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

