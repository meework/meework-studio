import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [64, 128, 256, 384, 512],
  },
};

export default nextConfig;
