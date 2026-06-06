import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/Anurag_Foods" : undefined,
  assetPrefix: isGitHubPages ? "/Anurag_Foods/" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/Anurag_Foods" : ""
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true
  }
};

export default nextConfig;
