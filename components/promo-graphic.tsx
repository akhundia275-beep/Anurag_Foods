import Image from "next/image";
import { Leaf, PackageCheck, Phone, Snowflake } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { publicAsset } from "@/lib/assets";

export function PromoGraphic() {
  return (
    <section className="container-pad py-10">
      <div className="grid overflow-hidden rounded-[28px] bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[340px] bg-[#fff4ea] p-7 md:p-9">
          <div className="absolute left-0 top-0 h-28 w-28 rounded-br-full bg-leaf/15" />
          <div className="absolute bottom-0 right-0 h-36 w-36 rounded-tl-full bg-saffron/15" />
          <div className="relative z-10">
            <Image src={publicAsset("/images/brand/main-logo.png")} alt="Anurag Foods" width={280} height={170} className="h-auto w-48 rounded-md bg-white p-2 shadow-sm" />
            <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-saffron">Premium frozen foods</p>
            <h2 className="mt-3 max-w-md text-5xl font-black leading-[0.98] text-tealDeep md:text-6xl">
              Great Taste,
              <span className="block text-leaf">Every Time.</span>
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {[
                [Snowflake, "-18 deg C"],
                [PackageCheck, "Bulk orders"],
                [Leaf, "Freshly packed"]
              ].map(([Icon, label]) => (
                <span key={label as string} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-tealDeep shadow-sm">
                  <Icon className="h-4 w-4 text-saffron" />
                  {label as string}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/products" variant="orange">
                Order now
              </LinkButton>
              <a href="tel:+917011707760" className="inline-flex items-center gap-2 rounded-md bg-tealDeep px-5 py-3 text-sm font-black text-white">
                <Phone className="h-4 w-4" />
                +91 7011707760
              </a>
            </div>
          </div>
        </div>
        <div className="relative min-h-[340px] bg-tealDeep">
          <Image src={publicAsset("/images/promos/anurag-foods-gfx-1.jpg")} alt="Anurag Foods frozen snacks platter" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-right" />
          <div className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-tealDeep to-transparent lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-tealDeep/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
