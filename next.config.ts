import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: "/macro-dashboard/",
  basePath: "/macro-dashboard",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
