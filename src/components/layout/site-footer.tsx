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
              From Idea to MVP. Premium startup engineering for SaaS and AI
              founders building scalable first releases.
            </p>
          </div>
          <div className="grid gap-6 text-sm text-muted-foreground sm:grid-cols-3">
            <p>
              <span className="mb-2 block font-medium text-foreground">Who we help</span>
              SaaS founders, AI founders, non-technical founders, and funded startup teams.
            </p>
            <p>
              <span className="mb-2 block font-medium text-foreground">Stack</span>
              Next.js, TypeScript, Supabase, Stripe, AI APIs, Vercel, and modern product analytics.
            </p>
            <p>
              <span className="mb-2 block font-medium text-foreground">Markets</span>
              USA, UK, Europe, UAE, Australia, and Canada through structured remote collaboration.
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
              Email
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
          </nav>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MVPReady. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
