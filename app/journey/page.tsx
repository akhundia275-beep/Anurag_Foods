import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Our Journey" };

export default function JourneyPage() {
  return (
    <ContentPage
      eyebrow="Journey"
      title="From local kitchen trust to scalable frozen supply."
      copy="The Anurag Foods journey is built around repeatable taste, practical pricing and a cold-chain-ready catalog that helps partners grow menus without increasing kitchen complexity."
      points={["Built for B2B and B2C", "Restaurant and cafe supply", "Cloud kitchen friendly SKUs", "Distributor-ready bulk programs"]}
    />
  );
}
