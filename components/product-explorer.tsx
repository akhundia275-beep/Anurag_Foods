"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categoryMeta, type Product, type ProductCategory } from "@/lib/products";

type SortMode = "popular" | "low" | "high";

export function ProductExplorer({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [sort, setSort] = useState<SortMode>("popular");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products
      .filter((product) => category === "All" || product.category === category)
      .filter((product) => {
        if (!normalizedQuery) return true;
        return `${product.name} ${product.category} ${product.weight}`.toLowerCase().includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return Number(Boolean(b.badge)) - Number(Boolean(a.badge));
      });
  }, [category, products, query, sort]);

  const groupedProducts = Object.keys(categoryMeta).map((name) => ({
    name: name as ProductCategory,
    meta: categoryMeta[name as ProductCategory],
    items: visibleProducts.filter((product) => product.category === name)
  }));

  return (
    <>
      <div className="sticky top-20 z-30 border-b border-[#e9e9eb] bg-white/95 py-4 backdrop-blur">
        <div className="container-pad grid gap-4">
          <label className="flex h-12 items-center gap-3 rounded-md bg-[#f5f5f6] px-4 text-sm text-tealInk/60">
            <Search className="h-5 w-5" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Search momos, rolls, parathas..." />
          </label>
          <div className="flex gap-3 overflow-x-auto">
            <button
              onClick={() => setCategory("All")}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black ${category === "All" ? "border-saffron bg-saffron text-white" : "border-[#e9e9eb] bg-white text-tealDeep"}`}
            >
              All
            </button>
            {Object.entries(categoryMeta).map(([name]) => (
              <button
                key={name}
                onClick={() => setCategory(name as ProductCategory)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black ${category === name ? "border-saffron bg-saffron text-white" : "border-[#e9e9eb] bg-white text-tealDeep"}`}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-tealInk/60">
            <span>{visibleProducts.length} products found</span>
            <label className="flex items-center gap-2 rounded-md bg-[#f5f5f6] px-3 py-2">
              <SlidersHorizontal className="h-4 w-4" />
              <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="bg-transparent font-black text-tealDeep outline-none">
                <option value="popular">Popular</option>
                <option value="low">Price low to high</option>
                <option value="high">Price high to low</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="container-pad pt-8">
        <AnimatePresence mode="popLayout">
          {visibleProducts.length ? (
            <motion.div layout className="grid gap-8">
              {groupedProducts
                .filter((group) => group.items.length)
                .map((group) => (
                  <motion.div key={group.name} id={group.meta.slug} layout className="scroll-mt-64 py-3">
                    <div className="mb-5 flex items-baseline justify-between gap-4">
                      <h2 className="text-2xl font-black text-tealDeep">{group.name}</h2>
                      <span className="text-sm font-bold text-tealInk/45">{group.items.length} items</span>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {group.items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-[22px] bg-white p-10 text-center shadow-sm">
              <h2 className="text-3xl font-black text-tealDeep">No products found</h2>
              <p className="mt-2 text-tealInk/60">Try another search or category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
