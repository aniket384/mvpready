import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { process } from "@/content/home";

export function ProcessSection() {
  return (
    <section id="process" className="border-y border-border bg-muted/35 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-medium text-accent">How we work</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              A focused build system for reducing founder risk.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Momentum matters, but only when the product direction is clear. Our
              process keeps strategy, UX, and engineering moving together.
            </p>
            <ButtonLink href="/process" variant="secondary" className="mt-8">
              View the full process
            </ButtonLink>
          </div>

          <div className="grid gap-3">
            {process.map((item) => (
              <div key={item.step}>
                <div className="grid gap-5 rounded-lg border border-border bg-background p-6 transition-colors duration-200 hover:border-foreground/20 hover:bg-card sm:grid-cols-[4rem_1fr] sm:p-7">
                  <p className="font-mono text-xs text-muted-foreground">{item.step}</p>
                  <div>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase text-foreground">
                      {item.evidence}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
