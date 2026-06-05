"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import { ProductImage } from "@/components/product-image";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      className="product-card overflow-hidden rounded-[18px] border border-[#f0f0f2] bg-white shadow-sm transition hover:shadow-soft"
    >
      <Link href={`/products/${product.slug}`} className="product-card-link block p-3 pb-0">
        <div className="product-card-media relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#fff4ea]">
          <motion.div className="product-card-art relative h-full w-full p-0" whileHover={{ scale: 1.03 }}>
            <ProductImage product={product} />
          </motion.div>
          {product.badge ? <span className="product-card-badge absolute left-3 top-3 rounded-md bg-tealDeep px-2.5 py-1 text-xs font-black text-white">{product.badge}</span> : null}
        </div>
      </Link>
      <div className="product-card-body grid gap-3 p-4">
        <div>
          <div className="product-card-top flex items-start justify-between gap-3">
            <h3 className="product-card-title text-lg font-black text-tealDeep">{product.name}</h3>
            <span className="product-card-rating inline-flex shrink-0 items-center gap-1 rounded-md bg-leaf px-2 py-1 text-xs font-black text-white">
              <Star className="h-3 w-3 fill-white" />
              4.4
            </span>
          </div>
          <p className="product-card-meta mt-1 text-sm text-tealInk/60">
            {product.category} | {product.weight}
          </p>
          <p className="product-card-note mt-1 text-xs font-semibold text-tealInk/45">Min cart Rs 5,000 | Free delivery above Rs 10,000</p>
        </div>
        <div className="product-card-footer flex items-center justify-between gap-4">
          <p className="product-card-price text-base font-black text-tealDeep">{formatPrice(product)}</p>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.88 }}
            animate={added ? { scale: [1, 1.08, 1], backgroundColor: "#2f8f3a", color: "#ffffff", borderColor: "#2f8f3a" } : {}}
            className="product-card-add rounded-md border border-saffron bg-white px-5 py-2 text-sm font-black text-saffron shadow-sm transition hover:bg-saffron hover:text-white"
          >
            {added ? "ADDED" : "ADD"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
