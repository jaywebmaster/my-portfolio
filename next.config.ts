import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the Next 16 default; 90 keeps the hero portrait crisp.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
