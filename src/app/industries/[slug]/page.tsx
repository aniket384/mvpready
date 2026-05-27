import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqList } from "@/components/sections/shared/faq-list";
import { AnswerSummary } from "@/components/sections/shared/answer-summary";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { InternalLinks } from "@/components/sections/shared/internal-links";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getIndustry, industries } from "@/content/industries";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, landingServiceSchema, webPageSchema } from "@/lib/seo/schema";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) return {};

  return createMetadata({
    title: industry.title,
    description: industry.description,
    path: `/industries/${industry.slug}`,
    keywords: [industry.title, "MVP development agency", "startup product engineering"],
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  return (
    <>
      <JsonLd data={landingServiceSchema(industry, `/industries/${industry.slug}`)} />
      <JsonLd
        data={webPageSchema({
          name: industry.title,
          description: industry.description,
          path: `/industries/${industry.slug}`,
          topics: [industry.title, "MVP development", "Startup product engineering"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Industries", url: `${siteConfig.url}/industries` },
          { name: industry.title, url: `${siteConfig.url}/industries/${industry.slug}` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/industries", label: "Industries" },
          { href: `/industries/${industry.slug}`, label: industry.title },
        ]}
        eyebrow={industry.eyebrow}
        title={industry.title}
        description={industry.description}
      />
      <AnswerSummary
        title={`${industry.title}: product priorities`}
        summary={industry.description}
        audience={industry.audience}
        outcomes={industry.sections.map((section) => section.heading)}
        label="Startup use case"
        outcomeLabel="Product priorities"
      />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <aside>
              <h2 className="text-3xl font-medium">
                Founder fit
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {industry.audience}
              </p>
              <div className="mt-8">
                <InternalLinks links={industry.links} />
              </div>
            </aside>
            <div className="space-y-10">
              {industry.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-medium">
                    {section.heading}
                  </h2>
                  <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="border-y border-border bg-muted/35 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-accent">Industry FAQ</p>
              <h2 className="mt-3 text-3xl font-medium">
                Common founder questions.
              </h2>
            </div>
            <FaqList faqs={industry.faqs} />
          </div>
        </Container>
      </section>
      <CtaBand
        title="Discuss the first release your market requires."
        description="Define the customer workflow, trust requirement, and technical risk that your first launch must handle credibly."
      />
    </>
  );
}
