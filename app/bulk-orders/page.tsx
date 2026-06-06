import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Bulk Orders" };

export default function BulkOrdersPage() {
  return (
    <ContentPage
      eyebrow="Bulk Orders"
      title="Minimum cart value Rs 5,000 with manual verification."
      copy="Place bulk requirements for momos, spring rolls, parathas, samosas, Kurkure momos and Manchurian. The team confirms stock, cold-chain logistics and payment proof before dispatch."
      points={["Minimum order: Rs 5,000", "Free delivery above Rs 10,000 within 14 km", "Restaurant supply", "Cloud kitchen supply", "Bulk pricing confirmation"]}
      cta={{ label: "Start order", href: "/products" }}
    />
  );
}
