import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "About Us" };

const journey = [
  ["2013", "Started with handmade snacks and dumplings for local food partners."],
  ["2016", "Expanded into restaurant and cafe supply with consistent frozen batches."],
  ["2019", "Added parathas, spring rolls, samosas and Indo-Chinese favorites."],
  ["2022", "Built stronger bulk order, distributor and cloud kitchen supply systems."],
  ["Now", "Serving B2B and B2C customers with premium frozen foods and reliable packaging."]
];

export default function AboutPage() {
  return (
    <>
      <ContentPage
        eyebrow="About"
        title="Premium Indian frozen foods, made for dependable service."
        copy="Anurag Foods supplies packed snacks and frozen dumplings to restaurants, distributors, cloud kitchens and homes with a focus on consistent size, storage discipline and clean packaging."
        points={["FSSAI licensed unit", "RO water used", "Food grade packaging", "No added flavours or preservatives"]}
        cta={{ label: "View catalog", href: "/products" }}
      />
      <section className="container-pad pb-14">
        <div className="rounded-[28px] bg-tealDeep p-8 text-white shadow-soft md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron">2013 to Now</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Our Journey</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {journey.map(([year, copy]) => (
              <div key={year} className="rounded-[18px] border border-white/10 bg-white/10 p-5">
                <p className="text-2xl font-black text-saffron">{year}</p>
                <p className="mt-3 text-sm leading-6 text-white/75">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
