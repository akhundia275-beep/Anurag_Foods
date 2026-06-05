"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Utensils } from "lucide-react";

type Props = ImageProps & {
  fallbackLabel?: string;
};

export function ImageWithFallback({ fallbackLabel, className, alt, ...props }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`grid place-items-center bg-gradient-to-br from-orange-50 to-green-50 text-tealDeep ${className ?? ""}`}>
        <div className="grid place-items-center gap-2 text-center text-sm font-bold">
          <Utensils className="h-9 w-9 text-saffron" />
          <span>{fallbackLabel ?? "Anurag Foods"}</span>
        </div>
      </div>
    );
  }

  return <Image {...props} alt={alt} className={className} onError={() => setFailed(true)} />;
}
