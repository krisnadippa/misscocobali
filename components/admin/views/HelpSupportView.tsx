"use client";

import React from "react";

export default function HelpSupportView() {
  const faqs = [
    {
      q: "Bagaimana cara menerbitkan invoice faktur pajak resmi untuk hotel/beach club?",
      a: "Buka menu Transaksi, pilih nomor transaksi tujuan, lalu klik tombol 'Cetak Faktur Pajak B2B (PDF)'. Sistem otomatis menghasilkan nomor seri faktur pajak standar Dirjen Pajak.",
    },
    {
      q: "Bagaimana menambahkan varian rasa musiman baru (Limited Edition)?",
      a: "Anda dapat mendaftarkan varian baru pada sistem katalog produk lengkap dengan foto render kaleng 3D dan menetapkan kuota kaleng yang siap dipasarkan.",
    },
    {
      q: "Apakah pesanan via GoSend Instant langsung otomatis mengirim notifikasi ke kurir?",
      a: "Ya, integrasi API logistik lokal otomatis memanggil kurir begitu Anda menekan tombol 'Siapkan Pengiriman Dingin' pada transaksi yang berstatus Lunas.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <h2 className="text-xl font-black text-zesto-forest">
          Pusat Bantuan &amp; Panduan Operasional
        </h2>
        <p className="text-xs text-zesto-gray-500 mt-1">
          Dokumentasi teknis, pertanyaan yang sering diajukan (FAQ), dan kontak dukungan sistem Zestó.
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zesto-forest text-white p-5 rounded-2xl shadow-elevated flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 text-zesto-lime flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-sm text-zesto-lime">Hubungi Tim Teknis (Priority)</h3>
            <p className="text-xs text-zesto-mint/80 mt-1">
              Bantuan cepat teknis operasional via WhatsApp hotline developer.
            </p>
            <p className="text-xs font-mono font-bold mt-2 text-white">WA: +62 811-2345-6789</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zesto-gray-200/80 shadow-card flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-zesto-mint text-zesto-forest flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-sm text-zesto-forest">Status Server &amp; Gateway</h3>
            <p className="text-xs text-zesto-gray-500 mt-1">
              Semua server database, sistem pembayaran, dan API pengiriman online.
            </p>
            <p className="text-xs font-bold text-emerald-700 mt-2">● 100% Uptime (Operasional Normal)</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80">
        <h3 className="text-sm font-bold text-zesto-forest mb-4">Pertanyaan Populer (FAQ)</h3>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-zesto-mint-subtle border border-zesto-gray-100">
              <h4 className="font-bold text-xs text-zesto-forest">{f.q}</h4>
              <p className="text-xs text-zesto-gray-600 mt-1.5 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

