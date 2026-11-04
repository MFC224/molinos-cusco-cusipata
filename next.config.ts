import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : {}),
  images: {
    unoptimized: isExport,
  },
  reactStrictMode: true,
};

export default nextConfig;
