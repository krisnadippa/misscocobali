"use client";

import React from "react";

export default function MarketingView() {
  const promos = [
    {
      code: "ZESTOFRESH20",
      description: "Diskon 20% khusus pembelian pertama di website",
      discount: "20% OFF",
      usage: "482 kali digunakan",
      revenue: "Rp 72.300.000",
      status: "Aktif",
    },
    {
      code: "BALIBEACH",
      description: "Gratis ongkir instan area Kuta, Seminyak, Canggu",
      discount: "Free Shipping",
      usage: "891 kali digunakan",
      revenue: "Rp 128.400.000",
      status: "Aktif",
    },
    {
      code: "GROSIR50",
      description: "Potongan Rp 500.000 min. order 50 kaleng untuk kafe/resto",
      discount: "Rp 500.000 OFF",
      usage: "64 kali digunakan",
      revenue: "Rp 192.000.000",
      status: "Aktif",
    },
    {
      code: "SUMMERVIBES",
      description: "Promo bundling kaleng edisi liburan musim panas",
      discount: "Bundle 15%",
      usage: "312 kali digunakan",
      revenue: "Rp 46.800.000",
      status: "Berakhir",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-black text-zesto-forest">
            Kampanye Pemasaran &amp; Voucher Diskon
          </h2>
          <p className="text-xs text-zesto-gray-500 mt-1">
            Pantau efektivitas kode kupon promo, referral kemitraan, dan promosi musiman.
          </p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-zesto-forest text-zesto-lime rounded-xl text-xs font-bold hover:bg-zesto-forest-hover transition-colors shadow-sm cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span>Buat Kupon Baru</span>
        </button>
      </div>

      {/* Promos Table */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80">
        <h3 className="text-sm font-bold text-zesto-forest mb-4">Daftar Kupon Promo Aktif</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-zesto-gray-400 border-b border-zesto-gray-100 uppercase tracking-wider text-[10px]">
                <th className="font-bold py-3 pr-4">Kode Kupon</th>
                <th className="font-bold py-3 px-4">Deskripsi Program</th>
                <th className="font-bold py-3 px-4">Nilai Diskon</th>
                <th className="font-bold py-3 px-4">Jumlah Pemakaian</th>
                <th className="font-bold py-3 px-4 text-right">Omset Tercipta (Rp)</th>
                <th className="font-bold py-3 pl-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zesto-gray-100 font-medium">
              {promos.map((p) => (
                <tr key={p.code} className="hover:bg-zesto-mint-subtle transition-colors">
                  <td className="py-3.5 pr-4 whitespace-nowrap">
                    <span className="font-black text-zesto-forest px-2.5 py-1 rounded-lg bg-zesto-mint border border-zesto-gray-200 font-mono tracking-wider">
                      {p.code}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zesto-gray-700">{p.description}</td>
                  <td className="py-3.5 px-4 font-bold text-zesto-forest whitespace-nowrap">{p.discount}</td>
                  <td className="py-3.5 px-4 text-zesto-gray-600 whitespace-nowrap">{p.usage}</td>
                  <td className="py-3.5 px-4 font-black text-zesto-forest text-right whitespace-nowrap">{p.revenue}</td>
                  <td className="py-3.5 pl-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === "Aktif"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

