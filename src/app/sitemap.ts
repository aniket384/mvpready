import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { industries } from "@/content/industries";
import { insights } from "@/content/insights";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import { blogCategories } from "@/content/blog-taxonomy";
import { getIndexableTags } from "@/lib/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdatedAt = new Date(siteConfig.updatedAt);
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.95 },
    { path: "/case-studies", priority: 0.85 },
    { path: "/process", priority: 0.85 },
    { path: "/pricing", priority: 0.8 },
    { path: "/about", priority: 0.75 },
    { path: "/contact", priority: 0.8 },
    { path: "/blog", priority: 0.9 },
    { path: "/locations", priority: 0.82 },
    { path: "/industries", priority: 0.82 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...insights.map((insight) => ({
      url: `${siteConfig.url}/blog/${insight.slug}`,
      lastModified: new Date(insight.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
    ...blogCategories.map((category) => ({
      url: `${siteConfig.url}/blog/category/${category.slug}`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getIndexableTags().map((tag) => ({
      url: `${siteConfig.url}/blog/tag/${tag.slug}`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...locations.map((location) => ({
      url: `${siteConfig.url}/locations/${location.slug}`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
    ...industries.map((industry) => ({
      url: `${siteConfig.url}/industries/${industry.slug}`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
  ];
}
