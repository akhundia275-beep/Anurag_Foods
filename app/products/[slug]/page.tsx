import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/add-to-cart-panel";
import { ProductImage } from "@/components/product-image";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} ${product.weight} from Anurag Foods at ${formatPrice(product)}.`
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: "Anurag Foods",
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR"
    }
  };

  return (
    <section className="container-pad grid gap-10 py-14 lg:grid-cols-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-white shadow-soft">
        <ProductImage product={product} priority />
      </div>
      <div className="self-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron">{product.category}</p>
        <h1 className="mt-3 text-4xl font-black text-tealInk md:text-6xl">{product.name}</h1>
        <p className="mt-4 text-xl text-tealInk/70">{product.weight}</p>
        <p className="mt-5 text-3xl font-black text-tealDeep">{formatPrice(product)}</p>
        <div className="mt-8 grid gap-3 rounded-lg bg-white p-5 shadow-soft">
          <p>Minimum checkout subtotal: Rs 5,000</p>
          <p>Free delivery above Rs 10,000 within 14 km from Mayur Vihar Phase 2, Delhi</p>
          <p>Storage: -18 deg C frozen storage</p>
          <p>Shelf life: 45 days</p>
          <p>Packaging: Food grade bulk-ready packs</p>
        </div>
        <AddToCartPanel product={product} />
      </div>
    </section>
  );
}
