import { ArrowRight, Mail } from "lucide-react";
import { CalendlyButtonLink } from "@/components/booking/calendly-link";
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
              <p className="text-sm font-medium opacity-70">One CTA. That&apos;s it.</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
                Send me your project. I&apos;ll tell you the truth in 48 hours.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 opacity-75">
                Repo, Lovable URL, Bolt project — whatever you&apos;ve got.
                Loom + written verdict in 48 hours.
              </p>
            </div>

            <div>
              <div className="grid gap-3 rounded-lg border border-background/15 bg-background/[0.04] p-4 text-sm opacity-85">
                <p>$199 audit, credited toward any paid project within 30 days.</p>
                <p>If your codebase is unsalvageable, I&apos;ll tell you and refund the audit toward a fresh build.</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink
                  href="/audit"
                  size="lg"
                  className="bg-background text-foreground hover:opacity-90"
                >
                  <ArrowRight size={17} />
                  Get the audit — $199
                </ButtonLink>
                <CalendlyButtonLink
                  size="lg"
                  variant="secondary"
                  className="border-background/20 bg-transparent text-background hover:bg-background/10"
                >
                  Schedule a call
                </CalendlyButtonLink>
                <ButtonLink
                  href={`mailto:${siteConfig.links.email}?subject=Audit request`}
                  size="lg"
                  variant="secondary"
                  className="border-background/20 bg-transparent text-background hover:bg-background/10"
                >
                  <Mail size={17} />
                  Email Aniket
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
