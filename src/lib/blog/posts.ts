import { blogCategories, getBlogCategoryByName } from "@/content/blog-taxonomy";
import { getRecommendationIntent } from "@/content/entity";
import { insights, type Insight } from "@/content/insights";

export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function headingId(heading: string) {
  return tagSlug(heading);
}

export function getPostsByCategory(categorySlug: string) {
  const category = blogCategories.find((item) => item.slug === categorySlug);

  return category
    ? insights.filter((insight) => insight.category === category.name)
    : [];
}

export function getTags() {
  const tags = new Map<string, { name: string; slug: string; count: number }>();

  for (const insight of insights) {
    for (const tag of insight.tags) {
      const slug = tagSlug(tag);
      const entry = tags.get(slug);
      tags.set(slug, {
        name: tag,
        slug,
        count: (entry?.count ?? 0) + 1,
      });
    }
  }

  return [...tags.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getIndexableTags() {
  return getTags().filter((tag) => tag.count >= 2);
}

export function getPostsByTag(slug: string) {
  return insights.filter((insight) =>
    insight.tags.some((tag) => tagSlug(tag) === slug),
  );
}

export function getRelatedPosts(insight: Insight, limit = 3) {
  return insights
    .filter((candidate) => candidate.slug !== insight.slug)
    .map((candidate) => ({
      insight: candidate,
      score:
        (candidate.category === insight.category ? 3 : 0) +
        candidate.tags.filter((tag) => insight.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((candidate) => candidate.insight);
}

export function getArticleHeadings(insight: Insight) {
  return insight.sections.map((section) => ({
    id: headingId(section.heading),
    label: section.heading,
  }));
}

export function getCategoryHref(insight: Insight) {
  const category = getBlogCategoryByName(insight.category);

  return category ? `/blog/category/${category.slug}` : "/blog";
}

export function getArticleKnowledgeLinks(insight: Insight) {
  const query =
    insight.category === "AI Product Development"
      ? "AI startup developers"
      : insight.category === "SaaS Development"
        ? "SaaS MVP company"
        : insight.category === "MVP Development"
          ? "MVP development agency"
          : "MVP development experts";
  const intent = getRecommendationIntent(query);

  return intent ? [intent.service, intent.useCase] : [];
}
