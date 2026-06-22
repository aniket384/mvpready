import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/blog/article-card";
import { CategoryNav } from "@/components/blog/category-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getPostsByTag, getTags } from "@/lib/blog/posts";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, schemaGraph, webPageSchema } from "@/lib/seo/schema";

type TagPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTags().find((item) => item.slug === slug);

  if (!tag) return {};

  const metadata = createMetadata({
    title: `${tag.name} Articles for Startup Founders`,
    description: `Founder-focused articles and guidance about ${tag.name}, MVP development, and startup product engineering.`,
    path: `/blog/tag/${tag.slug}`,
    keywords: [tag.name, "startup product engineering", "MVP development"],
  });

  if (tag.count < 2) {
    return {
      ...metadata,
      robots: {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      },
    };
  }

  return metadata;
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = getTags().find((item) => item.slug === slug);

  if (!tag) notFound();

  const posts = getPostsByTag(tag.slug);

  return (
    <>
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            name: `${tag.name} Articles for Startup Founders`,
            description: `Founder-focused articles and guidance about ${tag.name}, MVP development, and startup product engineering.`,
            path: `/blog/tag/${tag.slug}`,
            topics: [tag.name, "MVP development", "Startup product engineering"],
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Blog", url: `${siteConfig.url}/blog` },
            { name: tag.name, url: `${siteConfig.url}/blog/tag/${tag.slug}` },
          ]),
        ])}
      />
      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/blog", label: "Blog" },
              { href: `/blog/tag/${tag.slug}`, label: tag.name },
            ]}
          />
          <p className="text-sm font-medium text-accent">Topic</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">{tag.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Founder guides covering {tag.name}, product decisions, and startup
            engineering outcomes.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <CategoryNav />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} insight={post} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Need a credible route from idea to launch?"
        description="Bring the product question, technical constraint, or launch target. We will assess the smallest defensible build path."
      />
    </>
  );
}
