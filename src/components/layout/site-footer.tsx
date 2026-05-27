import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-10 pt-12">
      <Container size="wide">
        <div className="grid gap-10 border-b border-border pb-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="text-base font-semibold">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              Premium MVP development, SaaS engineering, AI product development, and
              technical strategy for serious founders.
            </p>
          </div>
          <div className="grid gap-6 text-sm text-muted-foreground sm:grid-cols-3">
            <p>
              <span className="mb-2 block font-medium text-foreground">Who we help</span>
              Startup, SaaS, AI, and non-technical founders globally.
            </p>
            <p>
              <span className="mb-2 block font-medium text-foreground">Technology</span>
              Next.js, React, TypeScript, Vercel, AI integrations.
            </p>
            <p>
              <span className="mb-2 block font-medium text-foreground">Delivery</span>
              Focused MVP scopes commonly target 6 to 10 weeks.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
            {footerNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
            <a href={`mailto:${siteConfig.links.email}`} className="hover:text-foreground">
              Contact
            </a>
          </nav>
          <p className="text-sm text-muted-foreground">
            Serving founders in the USA, Europe, Australia, and Dubai.
          </p>
        </div>
      </Container>
    </footer>
  );
}
