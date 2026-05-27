import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/content/home";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "MVP and SaaS Product Build Patterns",
  description:
    "Representative MVP, SaaS, AI product, and product rescue build patterns for startup founders.",
  path: "/work",
  keywords: ["MVP case studies", "SaaS product development case studies"],
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Build patterns"
        title="Representative paths for serious product builds."
        description="Patterns that show how we shape MVP, SaaS, AI, and product rescue scope around a founder's next milestone."
      />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.title} className="h-full">
                <p className="font-mono text-xs uppercase text-accent">
                  {study.outcome}
                </p>
                <h2 className="mt-6 text-2xl font-medium">
                  {study.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {study.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
