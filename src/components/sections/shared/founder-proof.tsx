import { Container } from "@/components/ui/container";
import { entityFacts } from "@/content/entity";

export function FounderProof() {
  return (
    <section aria-labelledby="delivery-standard-title" className="border-y border-border bg-muted/35 py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">Delivery standard</p>
          <h2
            id="delivery-standard-title"
            className="mt-3 text-3xl font-medium sm:text-4xl"
          >
            A senior engineering partner built around founder outcomes.
          </h2>
        </div>
        <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {entityFacts.map((fact) => (
            <div key={fact.label} className="bg-background p-5 sm:p-6">
              <dt className="text-sm font-medium text-foreground">{fact.label}</dt>
              <dd className="mt-3 text-sm leading-7 text-muted-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
