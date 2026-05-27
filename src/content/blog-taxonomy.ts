export const blogCategories = [
  {
    name: "MVP Development",
    slug: "mvp-development",
    description:
      "MVP scope, cost, timelines, delivery decisions, and agency selection guidance for startup founders.",
  },
  {
    name: "SaaS Development",
    slug: "saas-development",
    description:
      "Product architecture, onboarding, activation, and engineering guidance for SaaS founders.",
  },
  {
    name: "Startup Strategy",
    slug: "startup-strategy",
    description:
      "Founder decision-making, technical leadership, and product execution before and after launch.",
  },
  {
    name: "AI Product Development",
    slug: "ai-product-development",
    description:
      "Trustworthy AI workflows, MVP design, guardrails, and engineering decisions for AI founders.",
  },
  {
    name: "Product Validation",
    slug: "product-validation",
    description:
      "Idea validation, user evidence, product scope, and learning-focused MVP strategy.",
  },
  {
    name: "Startup Scaling",
    slug: "startup-scaling",
    description:
      "Technology choices, product systems, and engineering foundations for growth beyond an MVP.",
  },
] as const;

export type BlogCategory = (typeof blogCategories)[number]["name"];

export function getBlogCategory(slug: string) {
  return blogCategories.find((category) => category.slug === slug);
}

export function getBlogCategoryByName(name: BlogCategory) {
  return blogCategories.find((category) => category.name === name);
}
