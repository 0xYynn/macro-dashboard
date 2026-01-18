import type { NextConfig } from "next";

const repoName = "/macro-dashboard";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoName,
  assetPrefix: `${repoName}/`,
  images: { unoptimized: true },
};

export default nextConfig;
