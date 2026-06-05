import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"]
    },
    sitemap: "https://akhundia275-beep.github.io/Anurag_Foods/sitemap.xml"
  };
}
