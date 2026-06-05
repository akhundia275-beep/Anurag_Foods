import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { PromoGraphic } from "@/components/promo-graphic";
import { categoryMeta, featuredProducts, products } from "@/lib/products";
import { FoodIllustration } from "@/components/food-illustrations";
import type { ProductCategory } from "@/lib/products";
import { LinkButton } from "@/components/ui/button";
import { BadgePercent, Clock, Snowflake, Truck } from "lucide-react";

const offers = [
  ["Bulk Saver", "Rs 5,000 minimum", BadgePercent],
  ["Frozen Ready", "-18 deg C", Snowflake],
  ["Fast Dispatch", "B2B supply", Truck],
  ["45 Day Shelf Life", "Packed fresh", Clock]
];

export default function HomePage() {
  const popular = featuredProducts.length ? featuredProducts : products.slice(0, 6);

  return (
    <>
      <Hero />
      <PromoGraphic />
      <section className="container-pad py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-saffron">Order by category</p>
            <h2 className="mt-2 text-3xl font-black text-tealDeep">What&apos;s on your mind?</h2>
          </div>
          <LinkButton href="/products" variant="ghost" className="hidden sm:inline-flex">
            View all
          </LinkButton>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(categoryMeta).map(([name, meta]) => (
            <a key={name} href={`/products#${meta.slug}`} className="group rounded-[18px] bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full bg-[#fff4ea]">
                <div className="h-full w-full p-3 transition group-hover:scale-110">
                  <FoodIllustration category={name as ProductCategory} compact />
                </div>
              </div>
              <h3 className="mt-3 text-sm font-black text-tealDeep">{name}</h3>
            </a>
          ))}
        </div>
      </section>
      <section className="border-y border-[#e9e9eb] bg-white py-10">
        <div className="container-pad">
          <h2 className="text-3xl font-black text-tealDeep">Why order from us?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {offers.map(([title, copy, Icon]) => (
              <div key={title as string} className="rounded-[18px] border border-[#e9e9eb] bg-gradient-to-br from-white to-[#fff4ea] p-5">
                <Icon className="h-8 w-8 text-saffron" />
                <h3 className="mt-4 text-lg font-black text-tealDeep">{title as string}</h3>
                <p className="mt-1 text-sm font-semibold text-tealInk/60">{copy as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-pad py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-saffron">Top picks</p>
            <h2 className="mt-2 text-3xl font-black text-tealDeep">Popular near restaurants and homes</h2>
          </div>
          <LinkButton href="/bulk-orders" variant="orange" className="hidden sm:inline-flex">
            Bulk order
          </LinkButton>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
