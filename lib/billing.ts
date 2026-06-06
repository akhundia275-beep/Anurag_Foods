import type { CartItem } from "@/store/cart";

export const minimumOrderValue = 5000;
export const freeDeliveryMinimum = 10000;
export const freeDeliveryMaxDistanceKm = 14;
export const deliveryOrigin = "Mayur Vihar Phase 2, Delhi";
export const gstRate = 0.05;
export const gstLabel = "GST 5%";
export const deliveryCharge = 200;

type BillOptions = {
  deliveryDistanceKm?: number | null;
};

export type BillTotals = {
  subtotal: number;
  gst: number;
  delivery: number;
  grandTotal: number;
  remainingMinimumValue: number;
};

export const getBillSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0);

export const getBillTotals = (items: CartItem[], options: BillOptions = {}): BillTotals => {
  const subtotal = getBillSubtotal(items);
  const gst = Math.round(subtotal * gstRate * 100) / 100;
  const deliveryDistanceKm = Number.isFinite(options.deliveryDistanceKm ?? NaN) ? Number(options.deliveryDistanceKm) : null;
  const isFreeDelivery =
    items.length > 0 &&
    subtotal >= freeDeliveryMinimum &&
    deliveryDistanceKm !== null &&
    deliveryDistanceKm <= freeDeliveryMaxDistanceKm;
  const delivery = items.length > 0 && !isFreeDelivery ? deliveryCharge : 0;

  return {
    subtotal,
    gst,
    delivery,
    grandTotal: subtotal + gst + delivery,
    remainingMinimumValue: Math.max(0, minimumOrderValue - subtotal)
  };
};

export const formatRupees = (value: number) =>
  `Rs ${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
