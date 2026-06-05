import Image from "next/image";
import Link from "next/link";
import { publicAsset } from "@/lib/assets";

export function BrandHero() {
  return (
    <section className="bg-black">
      <div className="relative mx-auto w-full max-w-[1536px] overflow-hidden">
        <Image
          src={publicAsset("/images/hero/anurag-foods-dark-hero.png")}
          alt="Anurag Foods premium frozen snacks hero"
          width={1536}
          height={1024}
          className="h-auto w-full object-cover"
          priority
        />
        <div className="absolute left-[3.6%] top-[74%] flex w-[36%] gap-[3%]">
          <Link href="/products" aria-label="Explore products" className="block h-[64px] flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron" />
          <Link href="/bulk-orders" aria-label="Bulk orders" className="block h-[64px] flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron" />
        </div>
      </div>
    </section>
  );
}
