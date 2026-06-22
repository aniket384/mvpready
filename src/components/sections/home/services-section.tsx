import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { services } from "@/content/home";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">Pricing</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Three ways to work together. Fixed scope, fixed price.
            </h2>
          </div>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Most founders start with the audit. It tells you what you actually need.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="h-full">
              <Card className="h-full min-h-64">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-xs uppercase text-muted-foreground">
                      {service.metric}
                    </p>
                    <h3 className="mt-5 text-2xl font-medium">
                      <Link href={service.href} className="hover:underline">
                        {service.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    href={service.href}
                    aria-label={`Discuss ${service.title}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <p className="mt-6 text-[15px] leading-7 text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2" aria-label={`${service.title} topics`}>
                  {service.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link href={service.guideHref} className="mt-6 inline-flex text-sm font-medium text-foreground underline underline-offset-4">
                  Read the founder guide:{" "}
                  {service.title}
                </Link>
              </Card>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Two active projects at a time. If the calendar is full, you&apos;ll
          see it on the audit page.
        </p>
      </Container>
    </section>
  );
}
