import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CalendlyButtonLink } from "@/components/booking/calendly-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { auditOfferSchema, breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "The 48-Hour Audit — $199",
  description:
    "Send your AI-built repo, Lovable link, or Bolt project. In 48 hours, get an honest Loom walkthrough and written report on what's broken, what's salvageable, and what it'll cost to finish.",
  path: "/audit",
  keywords: [
    "Lovable code audit",
    "Cursor codebase review",
    "Bolt project audit",
    "AI-built MVP review",
  ],
});

const included = [
  "15–20 minute Loom walkthrough of your code",
  "Written report: what's broken, what's salvageable",
  "Fixed-price quote to finish — credited toward any project",
];

const sendThis = [
  "Repo link or Lovable / Bolt / v0 URL",
  "One paragraph on what the product is",
  "Your pitch date, if you have one",
];

const notIncluded = [
  "Code changes (that's the build phase)",
  "Pitch deck review (different skill)",
  "Promises about whether you'll raise",
];

export default function AuditPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "The 48-Hour Audit — $199",
          description:
            "Honest 48-hour audit of your AI-built MVP. Loom + written report. Credited toward any project.",
          path: "/audit",
          topics: ["MVP audit", "AI codebase review", "Lovable rescue"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "The Audit", url: `${siteConfig.url}/audit` },
        ])}
      />
      <JsonLd data={auditOfferSchema()} />

      <section className="border-b border-border py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              48-hour turnaround · $199 · Credited toward any project
            </p>
            <h1 className="mt-5 text-4xl font-medium leading-[1.05] sm:text-6xl">
              Send me your AI-built project. I&apos;ll tell you the truth in 48 hours.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Before you commit thousands to a build, get an honest 48-hour
              read on what you actually have.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={`mailto:${siteConfig.links.email}?subject=$199 Audit request&body=Hi Aniket,%0D%0A%0D%0AProject link or repo:%0D%0A%0D%0AOne paragraph about the product:%0D%0A%0D%0APitch / demo date (if any):%0D%0A%0D%0A`}
                size="lg"
              >
                Email Aniket to start
                <ArrowRight size={17} />
              </ButtonLink>
              <CalendlyButtonLink size="lg" variant="secondary">
                Schedule a call
              </CalendlyButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Payment via Stripe link after the project intro reply. No deposit needed until then.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-accent">What you get</p>
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">In your inbox within 48 hours.</h2>
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
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">Send these five things.</h2>
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
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">What the audit isn&apos;t.</h2>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                The audit is an engineering verdict. It doesn&apos;t pretend
                to be other things.
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
                If you want to finish the build, the $199 comes off the price.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">
                Audits convert into either a 2-week Demo-Ready Sprint ($7,500)
                or a 4-week Investor-Ready MVP ($19,500). If the code is
                unsalvageable, the audit credit applies to a fresh build instead.
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
              <p className="text-sm font-medium text-foreground">A note on capacity</p>
              <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                I take two active build projects at a time and a small number
                of audits per week. If the calendar is full when you write,
                you&apos;ll be told within a few hours — not after the deposit.
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
