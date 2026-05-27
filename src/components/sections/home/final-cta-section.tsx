import { ArrowRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function FinalCtaSection() {
  return (
    <section id="contact" className="pb-28 pt-20 sm:py-24 lg:py-28">
      <Container>
        <div className="overflow-hidden rounded-lg border border-border bg-foreground p-8 text-background shadow-lg shadow-black/10 sm:p-10 lg:p-12 dark:shadow-black/30">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm font-medium opacity-70">Ready for a serious build?</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
                Turn your next product milestone into a credible launch.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 opacity-75">
                Tell us what you are building, where the business is going, and what
                needs to be true for the MVP to matter. We will reply with the
                clearest next step.
              </p>
            </div>

            <div>
              <div className="grid gap-3 rounded-lg border border-background/15 bg-background/[0.04] p-4 text-sm opacity-85">
                <p>Best fit: funded teams, serious founder-led MVPs, SaaS launches, AI products, and product rescue.</p>
                <p>Expect: an honest fit assessment, explicit risk discussion, and a scoped next step.</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="bg-background text-foreground hover:opacity-90"
                >
                  <ArrowRight size={17} />
                  Discuss your MVP
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${siteConfig.links.email}?subject=MVP build inquiry`}
                  size="lg"
                  variant="secondary"
                  className="border-background/20 bg-transparent text-background hover:bg-background/10"
                >
                  <Mail size={17} />
                  Email directly
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
