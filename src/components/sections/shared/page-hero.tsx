import { CalendlyButtonLink } from "@/components/booking/calendly-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs, type BreadcrumbLink } from "@/components/seo/breadcrumbs";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: string;
  secondaryCta?: string;
  breadcrumbs?: BreadcrumbLink[];
  showActions?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta = "Schedule a call",
  secondaryCta = "View process",
  breadcrumbs,
  showActions = true,
}: PageHeroProps) {
  return (
    <section className="border-b border-border py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-4xl">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
          <p className="text-sm font-medium text-accent">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          {showActions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CalendlyButtonLink size="lg">
                {primaryCta}
              </CalendlyButtonLink>
              <ButtonLink href="/process" size="lg" variant="secondary">
                {secondaryCta}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
