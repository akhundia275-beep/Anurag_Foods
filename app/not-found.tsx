import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-pad grid min-h-[60vh] place-items-center py-14 text-center">
      <div className="glass max-w-lg rounded-lg p-8">
        <h1 className="text-4xl font-black text-tealInk">Page not found</h1>
        <p className="mt-3 text-tealInk/70">The page may have moved or the product URL is no longer active.</p>
        <LinkButton href="/products" variant="orange" className="mt-6">
          View products
        </LinkButton>
      </div>
    </section>
  );
}
