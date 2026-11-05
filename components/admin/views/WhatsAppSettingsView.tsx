"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Send,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Copy,
  ShieldCheck,
  Smartphone,
  Users,
  History,
} from "lucide-react";

interface WablasSettingsData {
  serverUrl: string;
  maskedToken: string;
  groupId: string;
  webhookUrl: string;
  deviceStatus: {
    connected: boolean;
    phone?: string;
    quota?: string | number;
    package?: string;
    error?: string;
  };
  recentLogs: Array<{
    id: string;
    orderId: string;
    destination: string;
    isGroup: boolean;
    status: "success" | "failed" | "pending";
    response?: string;
    error?: string;
    timestamp: string;
  }>;
}

export default function WhatsAppSettingsView() {
  const [data, setData] = useState<WablasSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Form custom test
  const [testTarget, setTestTarget] = useState("");
  const [testMessage, setTestMessage] = useState("");

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/whatsapp/settings");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Gagal mengambil status Wablas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/whatsapp/settings")
      .then((res) => res.json())
      .then((json) => {
        if (!ignore && json.success) {
          setData(json.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error("Gagal mengambil status Wablas:", err);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleCopyWebhook = () => {
    if (data?.webhookUrl) {
      navigator.clipboard.writeText(data.webhookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendTestToGroup = async () => {
    setSendingTest(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/whatsapp/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test_group",
          target: testTarget || undefined,
          message: testMessage || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setTestResult({
          success: true,
          message: "✓ Pesan percobaan berhasil dikirim ke grup WhatsApp!",
        });
        fetchStatus();
      } else {
        setTestResult({
          success: false,
          message: `✕ Gagal: ${json.error || "Cek koneksi dan API Token Wablas Anda"}`,
        });
      }
    } catch {
      setTestResult({
        success: false,
        message: "✕ Terjadi kendala saat menghubungi server.",
      });
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zesto-gray-200">
        <div>
          <h2 className="text-xl font-black text-zesto-forest uppercase tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            Integrasi Otomatisasi WhatsApp (Wablas API)
          </h2>
          <p className="text-xs text-zesto-gray-500 mt-1">
            Kelola pengiriman otomatis notifikasi pesanan ke WhatsApp Group &amp; penerimaan pesanan manual via webhook.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchStatus}
          disabled={loading}
          className="self-start sm:self-auto px-4 py-2 bg-white border border-zesto-gray-200 hover:bg-zesto-mint rounded-xl text-xs font-bold text-zesto-forest flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Segarkan Status</span>
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Device Connection Status */}
        <div className="bg-white rounded-2xl p-5 border border-zesto-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zesto-gray-400 uppercase tracking-wider">
              Status Device Wablas
            </span>
            <Smartphone className="w-4 h-4 text-zesto-forest" />
          </div>

          <div className="flex items-center gap-2.5">
            {data?.deviceStatus?.connected ? (
              <>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-black text-sm text-emerald-700">TERHUBUNG (ONLINE)</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-black text-sm text-amber-700">
                  {data?.maskedToken ? "BELUM TERHUBUNG / STANDBY" : "TOKEN BELUM DIISI"}
                </span>
              </>
            )}
          </div>

          <div className="text-[11px] text-zesto-gray-500 pt-1 border-t border-slate-100 space-y-1">
            <p>Nomor HP: <span className="font-semibold text-slate-800">{data?.deviceStatus?.phone || "-"}</span></p>
            <p>Paket Akun: <span className="font-bold text-emerald-700">{data?.deviceStatus?.package || "Free Trial 15 Hari"}</span></p>
          </div>
        </div>

        {/* Card 2: Group ID Destination */}
        <div className="bg-white rounded-2xl p-5 border border-zesto-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zesto-gray-400 uppercase tracking-wider">
              WhatsApp Group Tujuan
            </span>
            <Users className="w-4 h-4 text-zesto-forest" />
          </div>

          <div>
            <p className="font-mono text-xs font-black text-slate-800 truncate">
              {data?.groupId || "Belum Dikonfigurasi"}
            </p>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Target penerima notifikasi pesanan otomatis
            </span>
          </div>

          <div className="text-[11px] text-zesto-gray-500 pt-1 border-t border-slate-100 flex items-center justify-between">
            <span>Otomatisasi Group:</span>
            <span className={`font-bold ${data?.groupId ? "text-emerald-700" : "text-rose-600"}`}>
              {data?.groupId ? "✓ Aktif" : "Perlu Diisi"}
            </span>
          </div>
        </div>

        {/* Card 3: Webhook Receiver Status */}
        <div className="bg-white rounded-2xl p-5 border border-zesto-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zesto-gray-400 uppercase tracking-wider">
              Incoming Webhook (Group → Web)
            </span>
            <ShieldCheck className="w-4 h-4 text-zesto-forest" />
          </div>

          <div>
            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
              ✓ Siap Menerima /order
            </span>
            <p className="text-[10px] text-slate-400 mt-1">
              Parsing teks otomatis dua arah
            </p>
          </div>

          <div className="text-[11px] text-zesto-gray-500 pt-1 border-t border-slate-100 flex items-center justify-between">
            <span>Metode:</span>
            <span className="font-mono font-bold text-slate-700">POST /api/webhooks/wablas</span>
          </div>
        </div>
      </div>

      {/* Configuration Details Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zesto-gray-200 shadow-sm space-y-5">
        <h3 className="font-condensed font-black text-lg text-zesto-forest uppercase tracking-tight">
          PENGATURAN KONEKSI WABLAS &amp; WEBHOOK
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Server URL */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Domain Server Wablas</label>
            <input
              type="text"
              readOnly
              value={data?.serverUrl || "https://solo.wablas.com"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-700"
            />
            <p className="text-[10px] text-slate-400 mt-1">Sesuai domain server akun Wablas Anda.</p>
          </div>

          {/* Masked API Token */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">API Token (Tersimpan Aman)</label>
            <input
              type="text"
              readOnly
              value={data?.maskedToken || "Belum diisi di .env.local"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-700"
            />
            <p className="text-[10px] text-slate-400 mt-1">Token dirahasiakan untuk keamanan.</p>
          </div>

          {/* Target Group ID */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target WhatsApp Group ID</label>
            <input
              type="text"
              readOnly
              value={data?.groupId || "Belum diisi di WABLAS_GROUP_ID"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-700"
            />
            <p className="text-[10px] text-slate-400 mt-1">Format ID Grup: <code>xxxxxxxx-xxxxxxxx@g.us</code>.</p>
          </div>

          {/* Webhook URL Endpoint */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Webhook Masuk (Copy ke Dashboard Wablas)</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={data?.webhookUrl || "http://localhost:3000/api/webhooks/wablas"}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-700 text-xs"
              />
              <button
                type="button"
                onClick={handleCopyWebhook}
                className="px-3 py-2 bg-zesto-forest hover:bg-black text-[#C7F800] rounded-xl font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="Salin URL Webhook"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? "Disalin!" : "Salin"}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Masukkan URL ini di menu <strong>Dashboard Wablas → Webhook</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Test Message Dispatch Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zesto-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Send className="w-5 h-5 text-emerald-600" />
          <h3 className="font-condensed font-black text-lg text-zesto-forest uppercase tracking-tight">
            UJI COBA PENGIRIMAN PESAN WHATSAPP
          </h3>
        </div>

        <p className="text-xs text-slate-500">
          Gunakan tombol di bawah untuk menguji apakah Wablas berhasil mengirim pesan ke WhatsApp Group pesanan Anda.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Group ID Tujuan (Opsional, default dari .env):</label>
            <input
              type="text"
              placeholder={data?.groupId || "Contoh: 12036300123456789@g.us"}
              value={testTarget}
              onChange={(e) => setTestTarget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Pesan Uji Coba (Opsional):</label>
            <input
              type="text"
              placeholder="Pesan percobaan otomatis..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
            />
          </div>
        </div>

        {testResult && (
          <div
            className={`p-3.5 rounded-xl text-xs font-bold ${
              testResult.success
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {testResult.message}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSendTestToGroup}
            disabled={sendingTest}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{sendingTest ? "Mengirim..." : "Kirim Pesan Percobaan ke Grup"}</span>
          </button>
        </div>
      </div>

      {/* Notification Logs History Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zesto-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-zesto-forest" />
            <h3 className="font-condensed font-black text-lg text-zesto-forest uppercase tracking-tight">
              RIWAYAT NOTIFIKASI &amp; PESAN MASUK
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            {data?.recentLogs?.length || 0} Aktivitas Terbaru
          </span>
        </div>

        {(!data?.recentLogs || data.recentLogs.length === 0) ? (
          <p className="text-xs text-slate-400 text-center py-6">
            Belum ada log aktivitas WhatsApp. Log akan tercatat saat ada pesanan baru website atau chat /order dari grup.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Waktu</th>
                  <th className="py-2.5 px-3">ID Pesanan</th>
                  <th className="py-2.5 px-3">Tujuan / Sumber</th>
                  <th className="py-2.5 px-3">Tipe</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {data.recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {log.orderId}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600 max-w-[180px] truncate">
                      {log.destination}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {log.isGroup ? "Group WA" : "Personal"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {log.status === "success" ? (
                        <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Berhasil
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold text-[11px] flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Gagal
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px] max-w-xs truncate">
                      {log.error || log.response || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
