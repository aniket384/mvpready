import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { deliveryPrinciples } from "@/content/home";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">Operating principles</p>
          <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            The standard we bring to high-stakes product work.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {deliveryPrinciples.map((principle) => (
            <div key={principle.quote}>
              <Card className="h-full">
                <p className="text-lg leading-8 text-foreground">
                  {principle.quote}
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-sm font-medium">{principle.author}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{principle.role}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
