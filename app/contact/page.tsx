import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="container-pad grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron">Contact</p>
        <h1 className="mt-3 text-4xl font-black text-tealInk md:text-6xl">Let’s discuss supply.</h1>
        <p className="mt-5 leading-7 text-tealInk/70">Use this form for restaurant, distributor, cloud kitchen and B2C queries. The production team can verify stock, pricing and dispatch windows.</p>
      </div>
      <form className="grid gap-4 rounded-lg bg-white p-6 shadow-soft">
        {["Name", "Mobile", "Email", "Business type", "Requirement"].map((label) => (
          <label key={label} className="grid gap-2 text-sm font-bold">
            {label}
            {label === "Requirement" ? (
              <textarea className="min-h-32 rounded-lg border border-tealDeep/15 p-4 font-normal" />
            ) : (
              <input className="h-12 rounded-lg border border-tealDeep/15 px-4 font-normal" />
            )}
          </label>
        ))}
        <Button variant="orange">Submit inquiry</Button>
      </form>
    </section>
  );
}
