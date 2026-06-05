import type { ProductCategory } from "@/lib/products";

const palette: Record<ProductCategory, { bg: string; main: string; accent: string; dark: string }> = {
  Momos: { bg: "#fff4ea", main: "#f4d7a1", accent: "#fc8019", dark: "#2f8f3a" },
  "Spring Rolls": { bg: "#fff8dc", main: "#d88932", accent: "#fc8019", dark: "#2f8f3a" },
  Parathas: { bg: "#fff5d7", main: "#deb15a", accent: "#fc8019", dark: "#7a4d18" },
  Snacks: { bg: "#fff0df", main: "#c7772e", accent: "#fc8019", dark: "#282c3f" },
  "Kurkure Momos": { bg: "#fff0e8", main: "#f5c47b", accent: "#fc8019", dark: "#b94112" },
  Manchurian: { bg: "#fff1e8", main: "#9f2d18", accent: "#fc8019", dark: "#2f8f3a" }
};

function MomoIcon({ colors }: { colors: (typeof palette)[ProductCategory] }) {
  return (
    <>
      <ellipse cx="96" cy="134" rx="64" ry="24" fill="#ffffff" opacity="0.55" />
      {[54, 82, 110, 138].map((cx, index) => (
        <g key={cx}>
          <path d={`M${cx - 22} 118c4-24 18-40 38-40s34 16 38 40c4 26-12 42-38 42s-42-16-38-42z`} fill={colors.main} />
          <path d={`M${cx - 2} 80c4 20-2 44-13 59`} fill="none" stroke="#fff8ea" strokeWidth="5" strokeLinecap="round" />
          <path d={`M${cx + 12} 86c7 18 3 34-8 47`} fill="none" stroke="#fff8ea" strokeWidth="4" strokeLinecap="round" />
          <circle cx={cx + 20} cy={105 + index * 3} r="4" fill={colors.dark} />
        </g>
      ))}
    </>
  );
}

function RollIcon({ colors }: { colors: (typeof palette)[ProductCategory] }) {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${42 + index * 34} ${54 + index * 14}) rotate(-18)`}>
          <rect x="0" y="0" width="92" height="28" rx="14" fill={colors.main} />
          <circle cx="78" cy="14" r="13" fill="#f8e7c5" />
          <circle cx="74" cy="10" r="4" fill={colors.dark} />
          <circle cx="82" cy="15" r="4" fill={colors.accent} />
          <circle cx="76" cy="19" r="3" fill="#65a844" />
        </g>
      ))}
    </>
  );
}

function ParathaIcon({ colors }: { colors: (typeof palette)[ProductCategory] }) {
  return (
    <>
      <circle cx="96" cy="96" r="62" fill={colors.main} />
      <circle cx="96" cy="96" r="45" fill="#f2c971" opacity="0.75" />
      <path d="M54 86c32-16 58-14 86 4M64 120c24 12 52 14 76-2M82 50c-8 32-4 58 16 88" fill="none" stroke="#9b651e" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      <circle cx="66" cy="68" r="6" fill={colors.accent} />
      <circle cx="122" cy="126" r="5" fill={colors.dark} />
    </>
  );
}

function SamosaIcon({ colors }: { colors: (typeof palette)[ProductCategory] }) {
  return (
    <>
      <path d="M96 34 156 150H36L96 34z" fill={colors.main} />
      <path d="M96 52 134 136H58L96 52z" fill="#e8a24b" opacity="0.7" />
      <path d="M74 112c18-12 33-12 48 0M84 84c10 7 20 7 30 0" fill="none" stroke="#8f4e1a" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      <circle cx="96" cy="124" r="6" fill={colors.dark} />
    </>
  );
}

function ManchurianIcon({ colors }: { colors: (typeof palette)[ProductCategory] }) {
  return (
    <>
      <ellipse cx="96" cy="138" rx="66" ry="20" fill="#ffffff" opacity="0.45" />
      {[58, 88, 118, 78, 108, 138].map((cx, index) => (
        <g key={`${cx}-${index}`}>
          <circle cx={cx} cy={index < 3 ? 94 : 124} r="22" fill={colors.main} />
          <circle cx={cx - 7} cy={(index < 3 ? 94 : 124) - 7} r="5" fill="#c94b21" />
          <circle cx={cx + 8} cy={(index < 3 ? 94 : 124) + 5} r="4" fill={colors.accent} />
          <rect x={cx - 2} y={(index < 3 ? 94 : 124) - 25} width="6" height="10" rx="3" fill={colors.dark} />
        </g>
      ))}
    </>
  );
}

function KurkureIcon({ colors }: { colors: (typeof palette)[ProductCategory] }) {
  return (
    <>
      <MomoIcon colors={colors} />
      <path d="M48 142c28 22 72 24 100 0" fill="none" stroke={colors.accent} strokeWidth="12" strokeLinecap="round" strokeDasharray="6 14" />
    </>
  );
}

export function FoodIllustration({ category, compact = false }: { category: ProductCategory; compact?: boolean }) {
  const colors = palette[category];
  return (
    <svg viewBox="0 0 192 192" role="img" aria-label={category} className="h-full w-full">
      <rect width="192" height="192" rx={compact ? 96 : 26} fill={colors.bg} />
      <circle cx="154" cy="38" r="32" fill={colors.accent} opacity="0.16" />
      <circle cx="40" cy="154" r="26" fill={colors.dark} opacity="0.12" />
      {category === "Momos" ? <MomoIcon colors={colors} /> : null}
      {category === "Spring Rolls" ? <RollIcon colors={colors} /> : null}
      {category === "Parathas" ? <ParathaIcon colors={colors} /> : null}
      {category === "Snacks" ? <SamosaIcon colors={colors} /> : null}
      {category === "Kurkure Momos" ? <KurkureIcon colors={colors} /> : null}
      {category === "Manchurian" ? <ManchurianIcon colors={colors} /> : null}
    </svg>
  );
}
