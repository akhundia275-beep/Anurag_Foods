"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Copy, Download, MessageCircle } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button, LinkButton } from "@/components/ui/button";
import { formatRupees, getBillTotals, minimumOrderValue } from "@/lib/billing";
import { buildInvoiceHtml, buildUpiUrl, buildWhatsAppMessage, createOrderId, saveLocalOrder, type CustomerDetails, type LocalOrder, upiId, upiPayeeName, whatsappNumber } from "@/lib/order";
import { useCart } from "@/store/cart";

const initialCustomer: CustomerDetails = {
  name: "",
  mobile: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
  utr: ""
};

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [customer, setCustomer] = useState(initialCustomer);
  const [screenshotName, setScreenshotName] = useState("");
  const [submitted, setSubmitted] = useState<{ order: LocalOrder; opened: boolean } | null>(null);
  const bill = getBillTotals(items);
  const upiUrl = useMemo(() => buildUpiUrl(bill.grandTotal), [bill.grandTotal]);
  const qrUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=${encodeURIComponent(upiUrl)}`,
    [upiUrl]
  );

  const update = (key: keyof CustomerDetails, value: string) => setCustomer((current) => ({ ...current, [key]: value }));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length || bill.remainingMinimumValue > 0 || !customer.name || !customer.mobile || !customer.address || !customer.utr || !screenshotName) return;
    const orderId = createOrderId();
    const url = buildWhatsAppMessage(orderId, customer, items);
    const order: LocalOrder = {
      orderId,
      customer,
      items,
      bill,
      status: "PENDING_VERIFICATION",
      whatsappUrl: url,
      createdAt: new Date().toISOString()
    };
    saveLocalOrder(order);
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted({ order, opened: Boolean(popup) });
    clear();
  }

  function downloadBill(order: LocalOrder) {
    const blob = new Blob([buildInvoiceHtml(order)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${order.orderId}-Anurag-Foods-Bill.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!items.length && !submitted) {
    return (
      <section className="container-pad grid min-h-[60vh] place-items-center py-14 text-center">
        <div className="glass max-w-lg rounded-lg p-8">
          <h1 className="text-4xl font-black">Checkout needs products</h1>
          <p className="mt-3 text-tealInk/70">Add items to cart before starting UPI verification.</p>
          <LinkButton href="/products" variant="orange" className="mt-6">
            Browse products
          </LinkButton>
        </div>
      </section>
    );
  }

  if (bill.remainingMinimumValue > 0 && !submitted) {
    return (
      <section className="container-pad grid min-h-[60vh] place-items-center py-14 text-center">
        <div className="glass max-w-lg rounded-lg p-8">
          <h1 className="text-4xl font-black">Minimum cart value required</h1>
          <p className="mt-3 text-tealInk/70">
            Checkout unlocks after {formatRupees(minimumOrderValue)} subtotal. Add{" "}
            {formatRupees(bill.remainingMinimumValue)} more to continue.
          </p>
          <LinkButton href="/products" variant="orange" className="mt-6">
            Add more products
          </LinkButton>
          <LinkButton href="/cart" variant="ghost" className="ml-3 mt-6">
            Back to cart
          </LinkButton>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="container-pad grid min-h-[65vh] place-items-center py-14 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass max-w-xl rounded-lg p-8">
          <CheckCircle2 className="mx-auto h-16 w-16 text-leaf" />
          <h1 className="mt-5 text-4xl font-black text-tealInk">Order placed</h1>
          <p className="mt-3 text-tealInk/70">
            Order {submitted.order.orderId} is saved and pending payment verification.
          </p>
          <div className="mt-5 grid gap-2 rounded-lg bg-white p-4 text-left text-sm font-bold text-tealInk shadow-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatRupees(submitted.order.bill.subtotal)}</span></div>
            <div className="flex justify-between"><span>GST 18%</span><span>{formatRupees(submitted.order.bill.gst)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{formatRupees(submitted.order.bill.delivery)}</span></div>
            <div className="flex justify-between border-t border-tealDeep/10 pt-2 text-lg"><span>Bill total</span><span>{formatRupees(submitted.order.bill.grandTotal)}</span></div>
          </div>
          <div className="mt-5 rounded-lg bg-leaf/10 p-4 text-sm font-bold text-tealInk">
            {submitted.opened
              ? "WhatsApp opened with full order details. Press Send there to notify us."
              : "Browser blocked auto WhatsApp popup. Tap the button below to send details."}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={submitted.order.whatsappUrl} target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-leaf px-5 py-3 text-sm font-bold text-white">
            <MessageCircle className="h-4 w-4" />
            Open WhatsApp order details
          </a>
          <button onClick={() => downloadBill(submitted.order)} className="inline-flex items-center gap-2 rounded-lg bg-saffron px-5 py-3 text-sm font-bold text-white">
            <Download className="h-4 w-4" />
            Download bill
          </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="container-pad py-14">
      <h1 className="text-4xl font-black text-tealInk md:text-6xl">Checkout</h1>
      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-5 rounded-lg bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">Customer details</h2>
          {[
            ["name", "Customer name"],
            ["mobile", "Mobile number"],
            ["email", "Email"],
            ["address", "Delivery address"],
            ["city", "City"],
            ["pincode", "Pincode"],
            ["utr", "UPI UTR number"]
          ].map(([key, label]) => (
            <label key={key} className="grid gap-2 text-sm font-bold">
              {label}
              <input
                required={key !== "email"}
                value={customer[key as keyof CustomerDetails]}
                onChange={(event) => update(key as keyof CustomerDetails, event.target.value)}
                className="h-12 rounded-lg border border-tealDeep/15 px-4 font-normal"
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-bold">
            Payment screenshot
            <input required type="file" accept="image/*" onChange={(event) => setScreenshotName(event.target.files?.[0]?.name ?? "")} className="rounded-lg border border-dashed border-tealDeep/30 bg-cream p-4" />
          </label>
        </div>
        <aside className="h-fit rounded-lg bg-tealDeep p-6 text-white shadow-soft">
          <h2 className="text-2xl font-black">Manual UPI payment</h2>
          <div className="mt-5 grid rounded-lg bg-white p-4 text-center text-tealDeep">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-tealInk/50">Scan QR to Pay</p>
            <p className="mt-1 text-lg font-black">{upiPayeeName}</p>
            <div className="relative mx-auto mt-4 aspect-square w-full max-w-[290px] overflow-hidden rounded-lg border border-tealDeep/10 bg-white p-2">
              <Image src={qrUrl} alt={`UPI QR for ${upiPayeeName}`} fill sizes="290px" className="object-contain p-2" unoptimized />
            </div>
            <p className="mt-4 text-xs font-bold text-tealInk/60">Use any UPI app, then enter UTR below.</p>
          </div>
          <button type="button" onClick={() => navigator.clipboard?.writeText(upiId)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-bold">
            <Copy className="h-4 w-4" />
            {upiId}
          </button>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="mt-3 block rounded-lg bg-leaf px-4 py-3 text-center text-sm font-bold">
            WhatsApp +91 7011707760
          </a>
          <a href={upiUrl} className="mt-3 block rounded-lg bg-saffron px-4 py-3 text-center text-sm font-bold">
            Open UPI App
          </a>
          <div className="mt-5 border-t border-white/15 pt-5">
            <p className="text-sm uppercase tracking-[0.18em] text-white/60">Payable amount</p>
            <p className="mt-2 text-4xl font-black">{formatRupees(bill.grandTotal)}</p>
            <div className="mt-4 grid gap-2 text-sm font-bold text-white/75">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatRupees(bill.subtotal)}</span></div>
              <div className="flex justify-between"><span>GST 18%</span><span>{formatRupees(bill.gst)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{formatRupees(bill.delivery)}</span></div>
            </div>
          </div>
          <Button type="submit" variant="orange" className="mt-6 w-full">
            Confirm & send WhatsApp
          </Button>
        </aside>
      </form>
    </section>
  );
}
