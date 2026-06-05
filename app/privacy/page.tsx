import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Privacy"
      title="Privacy Policy"
      copy="Anurag Foods collects customer, address, payment proof and order details only to process inquiries, verify manual payments and coordinate supply."
      points={["Order data is used for fulfillment", "Payment screenshots are used for manual verification", "Customer details are not sold", "Admin access should be restricted"]}
    />
  );
}
