"use client";

import React, { useState } from "react";

export default function MailboxView() {
  const [selectedMail, setSelectedMail] = useState<number | null>(0);

  const messages = [
    {
      id: 0,
      sender: "Gede Artha (General Manager @ Finns Beach Club)",
      email: "gm@finnsbeachclub.com",
      subject: "Pengajuan Kemitraan Eksklusif Sparkling Soda Bar 2025",
      time: "10:24 WITA",
      tag: "Kemitraan",
      unread: true,
      content:
        "Halo Tim Zestó Bali,\n\nKami tertarik untuk memasukkan Zestó Lime Splash dan Citrus Bloom sebagai signature mixer sparkling di 3 pool bar kami. Bisakah kami jadwalkan sesi tasting dan mendiskusikan harga grosir untuk komitmen 500 krat/bulan?\n\nSalam hangat,\nGede Artha",
    },
    {
      id: 1,
      sender: "Amanda Roberts (Purchase Manager @ Maya Ubud Resort)",
      email: "purchasing@mayaubud.com",
      subject: "Permintaan Penawaran Katalog Minuman Selamat Datang (Welcome Drink)",
      time: "Kemarin, 16:45",
      tag: "Penawaran",
      unread: false,
      content:
        "Selamat sore,\n\nKami sangat menyukai konsep kemasan dan cita rasa segar alami Zestó. Kami ingin mengajukan pengadaan rutin varian Mint Chill dan Berry Breeze untuk sajian welcome drink para tamu resort kami. Mohon info pricelist dan terms of payment B2B.\n\nBest regards,\nAmanda Roberts",
    },
    {
      id: 2,
      sender: "Rian Hidayat (Distributor F&B Surabaya & Jatim)",
      email: "rian.distro@surabayafnb.co.id",
      subject: "Minat Menjadi Distributor Resmi Zestó Wilayah Jawa Timur",
      time: "02 Nov 2024",
      tag: "Distribusi",
      unread: false,
      content:
        "Kepada Yth. Manajemen Zestó,\n\nKami memiliki jaringan distribusi ke lebih dari 120 kafe dan supermarket modern di Surabaya dan Malang. Kami melihat antusiasme besar terhadap minuman craft soda segar di kota kami. Bisakah kita berdiskusi mengenai kuota minimum dan proteksi area distributor?\n\nTerima kasih,\nRian Hidayat",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-black text-zesto-forest">
            Kotak Masuk Pesan &amp; Kemitraan
          </h2>
          <p className="text-xs text-zesto-gray-500 mt-1">
            Pesan masuk dari calon mitra bisnis, beach club, resort, dan distributor baru.
          </p>
        </div>
        <span className="px-3 py-1 bg-zesto-forest text-zesto-lime rounded-full text-xs font-bold self-start sm:self-auto">
          1 Pesan Belum Dibaca
        </span>
      </div>

      {/* Mail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Message List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-zesto-gray-200/80 shadow-card divide-y divide-zesto-gray-100 overflow-hidden">
          {messages.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMail(m.id)}
              className={`w-full text-left p-4 transition-colors cursor-pointer block ${
                selectedMail === m.id
                  ? "bg-zesto-mint/80 border-l-4 border-zesto-forest"
                  : "hover:bg-zesto-mint-subtle"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-bold ${m.unread ? "text-zesto-forest font-black" : "text-zesto-gray-700"}`}>
                  {m.sender.split("(")[0]}
                </span>
                <span className="text-[11px] text-zesto-gray-400">{m.time}</span>
              </div>
              <p className={`text-xs font-semibold ${m.unread ? "text-zesto-forest font-bold" : "text-zesto-gray-600"} truncate`}>
                {m.subject}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-zesto-gray-200 text-zesto-forest">
                  {m.tag}
                </span>
                {m.unread && (
                  <span className="w-2 h-2 rounded-full bg-zesto-lime inline-block" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Right: Message Detail */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-zesto-gray-200/80 shadow-card p-6 flex flex-col justify-between">
          {selectedMail !== null ? (
            <div>
              <div className="border-b border-zesto-gray-100 pb-4">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-zesto-mint text-zesto-forest">
                  {messages[selectedMail].tag}
                </span>
                <h3 className="text-base font-black text-zesto-forest mt-2">
                  {messages[selectedMail].subject}
                </h3>
                <div className="flex items-center justify-between text-xs text-zesto-gray-500 mt-2">
                  <p>
                    Dari: <strong className="text-zesto-forest">{messages[selectedMail].sender}</strong> &lt;{messages[selectedMail].email}&gt;
                  </p>
                  <span>{messages[selectedMail].time}</span>
                </div>
              </div>

              <div className="py-6 text-xs text-zesto-gray-700 whitespace-pre-line leading-relaxed">
                {messages[selectedMail].content}
              </div>

              <div className="pt-4 border-t border-zesto-gray-100 flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-zesto-forest text-zesto-lime rounded-xl text-xs font-bold hover:bg-zesto-forest-hover transition-colors shadow-sm cursor-pointer"
                >
                  Balas Pesan via Email
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-zesto-gray-200 text-zesto-gray-700 rounded-xl text-xs font-semibold hover:bg-zesto-mint transition-colors cursor-pointer"
                >
                  Teruskan ke Tim Sales B2B
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-zesto-gray-400 text-center py-12">Pilih pesan di samping untuk membaca.</p>
          )}
        </div>
      </div>
    </div>
  );
}

