import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { process } from "@/content/home";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "Startup MVP Development Process",
  description:
    "A premium MVP development process for founders: diagnose, design, build, launch, and iterate with senior product engineering judgment.",
  path: "/process",
  keywords: ["MVP development process", "startup product engineering process"],
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Startup MVP Development Process",
          description: "A premium MVP development process for founders: diagnose, design, build, launch, and iterate with senior product engineering judgment.",
          path: "/process",
          topics: ["MVP development process", "Startup product delivery", "Launch readiness"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Process", url: `${siteConfig.url}/process` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/process", label: "Process" },
        ]}
        eyebrow="Process"
        title="A calm operating system for high-stakes product builds."
        description="Our process keeps founder decisions, product strategy, UX, engineering, and launch readiness moving together."
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-4">
            {process.map((item) => (
              <article
                key={item.step}
                className="grid gap-5 rounded-lg border border-border bg-card p-6 sm:grid-cols-[5rem_1fr] sm:p-8"
              >
                <p className="font-mono text-sm text-accent">{item.step}</p>
                <div>
                  <h2 className="text-2xl font-medium">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase text-foreground">
                    {item.evidence}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y border-border bg-muted/35 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-accent">Founder confidence</p>
              <h2 className="mt-3 text-3xl font-medium">No silent build. No vague handoff.</h2>
            </div>
            <div className="divide-y divide-border border-y border-border text-sm leading-7 text-muted-foreground">
              <p className="py-4">Working product reviews expose progress and scope decisions early.</p>
              <p className="py-4">Technical tradeoffs are explained against business risk and runway.</p>
              <p className="py-4">Launch readiness includes ownership, documentation, analytics, and deployment clarity.</p>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Start with product clarity, then build."
        description="Share the milestone driving your timeline. We will identify the scope and technical risks that should be resolved first."
      />
    </>
  );
}
