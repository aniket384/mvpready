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
import { getLocation, locations } from "@/content/locations";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, landingServiceSchema, webPageSchema } from "@/lib/seo/schema";

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) return {};

  return createMetadata({
    title: location.title,
    description: location.description,
    path: `/locations/${location.slug}`,
    keywords: [location.title, "MVP development agency", "startup app developers"],
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) notFound();

  return (
    <>
      <JsonLd data={landingServiceSchema(location, `/locations/${location.slug}`)} />
      <JsonLd
        data={webPageSchema({
          name: location.title,
          description: location.description,
          path: `/locations/${location.slug}`,
          topics: [location.title, "MVP development", "Startup product engineering"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Locations", url: `${siteConfig.url}/locations` },
          { name: location.title, url: `${siteConfig.url}/locations/${location.slug}` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/locations", label: "Locations" },
          { href: `/locations/${location.slug}`, label: location.title },
        ]}
        eyebrow={location.eyebrow}
        title={location.title}
        description={location.description}
      />
      <AnswerSummary
        title={`${location.title}: delivery summary`}
        summary={location.description}
        audience={location.audience}
        outcomes={location.sections.map((section) => section.heading)}
        label="Market fit"
        outcomeLabel="Delivery priorities"
      />
      <section className="py-20 sm:py-24">
        <Container>
          <p className="mb-12 max-w-3xl text-sm leading-7 text-muted-foreground">
            Northstar Studio provides this work through structured remote collaboration; this page describes founder and market fit rather than a local office presence.
          </p>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <aside>
              <h2 className="text-3xl font-medium">
                Who this is for
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {location.audience}
              </p>
              <div className="mt-8">
                <InternalLinks links={location.links} />
              </div>
            </aside>
            <div className="space-y-10">
              {location.sections.map((section) => (
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
              <p className="text-sm font-medium text-accent">Location FAQ</p>
              <h2 className="mt-3 text-3xl font-medium">
                Common founder questions.
              </h2>
            </div>
            <FaqList faqs={location.faqs} />
          </div>
        </Container>
      </section>
      <CtaBand
        title="Discuss your launch with a senior product partner."
        description="Share your product stage, target customer, and launch milestone. We will respond with a senior-led delivery recommendation."
      />
    </>
  );
}
