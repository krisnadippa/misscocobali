"use client";

import React, { useState } from "react";

export default function SettingsView() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <h2 className="text-xl font-black text-zesto-forest">
          Pengaturan Operasional &amp; Sistem Toko
        </h2>
        <p className="text-xs text-zesto-gray-500 mt-1">
          Konfigurasi identitas usaha, mata uang Rupiah, payment gateway, dan opsi pengiriman dingin.
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between">
          <span>✓ Pengaturan berhasil disimpan ke sistem!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identitas Bisnis */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80 space-y-4">
          <h3 className="text-sm font-bold text-zesto-forest border-b border-zesto-gray-100 pb-2">
            1. Identitas Usaha &amp; Legalitas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-zesto-gray-700 mb-1">Nama Brand / Toko</label>
              <input
                type="text"
                defaultValue="Zestó Sparkling Beverage"
                className="w-full px-3 py-2 rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none focus:ring-2 focus:ring-zesto-forest/20"
              />
            </div>
            <div>
              <label className="block font-bold text-zesto-gray-700 mb-1">Nama Badan Hukum (PT/CV)</label>
              <input
                type="text"
                defaultValue="PT Zesto Segar Alami Indonesia"
                className="w-full px-3 py-2 rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none focus:ring-2 focus:ring-zesto-forest/20"
              />
            </div>
            <div>
              <label className="block font-bold text-zesto-gray-700 mb-1">Email Resmi Usaha</label>
              <input
                type="email"
                defaultValue="hello@zestobali.com"
                className="w-full px-3 py-2 rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none focus:ring-2 focus:ring-zesto-forest/20"
              />
            </div>
            <div>
              <label className="block font-bold text-zesto-gray-700 mb-1">Nomor WhatsApp CS Bisnis</label>
              <input
                type="text"
                defaultValue="+62 812-3456-7890"
                className="w-full px-3 py-2 rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none focus:ring-2 focus:ring-zesto-forest/20"
              />
            </div>
          </div>
        </div>

        {/* Mata Uang & Finansial */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80 space-y-4">
          <h3 className="text-sm font-bold text-zesto-forest border-b border-zesto-gray-100 pb-2">
            2. Mata Uang, Pajak &amp; Gateway Pembayaran
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-zesto-gray-700 mb-1">Mata Uang Utama</label>
              <select className="w-full px-3 py-2 rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-bold text-zesto-forest focus:outline-none">
                <option>IDR - Rupiah Indonesia (Rp)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-zesto-gray-700 mb-1">Tarif PPN (Pajak)</label>
              <input
                type="text"
                defaultValue="11% (Termasuk di harga)"
                className="w-full px-3 py-2 rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-zesto-gray-700 mb-1">Status Gateway (Midtrans / Xendit)</label>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span className="font-bold text-emerald-700 text-xs">Terhubung &amp; Siap Terima Bayar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ekspedisi */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80 space-y-4">
          <h3 className="text-sm font-bold text-zesto-forest border-b border-zesto-gray-100 pb-2">
            3. Logistik Pengiriman Dingin &amp; Kurir
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              { name: "GoSend Instant Bali", desc: "Radius 30km dari Sanur", active: true },
              { name: "GrabExpress SameDay", desc: "Kuta, Denpasar, Seminyak", active: true },
              { name: "JNE Trucking (JTR)", desc: "Pengiriman antar pulau pulau Jawa/Lombok", active: true },
              { name: "Lalamove Cold Box Truck", desc: "Grosir di atas 20 krat kayu", active: true },
            ].map((k) => (
              <div key={k.name} className="p-3 rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle flex flex-col justify-between">
                <div>
                  <p className="font-bold text-zesto-forest">{k.name}</p>
                  <p className="text-[11px] text-zesto-gray-500 mt-0.5">{k.desc}</p>
                </div>
                <span className="mt-2 text-[10px] font-bold text-emerald-700">✓ Aktif</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-zesto-forest text-zesto-lime rounded-xl text-xs font-black hover:bg-zesto-forest-hover transition-colors shadow-elevated cursor-pointer"
        >
          Simpan Semua Pengaturan
        </button>
      </form>
    </div>
  );
}

