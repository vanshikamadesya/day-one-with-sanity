import { fetchRedirects } from "@/sanity/fetchRedirect";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  async redirects() {
    return await fetchRedirects();
  }
};

export default nextConfig;