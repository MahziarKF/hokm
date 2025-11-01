import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["deckofcardsapi.com"],
  },
};

export default nextConfig;
