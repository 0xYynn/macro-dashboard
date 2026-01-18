import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // <-- THIS is the key line
  images: {
    unoptimized: true,       // required for GitHub Pages
  },
};

export default nextConfig;
