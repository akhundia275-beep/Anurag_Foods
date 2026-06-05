"use client";

import { motion } from "framer-motion";
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
    <main className="page-transition-shell">
      <motion.div
        key={pathname}
        initial={isReadyForRouteAnimation ? { opacity: 0.96, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
      {isReadyForRouteAnimation ? <motion.div key={`route-progress-${pathname}`} className="route-progress" /> : null}
    </main>
  );
}
