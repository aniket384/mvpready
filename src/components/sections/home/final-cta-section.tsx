import { ArrowRight, Mail } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-button";
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
              <p className="text-sm font-medium opacity-70">Ready to build?</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
                Turn the idea into a focused MVP founders can sell, demo, and learn from.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 opacity-75">
                Share the product goal, customer, timeline, and risk. MVPReady
                will help define the credible next step.
              </p>
            </div>

            <div>
              <div className="grid gap-3 rounded-lg border border-background/15 bg-background/[0.04] p-4 text-sm opacity-85">
                <p>Best fit: SaaS MVPs, AI MVPs, founder-led products, and scalable web apps.</p>
                <p>Not a fit: vague feature lists, unclear ownership, or rushed builds without product strategy.</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink
                  href="/audit"
                  size="lg"
                  className="bg-background text-foreground hover:opacity-90"
                >
                  <ArrowRight size={17} />
                  Start your MVP
                </ButtonLink>
                <BookingButton
                  size="lg"
                  variant="secondary"
                  className="border-background/20 bg-transparent text-background hover:bg-background/10"
                >
                  Schedule a 30-Minute Call
                </BookingButton>
                <ButtonLink
                  href={`mailto:${siteConfig.links.email}?subject=Audit request`}
                  size="lg"
                  variant="secondary"
                  className="border-background/20 bg-transparent text-background hover:bg-background/10"
                >
                  <Mail size={17} />
                  Email MVPReady
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
