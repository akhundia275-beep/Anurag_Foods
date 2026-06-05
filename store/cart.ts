"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const cleanQuantity = (quantity: number) => Math.max(1, Math.floor(Number.isFinite(quantity) ? quantity : 1));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const nextQuantity = cleanQuantity(quantity);
          const existing = state.items.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + nextQuantity } : item
              )
            };
          }
          return { items: [...state.items, { product, quantity: nextQuantity }] };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.product.id === productId ? { ...item, quantity: cleanQuantity(quantity) } : item))
            .filter((item) => item.quantity > 0)
        })),
      removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
      clear: () => set({ items: [] })
    }),
    { name: "anurag_foods_cart" }
  )
);

export const getCartTotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0);
