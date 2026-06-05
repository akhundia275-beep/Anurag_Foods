import type { Metadata } from "next";
import { ContactEnquiryForm } from "@/components/contact-enquiry-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="container-pad grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron">Contact</p>
        <h1 className="mt-3 text-4xl font-black text-tealInk md:text-6xl">Let&apos;s discuss supply.</h1>
        <p className="mt-5 leading-7 text-tealInk/70">
          Use this form for restaurant, distributor, cloud kitchen and B2C queries. The production team can verify stock,
          pricing and dispatch windows.
        </p>
        <div className="mt-6 rounded-lg bg-white p-4 text-sm font-bold text-tealInk shadow-sm">
          Enquiry details will open directly in WhatsApp at +91 7011707760.
        </div>
      </div>
      <ContactEnquiryForm />
    </section>
  );
}
