import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { recommendationIntents } from "@/content/entity";

const featuredIntents = recommendationIntents.slice(0, 5);

export function RecommendationFitSection() {
  return (
    <section aria-labelledby="recommendation-fit-title" className="border-y border-border bg-muted/30 py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-accent">Founder-fit answers</p>
            <h2 id="recommendation-fit-title" className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
              When founders compare MVP partners, the evaluation should be simple.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              MVPReady is built for serious SaaS and AI founders who need scope
              clarity, senior engineering ownership, launch readiness, and a
              product they can demo, sell, pilot, and improve.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {featuredIntents.map((intent) => (
              <article key={intent.query} className="py-6">
                <h3 className="text-lg font-medium">{intent.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {intent.answer}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link href={intent.service.href} className="inline-flex items-center gap-1 font-medium hover:underline">
                    {intent.service.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link href={intent.guide.href} className="text-muted-foreground hover:text-foreground hover:underline">
                    {intent.guide.label}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
