"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { publicAsset } from "@/lib/assets";

const cards = [
  {
    title: "Momos",
    subtitle: "Handmade style dumplings",
    note: "From Rs 155/kg",
    href: "/products#Momos",
    image: "/images/products/Veg_Momo.jpeg"
  },
  {
    title: "Spring Rolls",
    subtitle: "Crisp frozen snacks",
    note: "Bulk packs available",
    href: "/products#Spring Rolls",
    image: "/images/products/Veg_Spring_Roll.jpeg"
  },
  {
    title: "Parathas",
    subtitle: "Ready for kitchens",
    note: "Fresh frozen supply",
    href: "/products#Parathas",
    image: "/images/products/Malabari_Paratha.jpeg"
  }
];

export function BrandHero() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbf4]">
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-[#e8f5df] to-transparent" />
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-leaf/10" />
      <div className="absolute right-[-140px] top-16 h-80 w-80 rounded-full bg-saffron/10" />

      <div className="container-pad relative z-10 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-black uppercase tracking-[0.24em] text-leaf">Premium Frozen Foods</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-tealDeep md:text-6xl">
            Great taste, every time.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-tealInk/68 md:text-lg">
            Clean, consistent frozen snacks for homes, cafes, cloud kitchens and restaurants across Delhi NCR.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="mx-auto mt-7 grid max-w-3xl gap-3 rounded-[20px] bg-white p-2 shadow-soft md:grid-cols-[0.9fr_1.3fr]"
        >
          <Link href="/contact" className="flex h-14 items-center gap-3 rounded-[14px] px-4 text-sm font-bold text-tealInk transition hover:bg-[#f7fbf4]">
            <MapPin className="h-5 w-5 text-saffron" />
            <span className="min-w-0 flex-1 truncate text-tealInk/65">Delhi NCR supply</span>
          </Link>
          <Link href="/products" className="flex h-14 items-center gap-3 rounded-[14px] border-t border-tealDeep/8 px-4 text-sm font-bold text-tealInk transition hover:bg-[#f7fbf4] md:border-l md:border-t-0">
            <Search className="h-5 w-5 text-tealInk/45" />
            <span className="min-w-0 flex-1 truncate text-tealInk/55">Search momos, parathas, spring rolls...</span>
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 + index * 0.06, duration: 0.45 }}
            >
              <Link
                href={card.href}
                className="group flex min-h-[176px] items-center justify-between gap-4 rounded-[22px] border border-leaf/12 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-leaf/25 hover:shadow-soft"
              >
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-saffron">{card.note}</p>
                  <h2 className="mt-3 text-3xl font-black text-tealDeep">{card.title}</h2>
                  <p className="mt-2 max-w-[190px] text-sm font-semibold leading-6 text-tealInk/62">{card.subtitle}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-leaf">
                    Explore
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="relative h-28 w-28 flex-none overflow-hidden rounded-full bg-[#fff4ea] ring-8 ring-[#f7fbf4] md:h-32 md:w-32">
                  <Image src={publicAsset(card.image)} alt={card.title} fill sizes="140px" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3 text-center text-xs font-black uppercase tracking-[0.14em] text-tealInk/50">
          <span className="rounded-full bg-white px-4 py-2 shadow-sm">MOQ Rs 5,000</span>
          <span className="rounded-full bg-white px-4 py-2 shadow-sm">GST 5%</span>
          <span className="rounded-full bg-white px-4 py-2 shadow-sm">Free delivery above Rs 10,000*</span>
        </div>
      </div>
    </section>
  );
}
