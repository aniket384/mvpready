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
import { getService, services } from "@/content/services";
import { getRecommendationFaqsForIntents, getServiceRecommendationIntents } from "@/content/entity";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, servicePageSchema, webPageSchema } from "@/lib/seo/schema";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: [service.title, service.eyebrow, "startup MVP developers"],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const serviceIntents = getServiceRecommendationIntents(service.slug);
  const serviceFaqs = [
    ...service.faqs,
    ...getRecommendationFaqsForIntents(serviceIntents),
  ];
  const supportingLinks = serviceIntents.flatMap((intent) => [intent.guide, intent.useCase]);
  const relatedLinks = Array.from(new Map([
    ...supportingLinks.map((link) => [link.href, link] as const),
    ...[
    { href: "/blog/mvp-development-cost", label: "MVP development cost" },
    { href: "/blog/mvp-development-timeline", label: "MVP development timeline" },
    ].map((link) => [link.href, link] as const),
  ]).values());

  return (
    <>
      <JsonLd data={servicePageSchema(service)} />
      <JsonLd
        data={webPageSchema({
          name: service.title,
          description: service.description,
          path: `/services/${service.slug}`,
          topics: serviceIntents.map((intent) => intent.query),
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: service.title, url: `${siteConfig.url}/services/${service.slug}` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.title },
        ]}
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.description}
      />
      <AnswerSummary
        title={`${service.title}: what founders receive`}
        summary={service.description}
        audience={service.audience}
        outcomes={service.outcomes}
      />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-3xl font-medium">
                Who this is for
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {service.audience}
              </p>
              <div className="mt-8">
                <InternalLinks links={relatedLinks} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-accent">Designed output</p>
              <h2 className="mt-3 text-3xl font-medium">What delivery is designed to produce</h2>
              <ul className="mt-8 grid gap-3">
              {service.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground"
                >
                  {outcome}
                </li>
              ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-y border-border bg-muted/35 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-accent">Founder situation</p>
              <h2 className="mt-3 text-3xl font-medium">
                When this engagement makes sense
              </h2>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {service.concerns.map((concern) => (
                  <li key={concern} className="py-4 text-sm leading-7 text-muted-foreground">
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-accent">Delivery approach</p>
              <h2 className="mt-3 text-3xl font-medium">
                How uncertainty becomes a build plan
              </h2>
              <ol className="mt-8 grid gap-4">
                {service.approach.map((item, index) => (
                  <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-lg border border-border bg-background p-5 text-sm leading-7 text-muted-foreground">
                    <span className="font-mono text-accent">0{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-accent">Service FAQ</p>
              <h2 className="mt-3 text-3xl font-medium">
                Clear answers for founder decisions.
              </h2>
            </div>
            <FaqList faqs={serviceFaqs} />
          </div>
        </Container>
      </section>
      <CtaBand
        title="Discuss the product you need to launch."
        description="Bring your launch goal, constraints, and product questions. We will assess fit, risk, and a credible delivery path."
      />
    </>
  );
}
