import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MVPReady",
    short_name: "MVPReady",
    description:
      "From Idea to MVP. Premium startup engineering for SaaS and AI founders.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#050505",
    icons: [
      {
        src: "/brand/mvpready-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
