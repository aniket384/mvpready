import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/insights",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/insights/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/case-studies",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
