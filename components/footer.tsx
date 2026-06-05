"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, ChefHat, HelpCircle, Home, Leaf, MessageCircle, PackageCheck, Phone, ShoppingBag, Truck, UserRound } from "lucide-react";
import { useState } from "react";
import { publicAsset } from "@/lib/assets";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Journey", href: "/journey" },
  { label: "Founder Story", href: "/founder" },
  { label: "FAQ", href: "/faq" }
];

const businessLinks = [
  { label: "Bulk Orders", href: "/bulk-orders" },
  { label: "Distributor Program", href: "/distributor" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" }
];

const quickIcons = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products", icon: ShoppingBag },
  { label: "Bulk", href: "/bulk-orders", icon: PackageCheck },
  { label: "Founder", href: "/founder", icon: UserRound },
  { label: "Distributor", href: "/distributor", icon: Building2 },
  { label: "Contact", href: "/contact", icon: Phone },
  { label: "FAQ", href: "/faq", icon: HelpCircle }
];

const highlights = [
  { icon: Leaf, label: "Fresh frozen" },
  { icon: ChefHat, label: "Kitchen ready" },
  { icon: Truck, label: "Bulk dispatch" }
];

export function Footer() {
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  return (
    <footer
      className="footer-stage mt-20 overflow-hidden bg-tealInk text-white"
      style={{ "--footer-glow-x": `${glow.x}%`, "--footer-glow-y": `${glow.y}%` } as React.CSSProperties}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setGlow({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        });
      }}
    >
      <div className="footer-glow" />
      <div className="footer-image-shell">
        <Image
          src={publicAsset("/uploads/Footer_Image.png")}
          alt="Anurag Foods premium snacks and dumplings"
          fill
          sizes="100vw"
          className="footer-uploaded-image"
        />
        <div className="footer-image-vignette" />
        <div className="footer-icon-dock" aria-label="Footer quick links">
          {quickIcons.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className="footer-image-icon" aria-label={label}>
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container-pad relative z-10 py-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_0.8fr]">
          <div>
            <p className="max-w-md text-sm leading-7 text-white/75">
              Premium frozen foods and packed snacks for restaurants, distributors, cloud kitchens and family kitchens.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {highlights.map(({ icon: Icon, label }) => (
                <span key={label} className="footer-chip">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Business" links={businessLinks} />
        </div>

        <div className="footer-bottom mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Anurag Foods. FSSAI licensed frozen food unit.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-saffron transition hover:text-white">
            <MessageCircle className="h-4 w-4" />
            Great taste, every time.
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="grid content-start gap-3 text-sm">
      <h3 className="mb-1 font-black uppercase tracking-[0.18em] text-saffron">{title}</h3>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="footer-link">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
