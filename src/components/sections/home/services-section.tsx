import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { services } from "@/content/home";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">What we build</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Product engineering for founders who need more than code.
            </h2>
          </div>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            We focus on the product surfaces that create trust: onboarding, core
            workflows, performance, infrastructure, analytics, and launch readiness.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="block h-full">
              <Card className="h-full min-h-64">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-xs uppercase text-muted-foreground">
                      {service.metric}
                    </p>
                    <h3 className="mt-5 text-2xl font-medium">
                      {service.title}
                    </h3>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <p className="mt-6 text-[15px] leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/services" variant="secondary">
            Explore all services
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
