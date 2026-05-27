import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CaseStudyCard } from "@/components/sections/work/case-study-card";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/content/home";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "MVP and SaaS Product Build Patterns",
  description:
    "Representative MVP, SaaS, AI product, and product rescue build patterns for startup founders evaluating a product partner.",
  path: "/case-studies",
  keywords: [
    "MVP product build patterns",
    "SaaS product development case studies",
    "AI MVP case studies",
  ],
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "MVP and SaaS Product Build Patterns",
          description: "Representative MVP, SaaS, AI product, and product rescue build patterns for startup founders evaluating a product partner.",
          path: "/case-studies",
          topics: ["MVP delivery pattern", "SaaS product delivery", "AI product workflow"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/case-studies", label: "Build Patterns" },
        ]}
        eyebrow="Build patterns"
        title="Representative paths for serious product builds."
        description="A premium MVP should create momentum toward investor demos, pilots, early customers, or a product foundation ready for scale. These patterns show the scope and standard we design for."
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <CaseStudyCard
                key={study.title}
                title={study.title}
                description={study.description}
                outcome={study.outcome}
              />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Discuss a comparable product path."
        description="Tell us whether your priority is validation, SaaS activation, AI workflow trust, or stabilizing an existing build."
      />
    </>
  );
}
