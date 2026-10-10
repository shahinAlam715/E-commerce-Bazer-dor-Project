import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
      },
    ],
  },

  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
