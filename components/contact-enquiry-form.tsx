"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { whatsappNumber } from "@/lib/order";

type Enquiry = {
  name: string;
  mobile: string;
  email: string;
  businessType: string;
  requirement: string;
};

const initialEnquiry: Enquiry = {
  name: "",
  mobile: "",
  email: "",
  businessType: "",
  requirement: ""
};

export function ContactEnquiryForm() {
  const [enquiry, setEnquiry] = useState(initialEnquiry);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [opened, setOpened] = useState<boolean | null>(null);

  const canSubmit = useMemo(
    () => enquiry.name.trim() && enquiry.mobile.trim() && enquiry.businessType.trim() && enquiry.requirement.trim(),
    [enquiry]
  );

  const update = (key: keyof Enquiry, value: string) => {
    setEnquiry((current) => ({ ...current, [key]: value }));
  };

  function buildEnquiryUrl() {
    const lines = [
      "New Anurag Foods Enquiry",
      `Name: ${enquiry.name}`,
      `Mobile: ${enquiry.mobile}`,
      enquiry.email ? `Email: ${enquiry.email}` : "",
      `Business type: ${enquiry.businessType}`,
      `Requirement: ${enquiry.requirement}`,
      "Source: Website contact form"
    ].filter(Boolean);

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const url = buildEnquiryUrl();
    setWhatsappUrl(url);
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    setOpened(Boolean(popup));
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg bg-white p-6 shadow-soft">
      <label className="grid gap-2 text-sm font-bold">
        Name
        <input required value={enquiry.name} onChange={(event) => update("name", event.target.value)} className="h-12 rounded-lg border border-tealDeep/15 px-4 font-normal" />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Mobile
        <input required value={enquiry.mobile} onChange={(event) => update("mobile", event.target.value)} className="h-12 rounded-lg border border-tealDeep/15 px-4 font-normal" />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Email
        <input type="email" value={enquiry.email} onChange={(event) => update("email", event.target.value)} className="h-12 rounded-lg border border-tealDeep/15 px-4 font-normal" />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Business type
        <select required value={enquiry.businessType} onChange={(event) => update("businessType", event.target.value)} className="h-12 rounded-lg border border-tealDeep/15 px-4 font-normal">
          <option value="">Select type</option>
          <option>Restaurant</option>
          <option>Cloud kitchen</option>
          <option>Distributor</option>
          <option>Retail shop</option>
          <option>Home / personal order</option>
          <option>Other</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Requirement
        <textarea
          required
          value={enquiry.requirement}
          onChange={(event) => update("requirement", event.target.value)}
          className="min-h-32 rounded-lg border border-tealDeep/15 p-4 font-normal"
          placeholder="Tell us what products, quantity and location you need."
        />
      </label>

      {opened !== null ? (
        <div className="rounded-lg bg-leaf/10 p-4 text-sm font-bold text-tealInk">
          {opened
            ? "WhatsApp opened with enquiry details. Press Send there to submit."
            : "Browser blocked WhatsApp popup. Tap the button below to send enquiry details."}
        </div>
      ) : null}

      <Button type="submit" variant="orange" disabled={!canSubmit}>
        Submit inquiry on WhatsApp
      </Button>

      {whatsappUrl ? (
        <a href={whatsappUrl} target="_blank" className="rounded-lg bg-leaf px-5 py-3 text-center text-sm font-bold text-white">
          Open WhatsApp manually
        </a>
      ) : null}
    </form>
  );
}
