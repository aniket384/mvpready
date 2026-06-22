import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CalendlyButtonLink } from "@/components/booking/calendly-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { auditOfferSchema, breadcrumbSchema, schemaGraph, webPageSchema } from "@/lib/seo/schema";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "MVP Strategy Sprint",
  description:
    "Clarify your MVP scope, technical risks, launch path, and product priorities before investing in a full SaaS or AI product build.",
  path: "/audit",
  keywords: [
    "MVP strategy sprint",
    "MVP technical audit",
    "startup product strategy",
    "MVP scope planning",
  ],
});

const included = [
  "MVP scope map and first-release boundary",
  "Technical risk review across stack, integrations, data, and AI workflows",
  "Build recommendation with a credible delivery path",
];

const sendThis = [
  "Product idea, prototype, repo, or current product link",
  "Target customer and primary workflow",
  "Launch goal, timeline, and business constraint",
];

const notIncluded = [
  "Cheap feature estimation without product context",
  "Pitch deck review as a standalone service",
  "Promises about fundraising, revenue, or market demand",
];

export default function AuditPage() {
  return (
    <>
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            name: "MVP Strategy Sprint",
            description:
              "MVP scope, risk, and delivery planning for SaaS and AI founders before a full product build.",
            path: "/audit",
            topics: ["MVP strategy", "Technical risk review", "SaaS and AI product planning"],
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Strategy Sprint", url: `${siteConfig.url}/audit` },
          ]),
          auditOfferSchema(),
        ])}
      />

      <section className="border-b border-border py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              MVP scope · Technical risk · Launch path
            </p>
            <h1 className="mt-5 text-4xl font-medium leading-[1.05] sm:text-6xl">
              Make the MVP build clear before you spend serious money.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Before engineering accelerates, clarify what to build, what to
              defer, what can break, and what the first launch must prove.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={`mailto:${siteConfig.links.email}?subject=MVP strategy sprint request&body=Hi MVPReady,%0D%0A%0D%0AProduct idea or link:%0D%0A%0D%0ATarget customer:%0D%0A%0D%0ALaunch goal and timeline:%0D%0A%0D%0A`}
                size="lg"
              >
                Email MVPReady to start
                <ArrowRight size={17} />
              </ButtonLink>
              <CalendlyButtonLink size="lg" variant="secondary">
                Schedule a call
              </CalendlyButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              If the project is a fit, the strategy sprint leads into a focused MVP build plan.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-accent">What you get</p>
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">A clearer build path.</h2>
              <ul className="mt-8 space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-accent">What I need from you</p>
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">Send these inputs.</h2>
              <ul className="mt-8 space-y-4">
                {sendThis.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/35 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-accent">Not in scope</p>
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">What the sprint isn&apos;t.</h2>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                The sprint is a product and engineering decision tool. It
                does not pretend to guarantee market outcomes.
              </p>
            </div>
            <ul className="space-y-4 rounded-lg border border-border bg-background p-6">
              {notIncluded.map((item) => (
                <li key={item} className="text-[15px] leading-7 text-muted-foreground">
                  — {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-accent">What happens next</p>
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
                If the direction is right, the next step is a focused MVP build.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">
                The output can become a SaaS MVP, AI MVP, startup app, or
                product design and engineering engagement with explicit scope.
              </p>
              <CalendlyButtonLink
                size="lg"
                variant="secondary"
                className="mt-8"
              >
                Schedule a call
              </CalendlyButtonLink>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm font-medium text-foreground">A note on fit</p>
              <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                MVPReady is built for serious founders who want clarity,
                ownership, and premium execution from a strategic product
                engineering partner.
              </p>
              <p className="mt-5 text-sm">
                <Link
                  href="/about"
                  className="text-foreground underline underline-offset-4 hover:opacity-70"
                >
                  Read who&apos;s behind this →
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
