import { neon } from "@neondatabase/serverless";
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

// -------------------------------------------------------------
// NEON POSTGRES CLIENT & SCHEMA INIT
// -------------------------------------------------------------
function getSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  return neon(connectionString);
}

let isNeonInitialized = false;

export async function initNeonDb() {
  if (isNeonInitialized) return;
  const sql = getSql();
  if (!sql) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(64) PRIMARY KEY,
        invoice_no VARCHAR(64) NOT NULL,
        source VARCHAR(32) NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(64) NOT NULL,
        customer_email VARCHAR(255),
        address TEXT,
        maps_url TEXT,
        items_summary TEXT NOT NULL,
        detailed_items JSONB,
        total_amount NUMERIC NOT NULL,
        status VARCHAR(64) NOT NULL,
        payment_method VARCHAR(128) NOT NULL,
        created_at VARCHAR(64) NOT NULL,
        whatsapp_message_id VARCHAR(128),
        whatsapp_group_id VARCHAR(128),
        whatsapp_sender_phone VARCHAR(64),
        raw_whatsapp_message TEXT,
        notification_status VARCHAR(32),
        notification_error TEXT,
        notification_sent_at VARCHAR(64),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS whatsapp_logs (
        id VARCHAR(64) PRIMARY KEY,
        order_id VARCHAR(64),
        destination VARCHAR(128) NOT NULL,
        is_group BOOLEAN NOT NULL DEFAULT FALSE,
        status VARCHAR(32) NOT NULL,
        response TEXT,
        error TEXT,
        timestamp VARCHAR(64) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    isNeonInitialized = true;
    console.log("✅ [Neon Postgres] Tables initialized successfully.");
  } catch (err) {
    console.warn("⚠️ [Neon Postgres Init Warning]:", err);
  }
}

// -------------------------------------------------------------
// LOCAL FALLBACK STORAGE
// -------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const LOGS_FILE = path.join(DATA_DIR, "whatsapp-logs.json");

function ensureLocalStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
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
      ];
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), "utf8");
    }
    if (!fs.existsSync(LOGS_FILE)) {
      fs.writeFileSync(LOGS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.error("Local storage initialization error:", err);
  }
}

// -------------------------------------------------------------
// READ ALL ORDERS (NEON POSTGRES WITH FALLBACK)
// -------------------------------------------------------------
export async function getAllOrdersAsync(): Promise<StoredOrder[]> {
  const sql = getSql();
  if (sql) {
    try {
      await initNeonDb();
      const rows = await sql`
        SELECT * FROM orders 
        ORDER BY updated_at DESC, id DESC
      `;

      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          invoiceNo: r.invoice_no,
          source: r.source as "website" | "whatsapp",
          customerName: r.customer_name,
          customerPhone: r.customer_phone,
          customerEmail: r.customer_email || undefined,
          address: r.address || undefined,
          mapsUrl: r.maps_url || undefined,
          itemsSummary: r.items_summary,
          detailedItems: (r.detailed_items as OrderItemRecord[]) || [],
          totalAmount: Number(r.total_amount),
          status: r.status as StoredOrder["status"],
          paymentMethod: r.payment_method,
          createdAt: r.created_at,
          whatsappMessageId: r.whatsapp_message_id || undefined,
          whatsappGroupId: r.whatsapp_group_id || undefined,
          whatsappSenderPhone: r.whatsapp_sender_phone || undefined,
          rawWhatsappMessage: r.raw_whatsapp_message || undefined,
          notificationStatus: r.notification_status || undefined,
          notificationError: r.notification_error || undefined,
          notificationSentAt: r.notification_sent_at || undefined,
        }));
      }
    } catch (err) {
      console.warn("⚠️ [Neon Postgres] Error fetching orders, falling back to local storage:", err);
    }
  }

  // Fallback to local file
  ensureLocalStorage();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Synchronous version for backwards compatibility
export function getAllOrders(): StoredOrder[] {
  ensureLocalStorage();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// -------------------------------------------------------------
// SAVE ORDER (NEON POSTGRES + LOCAL SYNC)
// -------------------------------------------------------------
export async function saveOrderAsync(order: StoredOrder): Promise<boolean> {
  const sql = getSql();
  let neonSuccess = false;

  if (sql) {
    try {
      await initNeonDb();
      await sql`
        INSERT INTO orders (
          id, invoice_no, source, customer_name, customer_phone, customer_email,
          address, maps_url, items_summary, detailed_items, total_amount, status,
          payment_method, created_at, whatsapp_message_id, whatsapp_group_id,
          whatsapp_sender_phone, raw_whatsapp_message, notification_status,
          notification_error, notification_sent_at, updated_at
        ) VALUES (
          ${order.id}, ${order.invoiceNo}, ${order.source}, ${order.customerName},
          ${order.customerPhone}, ${order.customerEmail || null}, ${order.address || null},
          ${order.mapsUrl || null}, ${order.itemsSummary},
          ${JSON.stringify(order.detailedItems || [])}, ${order.totalAmount},
          ${order.status}, ${order.paymentMethod}, ${order.createdAt},
          ${order.whatsappMessageId || null}, ${order.whatsappGroupId || null},
          ${order.whatsappSenderPhone || null}, ${order.rawWhatsappMessage || null},
          ${order.notificationStatus || null}, ${order.notificationError || null},
          ${order.notificationSentAt || null}, CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO UPDATE SET
          invoice_no = EXCLUDED.invoice_no,
          source = EXCLUDED.source,
          customer_name = EXCLUDED.customer_name,
          customer_phone = EXCLUDED.customer_phone,
          customer_email = EXCLUDED.customer_email,
          address = EXCLUDED.address,
          maps_url = EXCLUDED.maps_url,
          items_summary = EXCLUDED.items_summary,
          detailed_items = EXCLUDED.detailed_items,
          total_amount = EXCLUDED.total_amount,
          status = EXCLUDED.status,
          payment_method = EXCLUDED.payment_method,
          notification_status = EXCLUDED.notification_status,
          notification_error = EXCLUDED.notification_error,
          notification_sent_at = EXCLUDED.notification_sent_at,
          updated_at = CURRENT_TIMESTAMP;
      `;
      neonSuccess = true;
    } catch (err) {
      console.warn("⚠️ [Neon Postgres] Error saving order:", err);
    }
  }

  // Also save to local file for dual persistence
  saveOrder(order);
  return neonSuccess || true;
}

export function saveOrder(order: StoredOrder): boolean {
  ensureLocalStorage();
  try {
    const orders = getAllOrders();
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
    console.error("Failed to save order locally:", err);
    return false;
  }
}

// -------------------------------------------------------------
// UPDATE NOTIFICATION STATUS
// -------------------------------------------------------------
export async function updateOrderNotificationStatusAsync(
  orderId: string,
  status: "sent" | "failed" | "skipped",
  error?: string
) {
  const sql = getSql();
  const sentAt = new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" });

  if (sql) {
    try {
      await initNeonDb();
      await sql`
        UPDATE orders 
        SET notification_status = ${status},
            notification_error = ${error || null},
            notification_sent_at = ${sentAt},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${orderId};
      `;
    } catch (err) {
      console.warn("⚠️ [Neon Postgres] Error updating notification status:", err);
    }
  }

  updateOrderNotificationStatus(orderId, status, error);
}

export function updateOrderNotificationStatus(
  orderId: string,
  status: "sent" | "failed" | "skipped",
  error?: string
) {
  ensureLocalStorage();
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
    console.error("Failed to update notification status locally:", err);
  }
}

// -------------------------------------------------------------
// WHATSAPP LOGS (NEON + LOCAL)
// -------------------------------------------------------------
export async function saveWhatsAppLogAsync(log: WhatsAppNotificationLog) {
  const sql = getSql();
  if (sql) {
    try {
      await initNeonDb();
      await sql`
        INSERT INTO whatsapp_logs (
          id, order_id, destination, is_group, status, response, error, timestamp
        ) VALUES (
          ${log.id}, ${log.orderId || null}, ${log.destination}, ${log.isGroup},
          ${log.status}, ${log.response || null}, ${log.error || null}, ${log.timestamp}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (err) {
      console.warn("⚠️ [Neon Postgres] Error saving log:", err);
    }
  }

  saveWhatsAppLog(log);
}

export function saveWhatsAppLog(log: WhatsAppNotificationLog): boolean {
  ensureLocalStorage();
  try {
    const raw = fs.readFileSync(LOGS_FILE, "utf8");
    const logs: WhatsAppNotificationLog[] = JSON.parse(raw);
    logs.unshift(log);
    const trimmed = logs.slice(0, 100);
    fs.writeFileSync(LOGS_FILE, JSON.stringify(trimmed, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to save log locally:", err);
    return false;
  }
}

export async function getWhatsAppLogsAsync(): Promise<WhatsAppNotificationLog[]> {
  const sql = getSql();
  if (sql) {
    try {
      await initNeonDb();
      const rows = await sql`
        SELECT * FROM whatsapp_logs 
        ORDER BY created_at DESC 
        LIMIT 100
      `;
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          orderId: r.order_id,
          destination: r.destination,
          isGroup: r.is_group,
          status: r.status,
          response: r.response,
          error: r.error,
          timestamp: r.timestamp,
        }));
      }
    } catch (err) {
      console.warn("⚠️ [Neon Postgres] Error getting logs:", err);
    }
  }

  return getWhatsAppLogs();
}

export function getWhatsAppLogs(): WhatsAppNotificationLog[] {
  ensureLocalStorage();
  try {
    const raw = fs.readFileSync(LOGS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
