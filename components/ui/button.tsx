import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

const variants = {
  primary: "bg-tealDeep text-white hover:bg-tealInk",
  orange: "bg-saffron text-white hover:bg-[#e96f0d]",
  ghost: "bg-white text-tealDeep ring-1 ring-[#e9e9eb] hover:bg-[#f5f5f6]"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition active:scale-[0.98]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function LinkButton({ className, variant = "primary", ...props }: LinkButtonProps) {
  return (
    <Link
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition active:scale-[0.98]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
