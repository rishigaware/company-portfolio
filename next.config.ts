import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Free-licence stock photos (Unsplash License: free for commercial & non-commercial use, no permission needed).
    // Remote stock photos are served straight from the Unsplash CDN (already resized) via `unoptimized`.
    // Only the free images.unsplash.com CDN is allowed — not plus.unsplash.com (Unsplash+ premium).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
