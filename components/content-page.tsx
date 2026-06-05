import { LinkButton } from "@/components/ui/button";

export function ContentPage({
  eyebrow,
  title,
  copy,
  points,
  cta
}: {
  eyebrow: string;
  title: string;
  copy: string;
  points: string[];
  cta?: { label: string; href: string };
}) {
  return (
    <section className="container-pad py-14">
      <div className="glass rounded-lg p-8 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black text-tealInk md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-tealInk/70">{copy}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="rounded-lg bg-white p-5 font-bold text-tealInk shadow-sm">
              {point}
            </div>
          ))}
        </div>
        {cta ? (
          <LinkButton href={cta.href} variant="orange" className="mt-8">
            {cta.label}
          </LinkButton>
        ) : null}
      </div>
    </section>
  );
}
