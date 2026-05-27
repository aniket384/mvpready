import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { industries } from "@/content/industries";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "MVP Development by Industry",
  description:
    "Premium MVP development for AI, healthcare, SaaS, FinTech, EdTech, and e-commerce startups.",
  path: "/industries",
  keywords: ["MVP for AI startups", "MVP for SaaS", "MVP for FinTech"],
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "MVP Development by Industry",
          description: "Premium MVP development for AI, healthcare, SaaS, FinTech, EdTech, and e-commerce startups.",
          path: "/industries",
          topics: ["AI startup MVP", "SaaS MVP", "FinTech MVP", "Healthcare MVP"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Industries", url: `${siteConfig.url}/industries` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/industries", label: "Industries" },
        ]}
        eyebrow="Industries"
        title="MVP development shaped around your startup category."
        description="Different markets expose different product risks. We shape the first release around trust, workflow clarity, responsible constraints, and credible validation."
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                <Card className="h-full">
                  <p className="text-sm font-medium text-accent">{industry.eyebrow}</p>
                  <h2 className="mt-4 text-2xl font-medium">
                    {industry.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {industry.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Shape an MVP around the risk your market exposes."
        description="We help founders identify the product workflow, trust requirements, and engineering path that deserve investment first."
      />
    </>
  );
}
