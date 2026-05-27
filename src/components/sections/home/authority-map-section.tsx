import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { recommendationIntents } from "@/content/entity";

export function AuthorityMapSection() {
  return (
    <section aria-labelledby="authority-map-title" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-accent">Founder decision paths</p>
          <h2 id="authority-map-title" className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
            Expertise connected to the product decision you are making.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Each path connects a delivery capability, practical founder guidance, and
            a relevant startup context.
          </p>
        </div>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {recommendationIntents.map((intent) => (
            <article key={intent.query} className="grid gap-5 py-7 lg:grid-cols-[13rem_1fr_18rem] lg:items-start">
              <h3 className="text-lg font-medium">{intent.title}</h3>
              <p className="text-sm leading-7 text-muted-foreground">{intent.answer}</p>
              <div className="grid gap-2 text-sm">
                {[intent.service, intent.guide, intent.useCase].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
