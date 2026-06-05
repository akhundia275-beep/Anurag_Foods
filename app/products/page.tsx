import type { Metadata } from "next";
import { BrandHero } from "@/components/brand-hero";
import { ProductExplorer } from "@/components/product-explorer";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Anurag Foods frozen momos, spring rolls, parathas, snacks, Kurkure momos and Manchurian."
};

export default function ProductsPage() {
  return (
    <section className="pb-14">
      <BrandHero />
      <ProductExplorer products={products} />
    </section>
  );
}
