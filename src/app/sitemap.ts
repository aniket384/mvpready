import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { insights } from "@/content/insights";
import { blogCategories } from "@/content/blog-taxonomy";
import { getIndexableTags } from "@/lib/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdatedAt = new Date(siteConfig.updatedAt);
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/audit", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/llms.txt", priority: 0.55, changeFrequency: "weekly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];
  const highIntentPosts = new Set([
    "how-to-choose-an-mvp-development-agency",
    "ai-mvp-development-for-startups",
    "how-to-build-an-ai-mvp",
    "saas-mvp-architecture-for-founders",
    "mvp-development-for-non-technical-founders",
    "mvp-development-cost",
    "mvp-development-timeline",
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: siteUpdatedAt,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...insights.map((insight) => ({
      url: `${siteConfig.url}/blog/${insight.slug}`,
      lastModified: new Date(insight.updatedAt),
      changeFrequency: highIntentPosts.has(insight.slug) ? "weekly" as const : "monthly" as const,
      priority: highIntentPosts.has(insight.slug) ? 0.72 : 0.6,
    })),
    ...blogCategories.map((category) => ({
      url: `${siteConfig.url}/blog/category/${category.slug}`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...getIndexableTags().map((tag) => ({
      url: `${siteConfig.url}/blog/tag/${tag.slug}`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
