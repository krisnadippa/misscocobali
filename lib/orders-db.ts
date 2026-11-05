import fs from "fs";
import path from "path";

export interface OrderItemRecord {
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
  size?: string;
}

export interface StoredOrder {
  id: string;
  invoiceNo: string;
  source: "website" | "whatsapp";
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address?: string;
  mapsUrl?: string;
  itemsSummary: string;
  detailedItems: OrderItemRecord[];
  totalAmount: number;
  status: "Menunggu Pembayaran" | "Berhasil" | "Diproses" | "Dibatalkan";
  paymentMethod: string;
  createdAt: string;
  // WhatsApp Metadata
  whatsappMessageId?: string;
  whatsappGroupId?: string;
  whatsappSenderPhone?: string;
  rawWhatsappMessage?: string;
  // Notification Dispatch Log
  notificationStatus?: "sent" | "failed" | "skipped";
  notificationError?: string;
  notificationSentAt?: string;
}

export interface WhatsAppNotificationLog {
  id: string;
  orderId: string;
  destination: string;
  isGroup: boolean;
  status: "success" | "failed" | "pending";
  response?: string;
  error?: string;
  timestamp: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const LOGS_FILE = path.join(DATA_DIR, "whatsapp-logs.json");

// Ensure data directory exists
function ensureStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      // Seed with initial realistic store orders if file doesn't exist
      const initialOrders: StoredOrder[] = [
        {
          id: "ORD-2024-8841",
          invoiceNo: "INV-ZST-241101",
          source: "website",
          customerName: "Potato Head Beach Club",
          customerPhone: "+62 811-399-445",
          customerEmail: "fnb@potatohead.co.id",
          address: "Jl. Petitenget No. 51B, Seminyak, Kuta Utara, Bali",
          itemsSummary: "60x Lime Splash, 40x Citrus Bloom",
          detailedItems: [
            { name: "Zestó Lime Splash (330ml Can)", qty: 60, unitPrice: 150000, total: 9000000 },
            { name: "Zestó Citrus Bloom (330ml Can)", qty: 40, unitPrice: 150000, total: 6000000 },
          ],
          totalAmount: 15000000,
          status: "Berhasil",
          paymentMethod: "BCA Virtual Account (Xendit)",
          createdAt: "04 Nov 2024, 18:30 WITA",
          notificationStatus: "sent",
          notificationSentAt: "04 Nov 2024, 18:30 WITA",
        },
        {
          id: "ORD-2024-8840",
          invoiceNo: "INV-ZST-241102",
          source: "website",
          customerName: "Finns Beach Club Canggu",
          customerPhone: "+62 812-388-990",
          customerEmail: "bar.procurement@finnsbeachclub.com",
          address: "Jl. Pantai Berawa No. 99, Canggu, Tibubeneng, Bali",
          itemsSummary: "120x Lime Splash (Krat Kayu Spesial)",
          detailedItems: [
            { name: "Zestó Lime Splash - Krat Kayu Eksklusif", qty: 120, unitPrice: 150000, total: 18000000 },
          ],
          totalAmount: 18000000,
          status: "Berhasil",
          paymentMethod: "Mandiri Virtual Account (Xendit)",
          createdAt: "04 Nov 2024, 17:15 WITA",
          notificationStatus: "sent",
          notificationSentAt: "04 Nov 2024, 17:15 WITA",
        },
      ];
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), "utf8");
    }
    if (!fs.existsSync(LOGS_FILE)) {
      fs.writeFileSync(LOGS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.error("Storage initialization error:", err);
  }
}

export function getAllOrders(): StoredOrder[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveOrder(order: StoredOrder): boolean {
  ensureStorage();
  try {
    const orders = getAllOrders();
    // Anti-duplication check: if order with same ID or same WhatsApp message ID exists, skip
    const existingIndex = orders.findIndex(
      (o) =>
        o.id === order.id ||
        (order.whatsappMessageId && o.whatsappMessageId === order.whatsappMessageId)
    );

    if (existingIndex >= 0) {
      orders[existingIndex] = { ...orders[existingIndex], ...order };
    } else {
      orders.unshift(order);
    }

    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to save order:", err);
    return false;
  }
}

export function updateOrderNotificationStatus(
  orderId: string,
  status: "sent" | "failed" | "skipped",
  error?: string
) {
  ensureStorage();
  try {
    const orders = getAllOrders();
    const found = orders.find((o) => o.id === orderId);
    if (found) {
      found.notificationStatus = status;
      found.notificationError = error;
      found.notificationSentAt = new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" });
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Error updating notification status:", err);
  }
}

export function saveWhatsAppLog(log: WhatsAppNotificationLog) {
  ensureStorage();
  try {
    const raw = fs.readFileSync(LOGS_FILE, "utf8");
    const logs: WhatsAppNotificationLog[] = JSON.parse(raw);
    logs.unshift(log);
    // Keep last 150 logs
    const trimmed = logs.slice(0, 150);
    fs.writeFileSync(LOGS_FILE, JSON.stringify(trimmed, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save WhatsApp log:", err);
  }
}

export function getWhatsAppLogs(): WhatsAppNotificationLog[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(LOGS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

