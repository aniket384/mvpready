import { ArrowRight, CheckCircle2, Sparkle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const proof = [
  "Scope clarity before engineering",
  "Direct senior collaboration",
  "Launch-ready SaaS and AI products",
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
                Premium startup engineering partner
              </p>
              <h1 className="max-w-4xl text-4xl font-medium leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
                Launch an MVP customers trust and investors take seriously.
              </h1>
            </div>
            <div className="intro-rise" style={{ "--intro-delay": "80ms" } as React.CSSProperties}>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Senior-led MVP, SaaS, and AI product engineering for founders who
                cannot afford wasted runway, unclear scope, or a product that fails
                at the first serious conversation.
              </p>
            </div>
            <div className="intro-rise" style={{ "--intro-delay": "140ms" } as React.CSSProperties}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
                  Discuss your MVP
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink
                  href="/case-studies"
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Review build patterns
                </ButtonLink>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Initial review covers product goal, scope risk, launch target, and technical path.
              </p>
            </div>
            <div className="intro-rise" style={{ "--intro-delay": "190ms" } as React.CSSProperties}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                  <p className="mt-1 text-xs text-muted-foreground">Week 01 to launch</p>
                </div>
                <span className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                  Planned path
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {[
                  ["01", "Market proof", "Positioning, ICP, founder narrative"],
                  ["02", "Core product", "UX flows, architecture, build cycles"],
                  ["03", "Launch trust", "Performance, SEO, analytics, handoff"],
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
                  ["6-10w", "MVP window"],
                  ["Senior", "Build team"],
                  ["Static", "Fast pages"],
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
