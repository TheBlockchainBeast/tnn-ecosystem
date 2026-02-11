import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath: basePath ? (basePath.startsWith("/") ? basePath : `/${basePath}`) : undefined,
  assetPrefix: basePath ? (basePath.startsWith("/") ? basePath : `/${basePath}`) : undefined,
};

export default nextConfig;
