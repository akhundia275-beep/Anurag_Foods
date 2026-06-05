"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";

export function AddToCartPanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const hasHydrated = useCart((state) => state.hasHydrated);

  const handleAdd = () => {
    if (!hasHydrated) return;
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex flex-wrap items-center gap-3">
      <input
        min={1}
        value={quantity}
        onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
        type="number"
        className="h-12 w-28 rounded-lg border border-tealDeep/15 bg-white px-4 font-bold"
      />
      <motion.div animate={added ? { scale: [1, 1.05, 1] } : {}}>
        <Button onClick={handleAdd} variant={added ? "primary" : "orange"} disabled={!hasHydrated}>
          {!hasHydrated ? "Loading cart..." : added ? "Added to cart" : "Add to cart"}
        </Button>
      </motion.div>
    </motion.div>
  );
}
