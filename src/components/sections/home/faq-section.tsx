import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { faqs } from "@/content/home";

export function FaqSection() {
  return (
    <section id="faq" className="border-y border-border bg-muted/35 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-medium text-accent">Honest answers</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              The questions you&apos;re actually asking.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Nothing here will surprise you on the first call.
            </p>
            <ButtonLink href="/audit" variant="secondary" className="mt-8">
              Start the strategy sprint
            </ButtonLink>
          </div>

          <div className="divide-y divide-border rounded-lg border border-border bg-background shadow-sm shadow-black/[0.02]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-6 transition-colors hover:bg-muted/30">
                <summary className="cursor-pointer list-none text-base font-medium marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
