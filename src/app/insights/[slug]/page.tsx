import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getInsight, insights } from "@/content/insights";
import { createMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) {
    return {};
  }

  return createMetadata({
    title: insight.title,
    description: insight.description,
    path: `/insights/${insight.slug}`,
    type: "article",
    publishedTime: insight.publishedAt,
    keywords: [insight.category, "MVP development agency", "startup software development"],
  });
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleSchema(insight)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Insights", url: `${siteConfig.url}/insights` },
          { name: insight.title, url: `${siteConfig.url}/insights/${insight.slug}` },
        ])}
      />
      <article className="py-20 sm:py-24">
        <Container size="narrow">
          <p className="text-sm font-medium text-accent">{insight.category}</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">
            {insight.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {insight.description}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Published {insight.publishedAt} / {insight.readTime}
          </p>
          <div className="mt-12 space-y-10">
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-medium">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </article>
    </>
  );
}
