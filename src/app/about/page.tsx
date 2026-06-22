import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema, schemaGraph, webPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";
import { founderBio } from "@/content/home";

export const metadata: Metadata = createMetadata({
  title: "About MVPReady",
  description:
    "MVPReady is a premium startup engineering partner helping SaaS and AI founders launch scalable MVPs with strategy, design, engineering, and launch readiness.",
  path: "/about",
  keywords: ["MVPReady", "premium MVP development agency", "startup engineering partner"],
});

const work = [
  {
    title: "MVP clarity before engineering",
    body: "Product scope, user journey, technical risk, and launch path are defined before the build accelerates.",
  },
  {
    title: "SaaS and AI product focus",
    body: "MVPReady builds onboarding, workflows, AI outputs, payments, dashboards, analytics, and launch-ready product surfaces.",
  },
  {
    title: "Global founder collaboration",
    body: "Structured remote delivery for serious founders in the USA, UK, Europe, UAE, Australia, and Canada.",
  },
];

const principles = [
  {
    title: "Senior judgment stays close to the work.",
    body: "MVPReady does not sell a cheap outsourcing layer. Product and engineering decisions remain direct and accountable.",
  },
  {
    title: "Scope is explicit.",
    body: "Every engagement needs a clear boundary around what is included, what is deferred, and what creates additional cost.",
  },
  {
    title: "Communication is calm and founder-readable.",
    body: "Technical tradeoffs are explained in plain language so founders know what is happening and why.",
  },
  {
    title: "Launch readiness is part of the build.",
    body: "Deployment, analytics, documentation, ownership, and the next iteration path are treated as product work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            name: "About MVPReady",
            description: founderBio.intro,
            path: "/about",
            topics: ["MVPReady", "MVP development", "Startup product engineering"],
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "About", url: `${siteConfig.url}/about` },
          ]),
          personSchema(),
        ])}
      />

      <section className="border-b border-border py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent">About</p>
            <h1 className="mt-3 text-4xl font-medium leading-tight sm:text-6xl">
              MVPReady helps founders move from idea to MVP.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {founderBio.intro}
            </p>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {founderBio.why}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/audit" size="lg">
                Plan the MVP
                <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink
                href={founderBio.linkedin}
                size="lg"
                variant="secondary"
              >
                LinkedIn
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {founderBio.location}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-medium text-accent">Why MVPReady</p>
              <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
                Built for launch-critical MVP decisions.
              </h2>
              <p className="mt-5 text-[15px] leading-7 text-muted-foreground">
                MVPReady is designed for founders who need more than a feature
                factory: clear scope, product taste, scalable engineering, and
                a reliable launch path.
              </p>
            </div>
            <div className="grid gap-4">
              {work.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-border bg-background p-6 sm:p-7"
                >
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/35 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-medium text-accent">How I work</p>
              <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
                Four operating principles behind the work.
              </h2>
            </div>
            <div className="grid gap-4">
              {principles.map((p) => (
                <article
                  key={p.title}
                  className="rounded-lg border border-border bg-background p-6 sm:p-7"
                >
                  <h3 className="text-xl font-medium">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 rounded-lg border border-border bg-foreground p-8 text-background sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div>
              <p className="text-sm font-medium opacity-70">Next step</p>
              <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
                Bring the idea. Leave with a credible MVP path.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 opacity-75">
                We will help clarify what to build first, what to avoid, what
                the product needs technically, and how to launch without
                wasting founder runway.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end lg:justify-end">
              <ButtonLink
                href="/audit"
                size="lg"
                className="bg-background text-foreground hover:opacity-90"
              >
                Start the strategy sprint
                <ArrowRight size={17} />
              </ButtonLink>
              <Link
                href={`mailto:${siteConfig.links.email}`}
                className="text-sm opacity-75 underline underline-offset-4 hover:opacity-100"
              >
                Or email MVPReady directly
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
