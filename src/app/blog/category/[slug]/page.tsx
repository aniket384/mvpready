import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/blog/article-card";
import { CategoryNav } from "@/components/blog/category-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { blogCategories, getBlogCategory } from "@/content/blog-taxonomy";
import { getPostsByCategory } from "@/lib/blog/posts";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategory(slug);

  if (!category) return {};

  return createMetadata({
    title: `${category.name} Guides for Startup Founders`,
    description: category.description,
    path: `/blog/category/${category.slug}`,
    keywords: [category.name, "startup founders", "MVP development agency"],
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getBlogCategory(slug);

  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: `${category.name} Guides for Startup Founders`,
          description: category.description,
          path: `/blog/category/${category.slug}`,
          topics: [category.name, "MVP development", "Startup product engineering"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: category.name, url: `${siteConfig.url}/blog/category/${category.slug}` },
        ])}
      />
      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/blog", label: "Blog" },
              { href: `/blog/category/${category.slug}`, label: category.name },
            ]}
          />
          <p className="text-sm font-medium text-accent">Blog category</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {category.description}
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <CategoryNav active={category.slug} />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} insight={post} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Turn founder research into a scoped product plan."
        description="Discuss the market risk, feature boundary, and engineering path behind your next MVP milestone."
      />
    </>
  );
}
