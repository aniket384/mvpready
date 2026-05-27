import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "Terms",
  description:
    "Terms for using the Northstar Studio website and discussing MVP development, SaaS, AI product, and product engineering services.",
  path: "/terms",
  keywords: ["terms"],
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Terms", url: `${siteConfig.url}/terms` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/terms", label: "Terms" },
        ]}
        eyebrow="Terms"
        title="Terms of Use"
        description="These terms describe the basic conditions for using this website and contacting Northstar Studio about potential product engineering work."
        showActions={false}
      />
      <section className="py-20 sm:py-24">
        <Container size="narrow">
          <div className="space-y-10 text-base leading-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-medium text-foreground">
                Website content
              </h2>
              <p className="mt-4">
                Website content is provided for general information and does not
                create a client relationship, legal advice, financial advice, or a
                guaranteed project outcome.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-medium text-foreground">
                Engagements
              </h2>
              <p className="mt-4">
                Any product engineering engagement requires a separate written
                agreement covering scope, timeline, fees, ownership, confidentiality,
                and responsibilities.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-medium text-foreground">
                No guarantee
              </h2>
              <p className="mt-4">
                We aim to build high-quality products, but startup outcomes depend on
                market demand, founder decisions, distribution, operations, and other
                factors outside development alone.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
