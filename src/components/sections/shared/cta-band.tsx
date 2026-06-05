import { ArrowRight } from "lucide-react";
import { CalendlyButtonLink } from "@/components/booking/calendly-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaBand({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="pb-20 sm:pb-24" aria-label="Project inquiry">
      <Container>
        <div className="rounded-lg border border-border bg-foreground p-7 text-background sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-3xl font-medium">{title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 opacity-75">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <CalendlyButtonLink size="lg" className="w-full bg-background text-foreground sm:w-auto">
                Schedule a call
              </CalendlyButtonLink>
              <ButtonLink href="/contact" size="lg" variant="secondary" className="w-full border-background/20 bg-transparent text-background hover:bg-background/10 sm:w-auto">
                Send brief
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
