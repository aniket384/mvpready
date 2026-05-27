import { trustIndicators } from "@/content/home";
import { Container } from "@/components/ui/container";

export function TrustSection() {
  return (
    <section aria-label="Trust indicators" className="border-b border-border py-7 sm:py-8">
      <Container size="wide">
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {trustIndicators.map((indicator) => (
            <div
              key={indicator.label}
              className="bg-background px-5 py-5"
            >
              <p className="text-xl font-medium">{indicator.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{indicator.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
