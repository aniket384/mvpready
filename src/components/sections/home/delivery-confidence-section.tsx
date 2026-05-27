import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { deliveryConfidence } from "@/content/home";

export function DeliveryConfidenceSection() {
  return (
    <section aria-labelledby="confidence-title" className="border-y border-border bg-muted/35 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-accent">Delivery confidence</p>
          <h2 id="confidence-title" className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
            Know what is being built, why it matters, and what you own at launch.
          </h2>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
          {deliveryConfidence.map((item) => (
            <article key={item.title} className="bg-background p-6 sm:p-7">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <h3 className="mt-5 text-xl font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-muted-foreground">
          Technical foundation: Next.js, React, TypeScript, Vercel deployment, analytics,
          modern API integrations, and practical AI workflows where they create customer value.
        </p>
      </Container>
    </section>
  );
}
