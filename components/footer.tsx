"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ChefHat, HelpCircle, Home, Leaf, MessageCircle, PackageCheck, Phone, ShoppingBag, Truck, UserRound } from "lucide-react";
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
      <div className="footer-brand-panel">
        <span className="footer-blob footer-blob-saffron" />
        <span className="footer-blob footer-blob-leaf" />
        <span className="footer-cube footer-cube-one" />
        <span className="footer-cube footer-cube-two" />
        <div className="container-pad footer-brand-grid">
          <div className="footer-brand-copy">
            <div className="footer-logo-badge">
              <Image src={publicAsset("/images/brand/main-logo.png")} alt="Anurag Foods" width={176} height={104} className="h-16 w-auto object-contain" />
            </div>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-saffron">Packed snacks & dumplings</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight text-white md:text-6xl">
              Frozen food supply with a handmade heart.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
              Momos, spring rolls, parathas and snacks for restaurants, cloud kitchens, distributors and families.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="footer-primary-cta">
                Explore products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="footer-secondary-cta">
                Send enquiry
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <FooterSketchGraphic />
        </div>
        <div className="footer-icon-dock footer-icon-dock-brand" aria-label="Footer quick links">
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

function FooterSketchGraphic() {
  return (
    <div className="footer-sketch-card" aria-hidden="true">
      <svg viewBox="0 0 520 430" role="img">
        <defs>
          <linearGradient id="footerPlate" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff4ea" />
            <stop offset="100%" stopColor="#ffd59f" />
          </linearGradient>
          <linearGradient id="footerMomo" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff7db" />
            <stop offset="100%" stopColor="#f7b84d" />
          </linearGradient>
        </defs>
        <path className="footer-sketch-leaf" d="M365 90c55-45 96-42 120-38-5 32-23 80-82 103-25 10-52 9-75 5 7-25 18-50 37-70Z" />
        <path className="footer-sketch-leaf-line" d="M335 167c42-34 83-70 126-102" />
        <ellipse cx="245" cy="300" rx="178" ry="58" fill="url(#footerPlate)" opacity=".92" />
        <path className="footer-sketch-line" d="M90 292c38 48 280 55 337 2" />
        {[0, 1, 2, 3, 4].map((item) => (
          <g key={item} className={`footer-momo footer-momo-${item + 1}`} transform={`translate(${126 + item * 58} ${item % 2 ? 185 : 178})`}>
            <path d="M42 102c-35 0-55-18-48-49C1 24 26 5 43 4c24-2 51 19 56 49 6 32-19 49-57 49Z" fill="url(#footerMomo)" />
            <path className="footer-sketch-line" d="M10 54c16 13 48 15 68 1M25 18c3 22 2 39-8 60M45 11c7 20 7 42-2 67M68 23c10 18 11 35 2 53" />
            <circle cx="70" cy="26" r="6" fill="#2f8f3a" />
          </g>
        ))}
        <path className="footer-steam-line" d="M150 128c-18-28 26-38 5-67" />
        <path className="footer-steam-line footer-steam-delay" d="M238 124c-17-31 25-41 6-75" />
        <path className="footer-steam-line footer-steam-delay-two" d="M322 132c-16-26 24-36 5-65" />
        <path className="footer-sketch-spark" d="M58 154l17 7-17 8-8 17-8-17-17-8 17-7 8-18 8 18Z" />
      </svg>
    </div>
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
