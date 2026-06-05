import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export const dynamic = "force-static";

const baseUrl = "https://akhundia275-beep.github.io/Anurag_Foods";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/about",
    "/journey",
    "/founder",
    "/bulk-orders",
    "/distributor",
    "/contact",
    "/cart",
    "/checkout",
    "/login",
    "/register",
    "/admin",
    "/faq",
    "/privacy",
    "/terms"
  ];

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date()
    }))
  ];
}
