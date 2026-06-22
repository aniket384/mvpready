import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/article-card";
import { CategoryNav } from "@/components/blog/category-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { insights } from "@/content/insights";
import { getTags } from "@/lib/blog/posts";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, schemaGraph, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "MVP Development Blog for Startup Founders",
  description:
    "Founder guides on MVP development cost, timelines, startup validation, AI MVPs, and startup technology decisions.",
  path: "/blog",
  keywords: [
    "MVP development blog",
    "MVP development cost",
    "how to build an AI MVP",
    "startup tech stack guide",
  ],
});

export default function BlogPage() {
  const tags = getTags();

  return (
    <>
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            name: "MVP Development Blog for Startup Founders",
            description:
              "Founder guides on MVP development cost, timelines, startup validation, AI MVPs, and startup technology decisions.",
            path: "/blog",
            topics: ["MVP development cost", "AI MVP development", "SaaS architecture", "Startup validation"],
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Blog", url: `${siteConfig.url}/blog` },
          ]),
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
        ]}
        eyebrow="Blog"
        title="Founder guides for building serious startup products."
        description="Practical, AI-search-readable guides for founders evaluating MVP development, SaaS platforms, AI products, technical partners, cost, timelines, and validation."
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <CategoryNav />
          <nav className="mt-8 flex flex-wrap items-center gap-2" aria-label="Article topics">
            <p className="mr-2 text-sm text-muted-foreground">Topics</p>
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {tag.name}
              </Link>
            ))}
          </nav>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {insights.map((insight) => (
              <ArticleCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Turn research into a product decision."
        description="When you know the market problem but need clarity on scope, architecture, or launch readiness, discuss the MVP with a senior engineering partner."
      />
    </>
  );
}
