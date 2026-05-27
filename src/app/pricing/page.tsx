import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "MVP Development Engagement Models",
  description:
    "Premium MVP development engagement models for founders who need strategy, senior engineering, and launch-ready execution.",
  path: "/pricing",
  keywords: ["MVP development cost", "premium MVP agency pricing"],
});

const models = [
  {
    title: "MVP Sprint",
    description:
      "A focused build for founders with a clear product direction and urgent launch window.",
    fit: "Validate demand, support a pilot, or prepare a serious product demonstration.",
  },
  {
    title: "Startup Engineering Partner",
    description:
      "Ongoing product engineering for SaaS and AI founders who need senior execution across multiple releases.",
    fit: "Continue after validation with accountable product and technical ownership.",
  },
  {
    title: "Product Rescue",
    description:
      "A concentrated engagement to stabilize, refactor, and relaunch a fragile MVP before a critical market moment.",
    fit: "Reduce risk before important customers, fundraising, or team expansion.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "MVP Development Engagement Models",
          description: "Premium MVP development engagement models for founders who need strategy, senior engineering, and launch-ready execution.",
          path: "/pricing",
          topics: ["MVP engagement model", "Product rescue", "Startup engineering partner"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engagements", url: `${siteConfig.url}/pricing` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/pricing", label: "Engagements" },
        ]}
        eyebrow="Engagements"
        title="Premium engagements for founders who care about leverage."
        description="We do not sell cheap development hours. We structure engagements around product clarity, technical quality, speed, and launch outcomes."
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {models.map((model) => (
              <Card key={model.title} className="h-full">
                <h2 className="text-2xl font-medium">{model.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {model.description}
                </p>
                <p className="mt-6 border-t border-border pt-5 text-sm leading-7 text-muted-foreground">
                  <span className="font-medium text-foreground">Best when: </span>
                  {model.fit}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y border-border bg-muted/35 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-accent">Scope clarity</p>
              <h2 className="mt-3 text-3xl font-medium">What a proposal should make clear.</h2>
            </div>
            <div className="divide-y divide-border border-y border-border text-sm leading-7 text-muted-foreground">
              <p className="py-4">The business milestone, core workflow, and release boundary.</p>
              <p className="py-4">Dependencies, technical risks, assumptions, and decisions that could change effort.</p>
              <p className="py-4">Ownership at handoff: source code, deployment, documentation, and next steps.</p>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Find the engagement that protects your next milestone."
        description="Share where the product stands today and what needs to be true after launch. We will recommend an appropriate scope and delivery approach."
      />
    </>
  );
}
