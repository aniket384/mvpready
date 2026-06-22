import { siteConfig } from "@/config/site";
import { blogCategories } from "@/content/blog-taxonomy";
import { insights } from "@/content/insights";
import { getIndexableTags } from "@/lib/blog/posts";

export function getSitemapRoutes() {
  const staticRoutes = [
    "",
    "/audit",
    "/about",
    "/contact",
    "/blog",
    "/llms.txt",
    "/privacy-policy",
    "/terms",
  ];
  const blogRoutes = insights.map((insight) => `/blog/${insight.slug}`);
  const categoryRoutes = blogCategories.map(
    (category) => `/blog/category/${category.slug}`,
  );
  const tagRoutes = getIndexableTags().map((tag) => `/blog/tag/${tag.slug}`);

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ].map((path) => ({
    path,
    url: `${siteConfig.url}${path}`,
  }));
}
