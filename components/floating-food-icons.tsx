"use client";

import { motion } from "framer-motion";
import { categoryMeta } from "@/lib/products";
import { FoodIllustration } from "@/components/food-illustrations";
import type { ProductCategory } from "@/lib/products";

const positions = [
  "left-[4%] top-[12%]",
  "right-[8%] top-[18%]",
  "left-[10%] bottom-[16%]",
  "right-[14%] bottom-[10%]",
  "left-[46%] top-[6%]",
  "right-[40%] bottom-[4%]"
];

export function FloatingFoodIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Object.keys(categoryMeta).map((name, index) => (
        <motion.div
          key={name}
          className={`absolute h-16 w-16 rounded-full bg-white p-3 shadow-soft ${positions[index]}`}
          animate={{ y: [0, -16, 0], rotate: [0, index % 2 ? 8 : -8, 0] }}
          transition={{ duration: 4 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          <FoodIllustration category={name as ProductCategory} compact />
        </motion.div>
      ))}
    </div>
  );
}
