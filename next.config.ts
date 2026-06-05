import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/Anurag_Foods" : undefined,
  assetPrefix: isGitHubPages ? "/Anurag_Foods/" : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true
  }
};

export default nextConfig;
