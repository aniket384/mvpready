import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/content/home";

export function CaseStudiesSection() {
  return (
    <section id="work" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">Build patterns</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Product paths shaped for launch-critical moments.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Representative engagement patterns showing how we frame AI products,
              marketplace MVPs, and product rescue decisions.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
          >
            View build patterns
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-14 overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid lg:grid-cols-[0.37fr_0.63fr]">
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                  <p className="font-mono text-xs uppercase text-accent">
                  Product interface example
                </p>
                <h3 className="mt-5 text-2xl font-medium">
                  SaaS analytics built for activation, retention, and revenue clarity.
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                  Founder-facing products need credible data surfaces, legible
                  workflows, and trustworthy AI output presentation.
                </p>
              </div>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:underline">
                  Discuss this build path
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="border-t border-border bg-muted/30 p-3 lg:border-l lg:border-t-0">
              <Image
                src="/images/case-studies/analytics-platform.jpg"
                alt="Premium SaaS analytics application interface with revenue chart, workflow funnel, and AI insight module"
                width={1568}
                height={1003}
                sizes="(min-width: 1024px) 720px, 100vw"
                loading="lazy"
                className="h-auto w-full rounded-md border border-border"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <div key={study.title}>
              <Card className="flex h-full min-h-72 flex-col">
                <p className="font-mono text-xs uppercase text-accent">
                  {study.outcome}
                </p>
                <h3 className="mt-6 text-2xl font-medium">
                  {study.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                  {study.description}
                </p>
                <Link href="/contact" className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-foreground hover:underline">
                  Explore a comparable scope
                  <ArrowRight size={15} />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
