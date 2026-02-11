import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/tnn-ecosystem" : "",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://theblockchainbeast.github.io/tnn-ecosystem"
      : "",
};

export default nextConfig;
