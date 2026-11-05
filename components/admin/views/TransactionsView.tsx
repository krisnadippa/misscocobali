"use client";

import React, { useState, useEffect } from "react";
import type { StoredOrder } from "@/lib/orders-db";

export interface TransactionItem {
  id: string;
  invoiceNo: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: string;
  detailedItems: {
    name: string;
    qty: number;
    unitPrice: number;
    total: number;
  }[];
  date: string;
  dueDate: string;
  amount: number;
  method: string;
  status: "Berhasil" | "Menunggu Pembayaran" | "Dibatalkan";
  notes?: string;
}

export default function TransactionsView() {
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterMethod, setFilterMethod] = useState("Semua");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<TransactionItem | null>(null);

  // Initial transactions state
  const [transactions, setTransactions] = useState<TransactionItem[]>([
    {
      id: "TRX-2024-8841",
      invoiceNo: "INV-ZST-241101",
      customer: "Potato Head Beach Club",
      customerEmail: "fnb@potatohead.co.id",
      customerPhone: "+62 811-399-445",
      address: "Jl. Petitenget No. 51B, Seminyak, Kuta Utara, Bali",
      items: "60x Lime Splash, 40x Citrus Bloom",
      detailedItems: [
        { name: "Zestó Lime Splash (330ml Can)", qty: 60, unitPrice: 150000, total: 9000000 },
        { name: "Zestó Citrus Bloom (330ml Can)", qty: 40, unitPrice: 150000, total: 6000000 },
      ],
      date: "04 Nov 2024, 18:30 WITA",
      dueDate: "11 Nov 2024",
      amount: 15000000,
      method: "BCA Virtual Account",
      status: "Berhasil",
      notes: "Pengiriman via Lalamove Cold-Chain box khusus hotel & beach club.",
    },
    {
      id: "TRX-2024-8840",
      invoiceNo: "INV-ZST-241102",
      customer: "Finns Beach Club Canggu",
      customerEmail: "bar.procurement@finnsbeachclub.com",
      customerPhone: "+62 812-388-990",
      address: "Jl. Pantai Berawa No. 99, Canggu, Tibubeneng, Bali",
      items: "120x Lime Splash (Krat Kayu Spesial)",
      detailedItems: [
        { name: "Zestó Lime Splash - Krat Kayu Eksklusif", qty: 120, unitPrice: 150000, total: 18000000 },
      ],
      date: "04 Nov 2024, 17:15 WITA",
      dueDate: "11 Nov 2024",
      amount: 18000000,
      method: "Mandiri Virtual Account",
      status: "Berhasil",
      notes: "Langsung diantar ke storage bar pool utama Finns.",
    },
    {
      id: "TRX-2024-8839",
      invoiceNo: "INV-ZST-241103",
      customer: "Ni Luh Putu Anggreni",
      customerEmail: "putu.anggreni@gmail.com",
      customerPhone: "+62 878-601-224",
      address: "Jl. Danau Tamblingan No. 14, Sanur, Denpasar Selatan, Bali",
      items: "4x 4-Pack Bundle Starter",
      detailedItems: [
        { name: "Zestó 4-Pack Starter Variety (4 Rasa Campur)", qty: 4, unitPrice: 160000, total: 640000 },
      ],
      date: "04 Nov 2024, 15:42 WITA",
      dueDate: "04 Nov 2024",
      amount: 640000,
      method: "QRIS Dinamis (GoPay / OVO)",
      status: "Berhasil",
      notes: "Pesanan retail instan via website Zestó.",
    },
    {
      id: "TRX-2024-8838",
      invoiceNo: "INV-ZST-241104",
      customer: "Revolver Espresso Seminyak",
      customerEmail: "orders@revolverespresso.com",
      customerPhone: "+62 813-370-112",
      address: "Jl. Kayu Aya No. 51, Seminyak, Kuta, Bali",
      items: "25x Mint Chill, 25x Berry Breeze",
      detailedItems: [
        { name: "Zestó Mint Chill (330ml Can)", qty: 25, unitPrice: 150000, total: 3750000 },
        { name: "Zestó Berry Breeze (330ml Can)", qty: 25, unitPrice: 150000, total: 3750000 },
      ],
      date: "04 Nov 2024, 14:10 WITA",
      dueDate: "07 Nov 2024",
      amount: 7500000,
      method: "Transfer Bank Manual (BCA)",
      status: "Menunggu Pembayaran",
      notes: "Menunggu bukti transfer konfirmasi staf finance kafe.",
    },
    {
      id: "TRX-2024-8837",
      invoiceNo: "INV-ZST-241105",
      customer: "Wayan Yoga Pratama",
      customerEmail: "yoga.pratama@yahoo.com",
      customerPhone: "+62 819-994-551",
      address: "Jl. Raya Semat No. 8, Berawa, Canggu, Bali",
      items: "2x 4-Pack Lime Splash",
      detailedItems: [
        { name: "Zestó Lime Splash 4-Pack", qty: 2, unitPrice: 160000, total: 320000 },
      ],
      date: "04 Nov 2024, 12:05 WITA",
      dueDate: "04 Nov 2024",
      amount: 320000,
      method: "Tunai / COD (Cash on Delivery)",
      status: "Berhasil",
      notes: "Uang tunai diterima oleh kurir GoSend Zestó.",
    },
    {
      id: "TRX-2024-8836",
      invoiceNo: "INV-ZST-241106",
      customer: "Maya Santoso",
      customerEmail: "maya.santoso@outlook.com",
      customerPhone: "+62 857-391-884",
      address: "Jl. Uluwatu No. 45, Jimbaran, Bali",
      items: "1x 4-Pack Citrus Bloom",
      detailedItems: [
        { name: "Zestó Citrus Bloom 4-Pack", qty: 1, unitPrice: 160000, total: 160000 },
      ],
      date: "04 Nov 2024, 09:20 WITA",
      dueDate: "04 Nov 2024",
      amount: 160000,
      method: "QRIS Dinamis (GoPay / OVO)",
      status: "Dibatalkan",
      notes: "Transaksi dibatalkan karena pembeli salah memilih varian rasa.",
    },
  ]);

  // Load synced orders from DB (/api/orders) including WhatsApp manual orders
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.orders) && res.orders.length > 0) {
          const dbItems: TransactionItem[] = res.orders.map((o: StoredOrder) => ({
            id: o.id,
            invoiceNo: o.invoiceNo,
            customer: o.customerName + (o.source === "whatsapp" ? " [WhatsApp]" : ""),
            customerEmail: o.customerEmail || "order@whatsapp.com",
            customerPhone: o.customerPhone,
            address: o.address || (o.source === "whatsapp" ? "Pesanan Manual WhatsApp Group" : "Bali Area"),
            items: o.itemsSummary,
            detailedItems: o.detailedItems || [{ name: o.itemsSummary, qty: 1, unitPrice: o.totalAmount, total: o.totalAmount }],
            date: o.createdAt,
            dueDate: o.createdAt,
            amount: o.totalAmount,
            method: o.source === "whatsapp" ? "WhatsApp Manual / Transfer" : o.paymentMethod || "Xendit Gateway",
            status: o.status === "Berhasil" ? "Berhasil" : o.status === "Dibatalkan" ? "Dibatalkan" : "Menunggu Pembayaran",
            notes: o.rawWhatsappMessage ? `Pesan WA: "${o.rawWhatsappMessage}"` : undefined,
          }));

          setTransactions((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newOnes = dbItems.filter((d) => !existingIds.has(d.id));
            return [...newOnes, ...prev];
          });
        }
      })
      .catch((err) => console.warn("Failed fetching synced orders:", err));
  }, []);

  // Form State for creating a new transaction
  const [formData, setFormData] = useState({
    customer: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    flavor: "Lime Splash (Original)",
    quantity: 10,
    unitPrice: 150000,
    method: "BCA Virtual Account",
    status: "Berhasil" as "Berhasil" | "Menunggu Pembayaran" | "Dibatalkan",
    notes: "",
  });

  const availableMethods = [
    "BCA Virtual Account",
    "Mandiri Virtual Account",
    "QRIS Dinamis (GoPay / OVO)",
    "Transfer Bank Manual (BCA)",
    "Tunai / COD (Cash on Delivery)",
    "Kartu Kredit / Debit Online",
  ];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(formData.quantity) || 1;
    const price = Number(formData.unitPrice) || 150000;
    const totalAmount = qty * price;
    const nextNum = transactions.length + 8842;
    const newTrxId = `TRX-2024-${nextNum}`;
    const newInvoiceNo = `INV-ZST-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTrx: TransactionItem = {
      id: newTrxId,
      invoiceNo: newInvoiceNo,
      customer: formData.customer || "Mitra Kafe / Pelanggan Baru",
      customerEmail: formData.customerEmail || "mitra@zestobali.com",
      customerPhone: formData.customerPhone || "+62 812-0000-0000",
      address: formData.address || "Denpasar, Bali",
      items: `${qty}x ${formData.flavor}`,
      detailedItems: [
        {
          name: `Zestó ${formData.flavor}`,
          qty: qty,
          unitPrice: price,
          total: totalAmount,
        },
      ],
      date: "04 Nov 2024, Baru saja WITA",
      dueDate: "11 Nov 2024",
      amount: totalAmount,
      method: formData.method,
      status: formData.status,
      notes: formData.notes || "Dibuat langsung oleh Admin Toko.",
    };

    setTransactions([newTrx, ...transactions]);
    setShowCreateModal(false);
    // Reset form
    setFormData({
      customer: "",
      customerEmail: "",
      customerPhone: "",
      address: "",
      flavor: "Lime Splash (Original)",
      quantity: 10,
      unitPrice: 150000,
      method: "BCA Virtual Account",
      status: "Berhasil",
      notes: "",
    });
  };

  const formatRupiah = (num: number) => {
    return `Rp ${num.toLocaleString("id-ID")}`;
  };

  // Filtered transactions
  const filtered = transactions.filter((t) => {
    const matchStatus = filterStatus === "Semua" || t.status === filterStatus;
    const matchMethod = filterMethod === "Semua" || t.method === filterMethod;
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.items.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchMethod && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zesto-gray-200/80 shadow-card">
        <div>
          <h2 className="text-xl font-black text-zesto-forest">
            Manajemen Transaksi &amp; Pembuatan Pesanan
          </h2>
          <p className="text-xs text-zesto-gray-500 mt-1">
            Buat transaksi baru, tetapkan metode pembayaran Indonesia, dan kelola faktur invoice resmi Zestó.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Main Action: Create Transaction (No sync button) */}
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-zesto-forest text-zesto-lime rounded-xl text-xs font-black hover:bg-zesto-forest-hover transition-all shadow-elevated cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <span>+ Buat Transaksi Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Stats in Rupiah */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-[11px] font-bold text-zesto-gray-500 uppercase">Total Transaksi Masuk</p>
          <p className="text-xl font-black text-zesto-forest mt-1">
            {formatRupiah(transactions.reduce((acc, curr) => (curr.status === "Berhasil" ? acc + curr.amount : acc), 0))}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">
            ✓ {transactions.filter((t) => t.status === "Berhasil").length} Pesanan Berhasil
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-[11px] font-bold text-zesto-gray-500 uppercase">Menunggu Pembayaran</p>
          <p className="text-xl font-black text-amber-600 mt-1">
            {formatRupiah(transactions.reduce((acc, curr) => (curr.status === "Menunggu Pembayaran" ? acc + curr.amount : acc), 0))}
          </p>
          <span className="text-[10px] text-amber-700 font-semibold">
            {transactions.filter((t) => t.status === "Menunggu Pembayaran").length} Invoice pending
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-[11px] font-bold text-zesto-gray-500 uppercase">Metode Paling Populer</p>
          <p className="text-xl font-black text-zesto-forest mt-1">BCA VA &amp; QRIS</p>
          <span className="text-[10px] text-zesto-forest font-semibold">82% Volume transaksi</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-zesto-gray-200/80 shadow-card">
          <p className="text-[11px] font-bold text-zesto-gray-500 uppercase">Total Invoice Diterbitkan</p>
          <p className="text-xl font-black text-zesto-forest mt-1">{transactions.length} Invoice</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Faktur resmi siap cetak</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zesto-gray-200/80 shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID transaksi, nama pembeli, produk..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zesto-mint-subtle border border-zesto-gray-200 focus:outline-none focus:ring-2 focus:ring-zesto-forest/20 text-zesto-forest placeholder-zesto-gray-400 font-medium"
          />
          <svg
            className="w-4 h-4 text-zesto-gray-400 absolute left-3 top-2.5 stroke-current stroke-2 fill-none"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {/* Method Filter */}
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-zesto-gray-200 bg-zesto-mint text-zesto-forest font-semibold focus:outline-none cursor-pointer"
          >
            <option value="Semua">Semua Metode Pembayaran</option>
            {availableMethods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {["Semua", "Berhasil", "Menunggu Pembayaran", "Dibatalkan"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  filterStatus === status
                    ? "bg-zesto-forest text-zesto-lime font-bold"
                    : "bg-zesto-mint text-zesto-gray-700 hover:bg-zesto-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-zesto-gray-400 border-b border-zesto-gray-100 uppercase tracking-wider text-[10px]">
                <th className="font-bold py-3 pr-4">ID &amp; No Invoice</th>
                <th className="font-bold py-3 px-4">Nama Pelanggan / Venue</th>
                <th className="font-bold py-3 px-4">Detail Pesanan</th>
                <th className="font-bold py-3 px-4">Tanggal</th>
                <th className="font-bold py-3 px-4">Metode Bayar</th>
                <th className="font-bold py-3 px-4 text-right">Total (Rp)</th>
                <th className="font-bold py-3 px-4 text-center">Status</th>
                <th className="font-bold py-3 pl-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zesto-gray-100 font-medium">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-zesto-mint-subtle transition-colors">
                  <td className="py-3.5 pr-4 whitespace-nowrap">
                    <p className="font-bold text-zesto-forest">{t.id}</p>
                    <p className="text-[10px] text-zesto-gray-400 font-mono">{t.invoiceNo}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-zesto-forest whitespace-nowrap">
                    {t.customer}
                  </td>
                  <td className="py-3.5 px-4 text-zesto-gray-600 max-w-xs truncate">
                    {t.items}
                  </td>
                  <td className="py-3.5 px-4 text-zesto-gray-500 whitespace-nowrap">
                    {t.date.split(",")[0]}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-zesto-mint text-zesto-forest border border-zesto-gray-200">
                      {t.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-zesto-forest text-right whitespace-nowrap">
                    {formatRupiah(t.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        t.status === "Berhasil"
                          ? "bg-emerald-100 text-emerald-800"
                          : t.status === "Menunggu Pembayaran"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(t)}
                      className="px-3 py-1.5 bg-zesto-mint hover:bg-zesto-lime text-zesto-forest rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      <span>Lihat Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL 1: BUAT TRANSAKSI BARU ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-zesto-gray-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-zesto-gray-100">
              <div>
                <h3 className="text-lg font-black text-zesto-forest">
                  Buat Transaksi Penjualan Baru
                </h3>
                <p className="text-xs text-zesto-gray-500 mt-0.5">
                  Input pesanan manual untuk pelanggan retail, kafe, atau beach club.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-zesto-mint text-zesto-forest hover:bg-zesto-gray-200 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 mt-4">
              {/* Nama Pelanggan / Venue */}
              <div>
                <label className="block text-xs font-bold text-zesto-forest mb-1">
                  Nama Pelanggan / Venue Mitra *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  placeholder="Contoh: Ku De Ta Seminyak / Bpk. Putu Wardana"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none focus:ring-2 focus:ring-zesto-forest/20"
                />
              </div>

              {/* Email & Telepon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zesto-forest mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="kontak@mitra.com"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zesto-forest mb-1">
                    No. WhatsApp / Telepon
                  </label>
                  <input
                    type="text"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+62 812-xxxx-xxxx"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none"
                  />
                </div>
              </div>

              {/* Alamat Pengiriman */}
              <div>
                <label className="block text-xs font-bold text-zesto-forest mb-1">
                  Alamat Pengiriman (Bali)
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Jl. Pantai Kuta No. 12, Badung, Bali"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-medium text-zesto-forest focus:outline-none"
                />
              </div>

              {/* Varian Produk & Jumlah */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zesto-forest mb-1">
                    Pilih Varian Rasa Zestó
                  </label>
                  <select
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-zesto-gray-200 bg-zesto-mint text-zesto-forest font-bold focus:outline-none"
                  >
                    <option value="Lime Splash (Original)">Lime Splash (Original Sparkling)</option>
                    <option value="Citrus Bloom (Grapefruit & Orange)">Citrus Bloom (Grapefruit &amp; Orange)</option>
                    <option value="Berry Breeze (Wild Strawberry)">Berry Breeze (Wild Strawberry)</option>
                    <option value="Mint Chill (Garden Mint)">Mint Chill (Garden Mint)</option>
                    <option value="4-Pack Variety Bundle">4-Pack Variety Bundle (Isi 4 Rasa)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zesto-forest mb-1">
                    Jumlah (Qty)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-zesto-gray-200 bg-zesto-mint-subtle font-bold text-zesto-forest focus:outline-none"
                  />
                </div>
              </div>

              {/* Harga Satuan & Total Kalkulasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zesto-mint-subtle p-3.5 rounded-xl border border-zesto-gray-200">
                <div>
                  <label className="block text-[11px] font-bold text-zesto-gray-600 mb-1">
                    Harga Satuan (Rp)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-zesto-gray-200 bg-white font-bold text-zesto-forest focus:outline-none"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <span className="text-[11px] font-bold text-zesto-gray-500">Total Nominal Pesanan:</span>
                  <span className="text-base font-black text-zesto-forest">
                    {formatRupiah((formData.quantity || 1) * (formData.unitPrice || 0))}
                  </span>
                </div>
              </div>

              {/* Metode Pembayaran & Status (DIPILIH OLEH ADMIN) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zesto-forest mb-1">
                    Metode Pembayaran (Pilihan Admin) *
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-zesto-gray-200 bg-white font-bold text-zesto-forest focus:outline-none"
                  >
                    {availableMethods.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zesto-forest mb-1">
                    Status Transaksi *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Berhasil" | "Menunggu Pembayaran" | "Dibatalkan",
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-zesto-gray-200 bg-white font-bold text-zesto-forest focus:outline-none"
                  >
                    <option value="Berhasil">Berhasil (Lunas)</option>
                    <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>
              </div>

              {/* Tombol Simpan */}
              <div className="pt-3 border-t border-zesto-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-zesto-gray-600 hover:bg-zesto-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-zesto-forest text-zesto-lime font-black text-xs rounded-xl hover:bg-zesto-forest-hover transition-colors shadow-elevated cursor-pointer"
                >
                  Simpan Transaksi Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: DETAIL INVOICE RESMI ================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zesto-gray-200 relative animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Action Bar Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-zesto-gray-100 print:hidden">
              <span className="text-xs font-black uppercase tracking-wider text-zesto-gray-400">
                Faktur Tagihan Resmi (Invoice Preview)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-zesto-forest text-zesto-lime rounded-lg text-xs font-bold hover:bg-zesto-forest-hover transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                  </svg>
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="w-8 h-8 rounded-full bg-zesto-mint text-zesto-forest hover:bg-zesto-gray-200 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet */}
            <div className="pt-6 space-y-6 text-xs text-zesto-gray-800">
              {/* Header Invoice: Logo & Info Faktur */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zesto-gray-200 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-zesto-forest flex items-center justify-center text-zesto-lime font-black text-sm">
                      Z
                    </div>
                    <span className="text-2xl font-black text-zesto-forest tracking-tight">
                      Zestó<span className="text-xs text-zesto-lime bg-zesto-forest px-1.5 py-0.5 rounded ml-1 font-bold">BALI</span>
                    </span>
                  </div>
                  <p className="font-semibold text-zesto-forest mt-2">PT Zesto Segar Alami Indonesia</p>
                  <p className="text-zesto-gray-500 text-[11px] mt-0.5">
                    Jl. Danau Tamblingan No. 88, Sanur, Denpasar Selatan, Bali 80228<br />
                    Email: finance@zestobali.com | WhatsApp: +62 812-3456-7890
                  </p>
                </div>

                <div className="sm:text-right">
                  <h3 className="text-xl font-black text-zesto-forest tracking-tight">FAKTUR INVOICE</h3>
                  <p className="font-mono font-bold text-zesto-gray-700 text-sm mt-1">
                    {selectedInvoice.invoiceNo}
                  </p>
                  <p className="text-zesto-gray-400 text-[11px]">ID Transaksi: {selectedInvoice.id}</p>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        selectedInvoice.status === "Berhasil"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : selectedInvoice.status === "Menunggu Pembayaran"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                      }`}
                    >
                      {selectedInvoice.status === "Berhasil" ? "✓ LUNAS (PAID)" : selectedInvoice.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Billed To / Ditagihkan Kepada */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zesto-mint-subtle p-4 rounded-2xl border border-zesto-gray-200">
                <div>
                  <p className="text-[10px] font-bold text-zesto-gray-400 uppercase tracking-wider">
                    Ditagihkan Kepada (Pelanggan / Venue):
                  </p>
                  <p className="text-sm font-black text-zesto-forest mt-1">
                    {selectedInvoice.customer}
                  </p>
                  <p className="text-zesto-gray-600 mt-0.5">{selectedInvoice.address}</p>
                  <p className="text-zesto-gray-500 mt-1">
                    WA: {selectedInvoice.customerPhone} | Email: {selectedInvoice.customerEmail}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[10px] font-bold text-zesto-gray-400 uppercase tracking-wider">
                    Tanggal Terbit &amp; Jatuh Tempo:
                  </p>
                  <p className="font-semibold text-zesto-forest mt-1">
                    Tanggal: {selectedInvoice.date}
                  </p>
                  <p className="text-zesto-gray-600">
                    Jatuh Tempo: {selectedInvoice.dueDate}
                  </p>
                  <p className="text-zesto-forest font-bold mt-2">
                    Metode Bayar: <span className="bg-white px-2 py-0.5 rounded border border-zesto-gray-200">{selectedInvoice.method}</span>
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zesto-gray-200 text-zesto-gray-500 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 font-bold">Rincian Minuman Zestó</th>
                      <th className="py-2.5 px-4 font-bold text-center">Jumlah (Qty)</th>
                      <th className="py-2.5 px-4 font-bold text-right">Harga Satuan (Rp)</th>
                      <th className="py-2.5 pl-4 font-bold text-right">Subtotal (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zesto-gray-100 font-medium">
                    {selectedInvoice.detailedItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 font-bold text-zesto-forest">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-center text-zesto-gray-600">
                          {item.qty} Kaleng/Bundle
                        </td>
                        <td className="py-3 px-4 text-right text-zesto-gray-600">
                          {formatRupiah(item.unitPrice)}
                        </td>
                        <td className="py-3 pl-4 text-right font-black text-zesto-forest">
                          {formatRupiah(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation Summary */}
              <div className="border-t border-zesto-gray-200 pt-4 flex flex-col sm:flex-row justify-between gap-4">
                <div className="text-zesto-gray-500 max-w-xs">
                  <p className="font-bold text-zesto-forest">Catatan Pengiriman:</p>
                  <p className="mt-1 text-[11px]">{selectedInvoice.notes || "Pengiriman dingin bertekanan CO2 terjaga."}</p>
                </div>

                <div className="space-y-1.5 sm:w-64 text-xs font-semibold">
                  <div className="flex justify-between text-zesto-gray-600">
                    <span>Subtotal Barang:</span>
                    <span>{formatRupiah(selectedInvoice.amount)}</span>
                  </div>
                  <div className="flex justify-between text-zesto-gray-600">
                    <span>PPN (11% Termasuk):</span>
                    <span className="text-emerald-700">Rp 0 (Termasuk)</span>
                  </div>
                  <div className="flex justify-between text-zesto-gray-600">
                    <span>Ekspedisi Cold-Chain Bali:</span>
                    <span className="text-emerald-700">GRATIS</span>
                  </div>
                  <div className="border-t border-zesto-gray-200 pt-2 flex justify-between text-sm font-black text-zesto-forest">
                    <span>TOTAL TAGIHAN:</span>
                    <span className="text-base text-zesto-forest">{formatRupiah(selectedInvoice.amount)}</span>
                  </div>
                </div>
              </div>

              {/* Digital Stamp & Thank You */}
              <div className="pt-6 border-t border-zesto-gray-100 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 text-zesto-gray-400 text-[11px]">
                <p>
                  Terima kasih atas kerja sama Anda dengan Zestó Bali.<br />
                  Faktur ini diterbitkan secara elektronik dan sah tanpa tanda tangan basah.
                </p>
                <div className="text-right">
                  <span className="font-script text-2xl text-zesto-lime bg-zesto-forest px-3 py-1 rounded-xl font-bold inline-block" style={{ transform: "rotate(-3deg)" }}>
                    Verified by Zestó
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
