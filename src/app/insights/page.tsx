import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { insights } from "@/content/insights";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Startup MVP Development Insights",
  description:
    "Founder guides on MVP development, AI MVPs, SaaS product engineering, and choosing a startup software development partner.",
  path: "/insights",
  keywords: ["MVP development blog", "startup software development guides"],
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Clear thinking for founders before the build."
        description="Guides designed for startup founders evaluating MVP development agencies, AI product builds, SaaS platforms, and technical partners."
      />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {insights.map((insight) => (
              <Card key={insight.slug} className="flex h-full flex-col">
                <p className="text-sm font-medium text-accent">{insight.category}</p>
                <h2 className="mt-4 text-2xl font-medium">
                  {insight.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {insight.description}
                </p>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium hover:underline"
                >
                  Read guide
                  <ArrowRight size={15} />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
