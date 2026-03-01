import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export a static HTML build compatible with `next build` (replaces `next export`)
  output: "export",
  // keep other defaults; ensure pages are compatible with static export
};

export default nextConfig;
