"use client";

import React, { useState } from "react";

export default function UsersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");

  const users = [
    {
      id: "USR-001",
      name: "I Made Sukadana",
      email: "sukadana.bali@beachclub.com",
      role: "Distributor",
      location: "Kuta, Bali",
      totalOrders: "128 Pesanan",
      totalSpent: "Rp 148.500.000",
      status: "Aktif",
      joinDate: "12 Jan 2024",
    },
    {
      id: "USR-002",
      name: "Sarah Jenkins",
      email: "sarah.j@canggucafe.co.id",
      role: "Wholesaler",
      location: "Canggu, Bali",
      totalOrders: "45 Pesanan",
      totalSpent: "Rp 62.400.000",
      status: "Aktif",
      joinDate: "03 Feb 2024",
    },
    {
      id: "USR-003",
      name: "Ketut Bagus Arnawa",
      email: "arnawa.reseller@gmail.com",
      role: "Reseller",
      location: "Ubud, Gianyar",
      totalOrders: "29 Pesanan",
      totalSpent: "Rp 34.250.000",
      status: "Aktif",
      joinDate: "18 Mar 2024",
    },
    {
      id: "USR-004",
      name: "Clarissa Putri",
      email: "clarissa.p@gmail.com",
      role: "Retail Customer",
      location: "Denpasar Selatan",
      totalOrders: "12 Pesanan",
      totalSpent: "Rp 3.840.000",
      status: "Aktif",
      joinDate: "22 Apr 2024",
    },
    {
      id: "USR-005",
      name: "Wayan Gede Aditya",
      email: "aditya.sunsetbar@yahoo.com",
      role: "Wholesaler",
      location: "Seminyak, Bali",
      totalOrders: "67 Pesanan",
      totalSpent: "Rp 98.600.000",
      status: "Aktif",
      joinDate: "09 Mei 2024",
    },
    {
      id: "USR-006",
      name: "Liam O'Connor",
      email: "liam.surfbali@gmail.com",
      role: "Retail Customer",
      location: "Uluwatu, Bali",
      totalOrders: "6 Pesanan",
      totalSpent: "Rp 1.950.000",
      status: "Menunggu Verifikasi",
      joinDate: "28 Okt 2024",
    },
  ];

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "Semua" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-black text-zesto-forest">
            Manajemen Pengguna &amp; Mitra
          </h2>
          <p className="text-xs text-zesto-gray-500 mt-1">
            Kelola data distributor, reseller, kafe rekanan, dan pelanggan retail Zestó.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-zesto-forest text-zesto-lime rounded-xl text-xs font-bold hover:bg-zesto-forest-hover transition-colors shadow-sm cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <span>Tambah Mitra Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Mini */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-[11px] font-bold text-zesto-gray-500 uppercase">Total Pengguna Terdaftar</p>
          <p className="text-2xl font-black text-zesto-forest mt-1">1.482 Mitra</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ +14% bulan ini</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-[11px] font-bold text-zesto-gray-500 uppercase">Distributor &amp; Wholesaler</p>
          <p className="text-2xl font-black text-zesto-forest mt-1">146 Akun</p>
          <span className="text-[11px] text-zesto-forest font-semibold">Kontribusi 78% Omset</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-[11px] font-bold text-zesto-gray-500 uppercase">Rata-rata Belanja Mitra</p>
          <p className="text-2xl font-black text-zesto-forest mt-1">Rp 14.850.000</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ +8.2% vs bulan lalu</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-zesto-gray-200/80 shadow-card flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, email, atau lokasi..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zesto-mint-subtle border border-zesto-gray-200 focus:outline-none focus:ring-2 focus:ring-zesto-forest/20 text-zesto-forest placeholder-zesto-gray-400"
          />
          <svg
            className="w-4 h-4 text-zesto-gray-400 absolute left-3 top-2.5 stroke-current stroke-2 fill-none"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
          {["Semua", "Distributor", "Wholesaler", "Reseller", "Retail Customer"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setRoleFilter(role)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                roleFilter === role
                  ? "bg-zesto-forest text-zesto-lime font-bold"
                  : "bg-zesto-mint text-zesto-gray-700 hover:bg-zesto-gray-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-zesto-gray-400 border-b border-zesto-gray-100 uppercase tracking-wider text-[10px]">
                <th className="font-bold py-3 pr-4">ID &amp; Nama Mitra</th>
                <th className="font-bold py-3 px-4">Tipe Akun</th>
                <th className="font-bold py-3 px-4">Lokasi</th>
                <th className="font-bold py-3 px-4">Frekuensi Order</th>
                <th className="font-bold py-3 px-4 text-right">Total Transaksi</th>
                <th className="font-bold py-3 px-4 text-center">Status</th>
                <th className="font-bold py-3 pl-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zesto-gray-100 font-medium">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-zesto-mint-subtle transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zesto-mint text-zesto-forest font-bold flex items-center justify-center shrink-0">
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-zesto-forest text-sm">{user.name}</p>
                        <p className="text-[11px] text-zesto-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-zesto-mint text-zesto-forest">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zesto-gray-600 whitespace-nowrap">
                    {user.location}
                  </td>
                  <td className="py-3.5 px-4 text-zesto-gray-600 whitespace-nowrap">
                    {user.totalOrders}
                  </td>
                  <td className="py-3.5 px-4 font-black text-zesto-forest text-right whitespace-nowrap">
                    {user.totalSpent}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        user.status === "Aktif"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-semibold text-zesto-forest bg-zesto-mint hover:bg-zesto-lime rounded-lg transition-colors cursor-pointer"
                    >
                      Detail
                    </button>
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

