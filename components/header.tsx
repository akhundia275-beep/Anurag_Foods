"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { publicAsset } from "@/lib/assets";

const links = [
  ["Products", "/products"],
  ["Bulk Orders", "/bulk-orders"],
  ["Distributor", "/distributor"],
  ["Founder", "/founder"],
  ["Contact", "/contact"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  const { user, ready, hydrate, logout } = useAuth();

  useEffect(() => hydrate(), [hydrate]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e9eb] bg-white shadow-sm">
      <div className="container-pad flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src={publicAsset("/images/brand/main-logo.png")} alt="Anurag Foods logo" width={132} height={78} className="h-12 w-auto object-contain" priority />
        </Link>
        <div className="hidden min-w-44 items-center gap-2 text-sm font-bold text-tealDeep lg:flex">
          <MapPin className="h-5 w-5 text-saffron" />
          Delhi NCR
          <span className="font-medium text-tealInk/60">Frozen supply</span>
        </div>
        <label className="hidden h-12 flex-1 items-center gap-3 rounded-md bg-[#f5f5f6] px-4 text-sm text-tealInk/60 md:flex">
          <Search className="h-5 w-5" />
          <input className="w-full bg-transparent outline-none" placeholder="Search for momos, parathas, spring rolls..." />
        </label>
        <nav className="hidden items-center gap-6 text-sm font-bold text-tealInk lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-saffron">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {ready && user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold hover:text-saffron">
                <UserRound className="h-5 w-5" />
                Hi, {user.name.split(" ")[0]}
              </Link>
              <button onClick={logout} className="rounded-md bg-[#f5f5f6] px-3 py-2 text-xs font-black text-tealInk hover:text-saffron">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden items-center gap-2 text-sm font-bold hover:text-saffron sm:flex">
              <UserRound className="h-5 w-5" />
              Sign in
            </Link>
          )}
          <Link href="/cart" className="cart-link relative rounded-md bg-[#f5f5f6] p-3 text-tealDeep" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 ? (
                <motion.span
                  key={count}
                  initial={{ scale: 0.2, y: 8, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.2, y: -8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 520, damping: 24 }}
                  className="cart-badge absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-saffron px-1 text-xs font-bold text-white"
                >
                  {count}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </Link>
          <button className="rounded-md bg-saffron p-3 text-white lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="container-pad grid gap-3 pb-5 text-sm font-semibold lg:hidden">
          <label className="flex h-12 items-center gap-3 rounded-md bg-[#f5f5f6] px-4 text-sm text-tealInk/60">
            <Search className="h-5 w-5" />
            <input className="w-full bg-transparent outline-none" placeholder="Search products" />
          </label>
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-md bg-[#f5f5f6] px-4 py-3">
              {label}
            </Link>
          ))}
          {ready && user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="rounded-md bg-saffron px-4 py-3 text-left font-black text-white"
            >
              Logout {user.name.split(" ")[0]}
            </button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="rounded-md bg-saffron px-4 py-3 font-black text-white">
              Login / Sign up
            </Link>
          )}
        </nav>
      ) : null}
    </header>
  );
}
