import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ShareActions } from "@/components/blog/share-actions";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleToc } from "@/components/mdx/article-toc";
import { FaqList } from "@/components/sections/shared/faq-list";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { InternalLinks } from "@/components/sections/shared/internal-links";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getArticleFaqs } from "@/content/entity";
import { getInsight, insights } from "@/content/insights";
import {
  getArticleHeadings,
  getArticleKnowledgeLinks,
  getCategoryHref,
  getRelatedPosts,
  tagSlug,
} from "@/lib/blog/posts";
import { getArticleBody } from "@/lib/mdx/article-registry";
import { createMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema, schemaGraph } from "@/lib/seo/schema";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) return {};

  return createMetadata({
    title: insight.title,
    description: insight.description,
    path: `/blog/${insight.slug}`,
    type: "article",
    publishedTime: insight.publishedAt,
    modifiedTime: insight.updatedAt,
    keywords: [insight.category, ...insight.tags, "MVP development agency", "startup software development"],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) notFound();
  const ArticleBody = getArticleBody(insight.slug);

  if (!ArticleBody) notFound();

  const headings = [
    { id: "founder-summary", label: "Founder summary" },
    ...getArticleHeadings(insight),
    { id: "questions-to-resolve", label: "Questions to resolve" },
  ];
  const relatedPosts = getRelatedPosts(insight);
  const articleFaqs = getArticleFaqs(insight.category);
  const knowledgeLinks = getArticleKnowledgeLinks(insight);
  const canonicalUrl = `${siteConfig.url}/blog/${insight.slug}`;

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={schemaGraph([
          articleSchema(insight),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Blog", url: `${siteConfig.url}/blog` },
            { name: insight.category, url: `${siteConfig.url}${getCategoryHref(insight)}` },
            { name: insight.title, url: `${siteConfig.url}/blog/${insight.slug}` },
          ]),
        ])}
      />
      <article className="py-16 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/blog", label: "Blog" },
              { href: getCategoryHref(insight), label: insight.category },
              { href: `/blog/${insight.slug}`, label: insight.title },
            ]}
          />
          <header className="max-w-3xl">
            <Link
              href={getCategoryHref(insight)}
              className="text-sm font-medium text-accent hover:underline"
            >
              {insight.category}
            </Link>
            <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">
              {insight.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {insight.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>Published {insight.publishedAt}</span>
              <span aria-hidden>/</span>
              <span>Updated {insight.updatedAt}</span>
              <span aria-hidden>/</span>
              <span>{insight.readTime}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tagSlug(tag)}`}
                  className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <ShareActions title={insight.title} url={canonicalUrl} />
            </div>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <ArticleToc items={headings} />
              </div>
            </aside>
            <div className="max-w-3xl" data-article-body>
              <div className="lg:hidden">
                <ArticleToc items={headings} />
              </div>
              <section id="founder-summary" className="scroll-mt-28 rounded-lg border border-border bg-muted/35 p-6">
                <p className="text-sm font-medium text-accent">Founder summary</p>
                <h2 className="mt-3 text-xl font-medium">Key decisions at a glance</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted-foreground">
                  {insight.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </section>
              <div className="article-prose mt-8">
                <ArticleBody />
              </div>
              <section id="questions-to-resolve" className="mt-12 scroll-mt-28 border-y border-border py-8">
                <p className="text-sm font-medium text-accent">Before you build</p>
                <h2 className="mt-3 text-2xl font-medium">Questions a founder should resolve</h2>
                <ol className="mt-6 grid gap-4">
                  {insight.decisions.map((decision, index) => (
                    <li key={decision} className="grid grid-cols-[2.5rem_1fr] gap-3 text-sm leading-7 text-muted-foreground">
                      <span className="font-mono text-accent">0{index + 1}</span>
                      {decision}
                    </li>
                  ))}
                </ol>
              </section>
              <div className="mt-12">
                <InternalLinks title="Related expertise" links={knowledgeLinks} />
              </div>
              <section className="mt-12">
                <p className="text-sm font-medium text-accent">Founder FAQ</p>
                <h2 className="mt-3 text-2xl font-medium">
                  Working with a startup engineering partner
                </h2>
                <div className="mt-6">
                  <FaqList faqs={articleFaqs} />
                </div>
              </section>
            </div>
          </div>
          <RelatedPosts posts={relatedPosts} />
        </Container>
      </article>
      <FounderProof />
      <CtaBand
        title="Apply this guidance to your product."
        description="Discuss the customer workflow, technical uncertainty, and milestone driving your MVP. We will help define the credible next step."
      />
    </>
  );
}
