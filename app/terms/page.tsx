import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Terms"
      title="Terms & Conditions"
      copy="Orders are accepted subject to stock availability, MOQ requirements, manual UPI payment verification and cold-chain dispatch feasibility."
      points={["Payment status remains pending until UTR approval", "Rejected payments may pause dispatch", "Bulk rates can be revised after confirmation", "Cold storage handling is required after delivery"]}
    />
  );
}
