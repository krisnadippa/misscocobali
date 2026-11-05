export interface ParsedWhatsAppOrder {
  isValid: boolean;
  customerName?: string;
  customerPhone?: string;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  totalAmount?: number;
  size?: string;
  missingFields: string[];
  rawText: string;
}

/**
 * Parser teks terstruktur command /order dari WhatsApp Group
 *
 * Contoh format pesan yang didukung:
 * /order
 * Nama: Krisna
 * No HP: 081234567890
 * Produk: Sepatu Nike
 * Ukuran: 42
 * Jumlah: 2
 * Harga: 850000
 */
export function parseWhatsAppOrderMessage(rawText: string): ParsedWhatsAppOrder {
  const result: ParsedWhatsAppOrder = {
    isValid: false,
    missingFields: [],
    rawText,
  };

  if (!rawText) return result;

  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);

  // Periksa apakah pesan diawali perintah /order (case-insensitive)
  const isOrderCommand = lines.some((line) => line.toLowerCase().startsWith("/order"));
  if (!isOrderCommand) {
    return result; // Bukan format pesanan, abaikan
  }

  // Helper untuk membaca nilai key: value
  const extractField = (keys: string[]): string | undefined => {
    for (const line of lines) {
      for (const k of keys) {
        // Regex kecocokan "Key: Value" atau "*Key:* Value"
        const regex = new RegExp(`^\\*?${k}\\*?\\s*[:=]\\s*(.+)`, "i");
        const match = line.match(regex);
        if (match && match[1]) {
          return match[1].trim().replace(/^\*|\*$/g, ""); // buang asterisk tebal
        }
      }
    }
    return undefined;
  };

  const rawName = extractField(["nama", "nama customer", "nama pembeli", "name"]);
  const rawPhone = extractField(["no hp", "nomor hp", "hp", "no wa", "telepon", "phone"]);
  const rawProduct = extractField(["produk", "nama produk", "barang", "item", "product"]);
  const rawSize = extractField(["ukuran", "size", "varian"]);
  const rawQty = extractField(["jumlah", "qty", "kuantitas", "total item", "banyak"]);
  const rawPrice = extractField(["harga", "harga satuan", "price", "total", "nominal"]);

  // Validasi field wajib
  if (!rawName) result.missingFields.push("Nama customer");
  if (!rawProduct) result.missingFields.push("Produk");
  if (!rawQty) result.missingFields.push("Jumlah");
  if (!rawPrice) result.missingFields.push("Harga");

  // Parse angka jumlah
  let parsedQty = 1;
  if (rawQty) {
    const cleanQty = parseInt(rawQty.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(cleanQty) && cleanQty > 0) {
      parsedQty = cleanQty;
    } else {
      result.missingFields.push("Jumlah (harus angka positif)");
    }
  }

  // Parse harga (cth: "850.000", "Rp 850000", "850000")
  let parsedPrice = 0;
  if (rawPrice) {
    const cleanPrice = parseInt(rawPrice.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(cleanPrice) && cleanPrice > 0) {
      parsedPrice = cleanPrice;
    } else {
      result.missingFields.push("Harga (harus angka valid)");
    }
  }

  if (result.missingFields.length === 0 && rawName && rawProduct) {
    result.isValid = true;
    result.customerName = rawName;
    result.customerPhone = rawPhone || "-";
    result.productName = rawProduct;
    result.size = rawSize;
    result.quantity = parsedQty;
    result.unitPrice = parsedPrice;
    result.totalAmount = parsedPrice * parsedQty;
  }

  return result;
}

/**
 * Format balasan bot WhatsApp jika data /order tidak lengkap
 */
export function buildMissingFieldsReply(missingFields: string[]): string {
  return `⚠️ *DATA PESANAN BELUM LENGKAP*

Mohon lengkapi informasi berikut:
${missingFields.map((f) => `• ${f}`).join("\n")}

*Contoh Format Pesanan:*
/order
Nama: Krisna
No HP: 081234567890
Produk: Zestó Lime Rush 330ml
Jumlah: 2
Harga: 28000`;
}

/**
 * Format balasan bot WhatsApp jika pesanan berhasil dicatat ke Dashboard
 */
export function buildOrderSuccessReply(
  orderId: string,
  customerName: string,
  productName: string,
  qty: number,
  totalAmount: number
): string {
  return `✅ *PESANAN BERHASIL DICATAT!*

*ID Pesanan:* ${orderId}
*Nama:* ${customerName}
*Produk:* ${productName}
*Jumlah:* ${qty} pcs
*Total:* Rp ${totalAmount.toLocaleString("id-ID")}

Pesanan telah otomatis masuk ke dashboard website Zestó Bali.`;
}

