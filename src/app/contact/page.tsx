import type { Metadata } from "next";
import { CalendlyButtonLink } from "@/components/booking/calendly-link";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { breadcrumbSchema, schemaGraph, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "Discuss Your MVP Build",
  description:
    "Start a conversation with MVPReady about a premium SaaS MVP, AI MVP, startup app, or product strategy engagement.",
  path: "/contact",
  keywords: ["hire MVP developers", "startup product engineering partner"],
});

export default function ContactPage() {
  const onlineSubmissionEnabled = Boolean(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET,
  );

  return (
    <>
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            name: "Discuss Your MVP Build",
            description:
              "Start a conversation with MVPReady about a premium SaaS MVP, AI MVP, startup app, or product strategy engagement.",
            path: "/contact",
            topics: ["MVP build review", "Startup product engineering partner"],
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Contact", url: `${siteConfig.url}/contact` },
          ]),
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
        eyebrow="Start a conversation"
        title="Discuss the MVP your next milestone depends on."
        description="Share the business context, launch goal, timeline, and constraints. Expect an honest fit assessment, key risk, and a credible next step."
        showActions={false}
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-medium">
                What to expect
              </h2>
              <p className="mt-4 text-muted-foreground">
                This is a strong fit when a serious MVP milestone requires senior
                judgment across strategy, user experience, architecture, engineering, and launch.
              </p>
              <div className="mt-8 divide-y divide-border border-y border-border text-sm text-muted-foreground">
                <p className="py-4">We review your brief against product scope, risk, and delivery fit.</p>
                <p className="py-4">You speak directly with senior product engineering leadership.</p>
                <p className="py-4">Remote collaboration designed for founders in the USA, UK, Europe, UAE, Australia, and Canada.</p>
                <p className="py-4">No obligation and no vague estimate presented without scope context.</p>
              </div>
              <CalendlyButtonLink size="lg" className="mt-8 w-full sm:w-auto">
                Schedule a discovery call
              </CalendlyButtonLink>
            </div>
            <ContactForm onlineSubmissionEnabled={onlineSubmissionEnabled} />
          </div>
        </Container>
      </section>
    </>
  );
}
