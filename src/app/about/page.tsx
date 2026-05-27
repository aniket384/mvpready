import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "About Northstar Studio",
  description:
    "Northstar Studio is a premium startup engineering partner for founders building MVPs, SaaS platforms, and AI products.",
  path: "/about",
  keywords: ["startup engineering partner", "premium software development agency"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "About Northstar Studio",
          description: "Northstar Studio is a premium startup engineering partner for founders building MVPs, SaaS platforms, and AI products.",
          path: "/about",
          topics: ["Startup product engineering", "MVP development partner", "AI product development"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
        eyebrow="About"
        title="Senior product engineering for founders with serious ambition."
        description="Northstar Studio exists for founders who want a thoughtful engineering partner, not a task-taking outsourcing layer."
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-3xl text-lg leading-8 text-muted-foreground">
              <h2 className="text-3xl font-medium text-foreground">Built for the moment software becomes consequential.</h2>
              <p className="mt-5">
                We build MVPs, SaaS products, and AI software with a bias toward
                clarity, speed, product taste, and technical decisions that remain
                understandable after the first launch.
              </p>
              <p className="mt-6">
                This work matters when a pilot, funding process, first paying
                customer, or product rescue makes vague delivery unacceptable.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-accent">Working commitments</p>
              <div className="mt-5 divide-y divide-border border-y border-border text-sm leading-7 text-muted-foreground">
                <p className="py-4">Product and technical tradeoffs explained in founder language.</p>
                <p className="py-4">Scope decisions linked to launch goals, cost, and learning value.</p>
                <p className="py-4">Repository, deployment, and documentation ownership made explicit.</p>
                <p className="py-4">Delivery commitments stated plainly, without promises a product brief cannot justify.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Work directly with senior product engineering."
        description="Discuss an MVP, SaaS platform, or AI product where clear judgment and launch quality are business-critical."
      />
    </>
  );
}
