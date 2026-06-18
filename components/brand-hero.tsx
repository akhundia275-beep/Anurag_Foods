"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { publicAsset } from "@/lib/assets";

const bannerCards = [
  {
    title: "MOMOS & DUMPLINGS",
    subtitle: "HANDMADE STYLE",
    offer: "MOQ Rs 5,000",
    href: "/products#Momos",
    image: "/images/products/Veg_Momo.jpeg",
    imageClass: "right-[-18px] bottom-[-26px] h-40 w-40 md:h-52 md:w-52"
  },
  {
    title: "SPRING ROLLS",
    subtitle: "CRISP FROZEN SNACKS",
    offer: "BULK ORDERS",
    href: "/products#Spring Rolls",
    image: "/images/products/Veg_Spring_Roll.jpeg",
    imageClass: "right-[-34px] bottom-[-20px] h-40 w-48 md:h-52 md:w-64"
  },
  {
    title: "PARATHAS & SNACKS",
    subtitle: "READY FOR KITCHENS",
    offer: "FREE DELIVERY ABOVE 10K*",
    href: "/products#Parathas",
    image: "/images/products/Malabari_Paratha.jpeg",
    imageClass: "right-[-26px] bottom-[-34px] h-44 w-44 md:h-56 md:w-56"
  }
];

const sideFoods = [
  { src: "/images/products/Punjabi_Samosa.jpeg", className: "-left-14 top-20 h-40 w-40 rotate-[-18deg] md:h-56 md:w-56" },
  { src: "/images/products/Paneer_Momo.jpeg", className: "-right-16 top-16 h-40 w-40 rotate-[18deg] md:h-56 md:w-56" }
];

export function BrandHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fc4c02] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_22%)]" />

      {sideFoods.map((item) => (
        <motion.div
          key={item.src}
          aria-hidden
          className={`absolute hidden overflow-hidden rounded-[42px] shadow-[0_28px_70px_rgba(90,28,0,0.26)] lg:block ${item.className}`}
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={publicAsset(item.src)} alt="" fill sizes="224px" className="object-cover" />
        </motion.div>
      ))}

      <div className="container-pad relative z-10 py-14 md:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-white/80">Anurag Foods</p>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Order frozen snacks for homes, cafes and restaurants.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-white/82">
            Premium momos, spring rolls, parathas and packed snacks with bulk supply across Delhi NCR.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-[0.95fr_1.45fr]"
        >
          <Link href="/contact" className="flex h-16 items-center gap-3 rounded-[18px] bg-white px-5 text-left text-sm font-bold text-tealInk shadow-[0_18px_36px_rgba(90,28,0,0.18)]">
            <MapPin className="h-6 w-6 flex-none text-saffron" />
            <span className="min-w-0 flex-1 truncate text-tealInk/58">Delhi NCR delivery location</span>
            <ChevronDown className="h-5 w-5 flex-none text-tealInk" />
          </Link>
          <Link href="/products" className="flex h-16 items-center gap-3 rounded-[18px] bg-white px-5 text-left text-sm font-bold text-tealInk shadow-[0_18px_36px_rgba(90,28,0,0.18)]">
            <Search className="h-6 w-6 flex-none text-tealInk/58" />
            <span className="min-w-0 flex-1 truncate text-tealInk/58">Search for momos, parathas, spring rolls...</span>
          </Link>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {bannerCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={card.href}
                className="group relative block min-h-[270px] overflow-hidden rounded-[34px] bg-white p-8 text-tealDeep shadow-[0_24px_60px_rgba(90,28,0,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(90,28,0,0.28)]"
              >
                <div className="relative z-10 max-w-[70%]">
                  <h2 className="text-3xl font-black leading-none tracking-tight md:text-4xl">{card.title}</h2>
                  <p className="mt-3 text-xl font-black text-tealInk/55">{card.subtitle}</p>
                  <span className="mt-5 inline-flex rounded-full bg-[#fff1e8] px-4 py-2 text-sm font-black text-[#fc4c02]">
                    {card.offer}
                  </span>
                </div>

                <div className="absolute bottom-8 left-8 z-10 grid h-14 w-14 place-items-center rounded-full bg-[#fc4c02] text-white shadow-soft transition group-hover:scale-110">
                  <ArrowRight className="h-7 w-7" />
                </div>

                <motion.div
                  className={`absolute overflow-hidden rounded-full shadow-[0_20px_50px_rgba(40,44,63,0.2)] ${card.imageClass}`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image src={publicAsset(card.image)} alt={card.title} fill sizes="260px" className="object-cover transition duration-500 group-hover:scale-105" />
                </motion.div>

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#fc4c02]/7" />
                <div className="absolute bottom-0 right-0 h-28 w-48 rounded-tl-full bg-gradient-to-br from-transparent to-[#fff1e8]" />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-7 text-center text-xs font-bold uppercase tracking-[0.18em] text-white/70">
          *Free delivery above Rs 10,000 within 14 km from Mayur Vihar Phase 2
        </p>
      </div>
    </section>
  );
}
