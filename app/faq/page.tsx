import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  ["What is the minimum order?", "Checkout unlocks when cart subtotal reaches Rs 5,000 before GST and delivery. Delivery is free above Rs 10,000 subtotal."],
  ["How should products be stored?", "Products should be stored at -18°C frozen storage."],
  ["What is the shelf life?", "The shelf life is 45 days under proper frozen storage."],
  ["How does payment work?", "Customers pay through manual UPI, enter UTR, upload proof and wait for admin verification."]
];

export default function FaqPage() {
  return (
    <section className="container-pad py-14">
      <h1 className="text-4xl font-black text-tealInk md:text-6xl">FAQ</h1>
      <div className="mt-8 grid gap-4">
        {faqs.map(([question, answer]) => (
          <details key={question} className="rounded-lg bg-white p-5 shadow-soft">
            <summary className="cursor-pointer text-lg font-black">{question}</summary>
            <p className="mt-3 text-tealInk/70">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
