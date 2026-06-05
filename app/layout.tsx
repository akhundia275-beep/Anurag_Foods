import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  metadataBase: new URL("https://akhundia275-beep.github.io/Anurag_Foods"),
  title: {
    default: "Anurag Foods | Premium Frozen Snacks & Dumplings",
    template: "%s | Anurag Foods"
  },
  description:
    "Premium frozen momos, spring rolls, parathas, samosas, Manchurian and packed snacks for restaurants, distributors, cloud kitchens and homes.",
  openGraph: {
    title: "Anurag Foods",
    description: "Premium Indian frozen foods for B2B and B2C supply.",
    images: ["/images/brand/main-logo.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html,body{margin:0;background:#f8f8f8;color:#282c3f;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
              a{color:inherit;text-decoration:none}
              button,input,select{font:inherit}
              .container-pad{width:min(1200px,calc(100% - 28px));margin-inline:auto}
              .product-card{overflow:hidden;border-radius:18px;border:1px solid #f0f0f2;background:#fff;box-shadow:0 2px 12px rgba(40,44,63,.06)}
              .product-card-link{display:block;padding:12px 12px 0}
              .product-card-media{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:18px;background:#fff4ea}
              .product-card-art{height:100%;width:100%;padding:24px}
              .product-card-body{display:grid;gap:12px;padding:16px}
              .product-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
              .product-card-title{margin:0;font-size:18px;line-height:1.25;font-weight:900;color:#282c3f}
              .product-card-meta{margin:4px 0 0;font-size:14px;color:rgba(31,41,55,.62)}
              .product-card-note{margin:4px 0 0;font-size:12px;font-weight:700;color:rgba(31,41,55,.48)}
              .product-card-rating{display:inline-flex;align-items:center;gap:4px;flex-shrink:0;border-radius:6px;background:#2f8f3a;padding:4px 8px;color:white;font-size:12px;font-weight:900}
              .product-card-footer{display:flex;align-items:center;justify-content:space-between;gap:16px}
              .product-card-price{margin:0;font-size:16px;font-weight:900;color:#282c3f}
              .product-card-add{border:1px solid #fc8019;border-radius:6px;background:white;padding:8px 20px;color:#fc8019;font-size:14px;font-weight:900;cursor:pointer}
              .product-card-badge{position:absolute;left:12px;top:12px;border-radius:6px;background:#282c3f;padding:4px 10px;color:#fff;font-size:12px;font-weight:900}
            `
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <PageTransition>{children}</PageTransition>
        <ScrollReveal />
        <Footer />
      </body>
    </html>
  );
}
