import type { CartItem } from "@/store/cart";
import { deliveryOrigin, formatRupees, getBillTotals, gstLabel, type BillTotals } from "@/lib/billing";
import { formatPrice } from "@/lib/products";

export type CustomerDetails = {
  name: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  deliveryDistanceKm: string;
  utr: string;
};

export type LocalOrder = {
  orderId: string;
  customer: CustomerDetails;
  items: CartItem[];
  bill: BillTotals;
  status: "PENDING_VERIFICATION";
  whatsappUrl: string;
  createdAt: string;
};

export const whatsappNumber = "917011707760";
export const upiId = "9015162345@iob";
export const upiPayeeName = "SAH CONTRACTOR";

export function buildUpiUrl(total: number) {
  const params = new URLSearchParams({
    pa: upiId,
    pn: upiPayeeName,
    am: total.toString(),
    cu: "INR"
  });

  return `upi://pay?${params.toString()}`;
}

export function createOrderId() {
  return `AF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function buildWhatsAppMessage(orderId: string, customer: CustomerDetails, items: CartItem[]) {
  const deliveryDistanceKm = customer.deliveryDistanceKm ? Number(customer.deliveryDistanceKm) : null;
  const bill = getBillTotals(items, { deliveryDistanceKm });
  const distanceLabel = deliveryDistanceKm === null ? "Not verified from pincode" : `${customer.deliveryDistanceKm} km`;
  const lines = [
    `New Anurag Foods Order`,
    `Order ID: ${orderId}`,
    `Customer: ${customer.name}`,
    `Mobile: ${customer.mobile}`,
    `Address: ${customer.address}, ${customer.city} - ${customer.pincode}`,
    `Distance from ${deliveryOrigin}: ${distanceLabel}`,
    `Products:`,
    ...items.map((item) => `- ${item.product.name} (${item.product.weight}) x ${item.quantity} = Rs ${item.quantity * item.product.price}`),
    `Subtotal: ${formatRupees(bill.subtotal)}`,
    `${gstLabel}: ${formatRupees(bill.gst)}`,
    `Delivery: ${bill.delivery === 0 ? "Free" : formatRupees(bill.delivery)}`,
    `Bill Total: ${formatRupees(bill.grandTotal)}`,
    `UTR: ${customer.utr}`,
    `Payment status: Pending Verification`
  ];

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function saveLocalOrder(order: LocalOrder) {
  if (typeof window === "undefined") return;

  const key = "anurag_foods_orders";
  const existing = window.localStorage.getItem(key);
  const orders = existing ? (JSON.parse(existing) as LocalOrder[]) : [];
  window.localStorage.setItem(key, JSON.stringify([order, ...orders]));
}

export function buildInvoiceHtml(order: LocalOrder) {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.product.name}<br><small>${item.product.weight}</small></td>
          <td>${item.quantity}</td>
          <td>${formatPrice(item.product)}</td>
          <td>${formatRupees(item.product.price * item.quantity)}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${order.orderId} - Anurag Foods Bill</title>
  <style>
    body{font-family:Arial,sans-serif;margin:0;background:#f8f8f8;color:#282c3f}
    .bill{max-width:820px;margin:32px auto;background:white;padding:32px;border-radius:18px}
    h1{margin:0;font-size:32px} .muted{color:#667085}
    table{width:100%;border-collapse:collapse;margin-top:24px}
    th,td{border-bottom:1px solid #eee;padding:12px;text-align:left}
    th{font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#667085}
    .totals{margin-left:auto;margin-top:24px;max-width:320px}
    .line{display:flex;justify-content:space-between;padding:8px 0}
    .grand{font-size:22px;font-weight:900;border-top:2px solid #282c3f;margin-top:8px;padding-top:14px}
  </style>
</head>
<body>
  <main class="bill">
    <h1>Anurag Foods Bill</h1>
    <p class="muted">Order ID: ${order.orderId}</p>
    <p><strong>Customer:</strong> ${order.customer.name}<br>
    <strong>Mobile:</strong> ${order.customer.mobile}<br>
    <strong>Address:</strong> ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}<br>
    <strong>Distance from ${deliveryOrigin}:</strong> ${order.customer.deliveryDistanceKm || "Not verified from pincode"}${order.customer.deliveryDistanceKm ? " km" : ""}<br>
    <strong>UTR:</strong> ${order.customer.utr}</p>
    <table>
      <thead><tr><th>Product</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <section class="totals">
      <div class="line"><span>Subtotal</span><strong>${formatRupees(order.bill.subtotal)}</strong></div>
      <div class="line"><span>${gstLabel}</span><strong>${formatRupees(order.bill.gst)}</strong></div>
      <div class="line"><span>Delivery</span><strong>${order.bill.delivery === 0 ? "Free" : formatRupees(order.bill.delivery)}</strong></div>
      <div class="line grand"><span>Bill Total</span><span>${formatRupees(order.bill.grandTotal)}</span></div>
    </section>
  </main>
</body>
</html>`;
}

export function orderSummary(items: CartItem[]) {
  return items.map((item) => `${item.product.name} ${item.product.weight} - ${item.quantity} x ${formatPrice(item.product)}`);
}
