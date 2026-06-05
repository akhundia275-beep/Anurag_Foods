"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section, main article, main .glass, main .product-card, main [data-reveal]"
      )
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-revealed"));
      return;
    }

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return null;
}
