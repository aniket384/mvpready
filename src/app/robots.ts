import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/"] },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Claude-User", allow: "/", disallow: ["/api/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/api/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "GoogleOther", allow: "/", disallow: ["/api/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Applebot", allow: "/", disallow: ["/api/"] },
      { userAgent: "DuckAssistBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
