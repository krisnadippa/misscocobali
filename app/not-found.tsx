import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a3321] text-white p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/10 text-[#b5e800] flex items-center justify-center font-black text-2xl mb-4">
        404
      </div>
      <h1 className="text-3xl font-black mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-sm text-gray-300 max-w-md mb-6">
        Halaman yang Anda tuju mungkin telah dipindahkan atau tautan tidak valid.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#b5e800] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#a2d000] transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

