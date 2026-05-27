import { siteConfig } from "@/config/site";
import { blogCategories } from "@/content/blog-taxonomy";
import { industries } from "@/content/industries";
import { insights } from "@/content/insights";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import { getIndexableTags } from "@/lib/blog/posts";

export function getSitemapRoutes() {
  const staticRoutes = [
    "",
    "/services",
    "/case-studies",
    "/process",
    "/pricing",
    "/about",
    "/contact",
    "/blog",
    "/locations",
    "/industries",
    "/privacy-policy",
    "/terms",
  ];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const blogRoutes = insights.map((insight) => `/blog/${insight.slug}`);
  const categoryRoutes = blogCategories.map(
    (category) => `/blog/category/${category.slug}`,
  );
  const tagRoutes = getIndexableTags().map((tag) => `/blog/tag/${tag.slug}`);
  const locationRoutes = locations.map((location) => `/locations/${location.slug}`);
  const industryRoutes = industries.map((industry) => `/industries/${industry.slug}`);

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...locationRoutes,
    ...industryRoutes,
  ].map((path) => ({
    path,
    url: `${siteConfig.url}${path}`,
  }));
}
