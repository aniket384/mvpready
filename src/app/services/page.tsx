import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/shared/page-hero";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { AuthorityMapSection } from "@/components/sections/home/authority-map-section";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { createMetadata } from "@/lib/seo/metadata";
import { authorityTopicsSchema, breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "Startup MVP, SaaS, and AI Product Development Services",
  description:
    "Premium MVP development, SaaS product engineering, and AI MVP development services for startup founders globally.",
  path: "/services",
  keywords: [
    "MVP development services",
    "SaaS MVP agency",
    "AI MVP development company",
    "startup software development company",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema()} />
      <JsonLd data={authorityTopicsSchema()} />
      <JsonLd
        data={webPageSchema({
          name: "Startup MVP, SaaS, and AI Product Development Services",
          description: "Premium MVP development, SaaS product engineering, and AI MVP development services for startup founders globally.",
          path: "/services",
          topics: ["MVP development", "SaaS product engineering", "AI MVP development"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
        eyebrow="Services"
        title="Premium product engineering services for serious founders."
        description="Choose the build path that matches your startup stage: focused MVP, scalable SaaS platform, practical AI product, or product rescue."
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} className="flex h-full flex-col">
                <p className="text-sm font-medium text-accent">{service.eyebrow}</p>
                <h2 className="mt-4 text-2xl font-medium">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium hover:underline"
                >
                  Explore service
                  <ArrowRight size={15} />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <AuthorityMapSection />
      <CtaBand
        title="Choose a build path with senior judgment behind it."
        description="Share your product goal, launch milestone, and main uncertainty. We will identify the clearest next step for an MVP, SaaS platform, or AI product."
      />
    </>
  );
}
