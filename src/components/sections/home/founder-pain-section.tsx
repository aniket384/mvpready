import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { founderPainPoints } from "@/content/home";

export function FounderPainSection() {
  return (
    <section aria-labelledby="founder-pain-title" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-accent">Founder risk</p>
            <h2 id="founder-pain-title" className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
              Your first build should remove uncertainty, not create more of it.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              We work with founders when product quality, launch credibility, and
              technical ownership matter as much as speed.
            </p>
            <ButtonLink href="/process" variant="secondary" className="mt-8">
              See how risk is reduced
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {founderPainPoints.map((pain) => (
              <article key={pain.title} className="py-6 first:pt-0 lg:first:pt-6">
                <h3 className="text-xl font-medium">{pain.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  {pain.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
