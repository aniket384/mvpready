import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { differentiators } from "@/content/home";

export function WhyChooseUsSection() {
  return (
    <section className="border-y border-border bg-muted/35 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-accent">Why founders choose us</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              The right MVP is not the fastest pile of features.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              It is the smallest serious product that proves the business, earns
              user trust, and gives you a technical base you do not regret.
            </p>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Engineering foundation: React, Next.js, TypeScript, Vercel, APIs,
              analytics, performance discipline, and AI integration patterns.
            </p>
          </div>

          <div className="grid gap-3">
            {differentiators.map((item) => (
              <div key={item}>
                <div className="flex gap-3 rounded-lg border border-border bg-background p-4 text-[15px] leading-6 text-muted-foreground transition-colors duration-200 hover:border-foreground/20 hover:bg-card">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
