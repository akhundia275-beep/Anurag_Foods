export function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black text-tealInk md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-tealInk/70">{copy}</p> : null}
    </div>
  );
}
