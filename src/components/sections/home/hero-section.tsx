import { ArrowRight, CheckCircle2, Sparkle } from "lucide-react";
import { CalendlyButtonLink } from "@/components/booking/calendly-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const proof = [
  "Premium startup engineering partner",
  "SaaS and AI MVP development",
  "Built for USA, UK, Europe, UAE, Australia, and Canada",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <Container className="py-16 sm:py-20 lg:py-28" size="wide">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-4xl">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkle className="h-3.5 w-3.5 text-accent" />
                MVPReady - From Idea to MVP
              </p>
              <h1 className="max-w-4xl text-4xl font-medium leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
                Launch a scalable MVP with senior product engineering.
              </h1>
            </div>
            <div className="intro-rise" style={{ "--intro-delay": "80ms" } as React.CSSProperties}>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                MVPReady helps SaaS and AI founders turn product ideas,
                prototypes, and early traction into focused MVPs built for
                pilots, customers, investors, and the next product iteration.
              </p>
            </div>
            <div className="intro-rise" style={{ "--intro-delay": "140ms" } as React.CSSProperties}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/audit" size="lg" className="w-full sm:w-auto">
                  Plan your MVP
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink
                  href="#services"
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Explore engagements
                </ButtonLink>
                <CalendlyButtonLink size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule a call
                </CalendlyButtonLink>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Strategy, design, engineering, launch readiness, and clean handoff in one senior-led engagement.
              </p>
            </div>
            <div className="intro-rise" style={{ "--intro-delay": "190ms" } as React.CSSProperties}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
                {proof.map((item) => (
                  <div key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="intro-rise" style={{ "--intro-delay": "200ms" } as React.CSSProperties}>
            <div className="relative rounded-lg border border-border bg-card p-3 shadow-lg shadow-black/[0.04] dark:shadow-black/30">
            <div className="rounded-lg border border-border bg-background p-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-sm font-medium">MVP operating plan</p>
                  <p className="mt-1 text-xs text-muted-foreground">Idea to launch</p>
                </div>
                <span className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                  Focused path
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {[
                  ["01", "Define", "Scope, users, launch risk, and technical path"],
                  ["02", "Build", "Product flows, architecture, integrations, and analytics"],
                  ["03", "Launch", "Deployment, handoff, iteration plan, and ownership"],
                ].map(([step, title, text]) => (
                  <div
                    key={step}
                    className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-lg border border-border bg-muted/35 p-4"
                  >
                    <span className="font-mono text-xs text-muted-foreground">{step}</span>
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
                {[
                  ["SaaS", "MVPs"],
                  ["AI", "Products"],
                  ["Global", "Markets"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-lg font-medium">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
