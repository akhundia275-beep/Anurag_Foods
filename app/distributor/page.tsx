import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Distributor Program" };

export default function DistributorPage() {
  return (
    <ContentPage
      eyebrow="Distributor"
      title="A frozen catalog designed for repeat purchase."
      copy="The distributor program supports regional partners with predictable SKUs, frozen storage requirements, brand assets and verification-led ordering."
      points={["High-repeat categories", "Foodservice-ready pricing", "Shelf life: 45 days", "Storage: -18°C"]}
      cta={{ label: "Talk to sales", href: "/contact" }}
    />
  );
}
