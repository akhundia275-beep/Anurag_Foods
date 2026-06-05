import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/ui/button";
import { publicAsset } from "@/lib/assets";

export const metadata: Metadata = { title: "Founder Story" };

export default function FounderPage() {
  return (
    <section className="container-pad grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-soft">
        <Image src={publicAsset("/images/brand/founder.jpg")} alt="Ranjan Kumar, founder of Anurag Foods" width={980} height={1260} className="h-full w-full object-cover" priority />
      </div>
      <div className="self-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron">Founder Story</p>
        <h1 className="mt-3 text-4xl font-black text-tealInk md:text-6xl">Ranjan Kumar</h1>
        <p className="mt-5 text-lg leading-8 text-tealInk/70">
          Ranjan Kumar founded Anurag Foods with a simple operating belief: frozen food should make kitchens faster without making quality feel generic. The brand focuses on practical formats, disciplined storage and reliable supply for modern Indian food businesses.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {["Consistency first", "Partner-focused pricing", "Frozen storage discipline", "Clean, modern packaging"].map((point) => (
            <div key={point} className="glass rounded-lg p-5 font-bold">
              {point}
            </div>
          ))}
        </div>
        <LinkButton href="/contact" variant="orange" className="mt-8">
          Contact founder office
        </LinkButton>
      </div>
    </section>
  );
}
