"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, PackageCheck, ShieldCheck, Snowflake, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { publicAsset } from "@/lib/assets";

const slides = [
  {
    eyebrow: "Premium frozen snacks",
    title: "Great taste, every time.",
    accent: "Restaurant-ready momos, rolls and parathas.",
    copy: "Crafted for consistent taste, fast kitchen service and reliable frozen supply across Delhi NCR.",
    image: "/images/hero/anurag-foods-dark-hero.jpg",
    tone: "from-black via-[#07150d]/90 to-[#0b1b10]",
    metric: "45 days",
    metricLabel: "Shelf life"
  },
  {
    eyebrow: "Bulk orders made simple",
    title: "Fresh stock for busy kitchens.",
    accent: "MOQ starts at Rs 5,000.",
    copy: "A clean ordering flow for cafes, cloud kitchens, caterers, restaurants and distributors.",
    image: "/images/promos/anurag-foods-gfx-1.jpg",
    tone: "from-[#fff7ec] via-white to-[#e9f5df]",
    light: true,
    metric: "B2B",
    metricLabel: "Frozen supply"
  },
  {
    eyebrow: "Best sellers",
    title: "Your menu gets more craveable.",
    accent: "Momos, spring rolls, parathas and Manchurian.",
    copy: "Pick your products, check out above minimum cart value, then confirm order details on WhatsApp.",
    image: "/images/products/Veg_Momo.jpeg",
    tone: "from-[#162016] via-[#1f3320] to-[#07120a]",
    metric: "5% GST",
    metricLabel: "Bill ready"
  }
];

const floatingProducts = [
  { name: "Momos", image: "/images/products/Veg_Momo.jpeg", x: "right-[8%]", y: "top-[16%]", delay: 0 },
  { name: "Rolls", image: "/images/products/Veg_Spring_Roll.jpeg", x: "right-[20%]", y: "bottom-[18%]", delay: 0.16 },
  { name: "Paratha", image: "/images/products/Malabari_Paratha.jpeg", x: "right-[3%]", y: "bottom-[34%]", delay: 0.32 }
];

const trustItems = [
  { label: "Premium quality", Icon: ShieldCheck },
  { label: "Frozen fresh", Icon: Snowflake },
  { label: "Pan India supply", Icon: Truck },
  { label: "Bulk orders", Icon: PackageCheck }
];

export function BrandHero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const textColor = slide.light ? "text-tealDeep" : "text-white";
  const mutedColor = slide.light ? "text-tealInk/70" : "text-white/72";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const progressBars = useMemo(
    () =>
      slides.map((item, index) => (
        <button
          key={item.title}
          type="button"
          onClick={() => setActive(index)}
          className="group h-2 flex-1 overflow-hidden rounded-full bg-white/20 ring-1 ring-white/10"
          aria-label={`Show banner ${index + 1}`}
        >
          <motion.span
            key={`${active}-${index}`}
            className="block h-full rounded-full bg-saffron"
            initial={{ width: index === active ? "0%" : index < active ? "100%" : "0%" }}
            animate={{ width: index === active ? "100%" : index < active ? "100%" : "0%" }}
            transition={{ duration: index === active ? 5.2 : 0.2, ease: "linear" }}
          />
        </button>
      )),
    [active]
  );

  return (
    <section className={`relative isolate overflow-hidden bg-gradient-to-br ${slide.tone}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: slide.light ? 0.2 : 0.78, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={publicAsset(slide.image)} alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(252,128,25,0.26),transparent_26%),linear-gradient(90deg,rgba(0,0,0,0.84),rgba(0,0,0,0.26),rgba(0,0,0,0.04))]" />
      {slide.light ? <div className="absolute inset-0 bg-gradient-to-r from-white via-white/86 to-white/18" /> : null}

      <motion.div
        aria-hidden
        className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-saffron/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[6%] top-[9%] h-32 w-32 rounded-full border border-leaf/35"
        animate={{ y: [0, 18, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-pad relative z-10 grid min-h-[calc(100vh-78px)] items-center gap-10 py-12 md:grid-cols-[0.92fr_1.08fr] md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className={textColor}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-current/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-saffron" />
              {slide.eyebrow}
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.93] tracking-tight sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-xl text-2xl font-black text-saffron md:text-3xl">{slide.accent}</p>
            <p className={`mt-4 max-w-xl text-lg font-semibold leading-8 ${mutedColor}`}>{slide.copy}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex items-center gap-3 rounded-lg bg-saffron px-6 py-4 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#e96f0d]">
                Explore products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/bulk-orders" className="inline-flex items-center gap-3 rounded-lg border border-current/20 bg-white/10 px-6 py-4 text-sm font-black backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/18">
                Bulk orders
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {trustItems.map(({ label, Icon }) => (
                <div key={label} className="rounded-lg border border-current/10 bg-white/10 p-3 backdrop-blur">
                  <Icon className="h-5 w-5 text-saffron" />
                  <p className="mt-2 text-xs font-black uppercase leading-4 tracking-[0.08em]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative min-h-[420px]">
          <motion.div
            key={`plate-${active}`}
            initial={{ opacity: 0, y: 32, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-6 mx-auto aspect-[1.18] max-w-[680px] overflow-hidden rounded-[34px] border border-white/12 bg-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.35)] backdrop-blur"
          >
            <Image src={publicAsset(slide.image)} alt={slide.title} fill priority sizes="(max-width: 768px) 94vw, 54vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">{slide.metricLabel}</p>
                <p className="mt-1 text-4xl font-black">{slide.metric}</p>
              </div>
              <div className="rounded-full bg-white/16 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] backdrop-blur">
                Anurag Foods
              </div>
            </div>
          </motion.div>

          {floatingProducts.map((product) => (
            <motion.div
              key={product.name}
              className={`absolute hidden w-28 rounded-[22px] border border-white/20 bg-white/90 p-2 shadow-soft md:block ${product.x} ${product.y}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: [0, -14, 0], scale: 1 }}
              transition={{ delay: product.delay, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } }}
            >
              <div className="relative aspect-square overflow-hidden rounded-[16px]">
                <Image src={publicAsset(product.image)} alt={product.name} fill sizes="112px" className="object-cover" />
              </div>
              <p className="mt-2 text-center text-xs font-black text-tealDeep">{product.name}</p>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex w-[min(520px,calc(100%-32px))] -translate-x-1/2 gap-2">
          {progressBars}
        </div>
      </div>
    </section>
  );
}
