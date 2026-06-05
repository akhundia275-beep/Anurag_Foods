"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { FoodIllustration } from "@/components/food-illustrations";
import type { Product } from "@/lib/products";

export function ProductImage({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [missing, setMissing] = useState(false);
  const filename = `${product.slug}.jpg`;

  if (missing) {
    return (
      <div className="grid h-full w-full place-items-center bg-[#fff4ea] p-4 text-center">
        <div className="w-full max-w-[220px]">
          <div className="mx-auto mb-3 h-28 w-28 opacity-90">
            <FoodIllustration category={product.category} compact />
          </div>
          <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-white text-saffron shadow-sm">
            <ImageIcon className="h-5 w-5" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-tealDeep">Replace image</p>
          <p className="mt-1 break-words text-[11px] font-semibold leading-4 text-tealInk/60">
            public/images/products/{filename}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover"
      priority={priority}
      onError={() => setMissing(true)}
    />
  );
}
