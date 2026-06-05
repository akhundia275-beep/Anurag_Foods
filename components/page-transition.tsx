"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isReadyForRouteAnimation, setIsReadyForRouteAnimation] = useState(false);

  useEffect(() => {
    setIsReadyForRouteAnimation(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        className="page-transition-shell"
        initial={isReadyForRouteAnimation ? { opacity: 0, y: 14, filter: "blur(8px)" } : false}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
        transition={{ delay: isReadyForRouteAnimation ? 0.3 : 0, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
