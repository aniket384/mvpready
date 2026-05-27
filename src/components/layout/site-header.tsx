import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryNavigation } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Northstar Studio home">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-sm font-semibold text-background shadow-sm shadow-black/10">
              N
            </span>
            <span>
              <span className="block text-sm font-semibold">Northstar Studio</span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">
                Startup product engineering
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <ButtonLink href="/contact" size="sm">
              Discuss your MVP
              <ArrowRight size={15} />
            </ButtonLink>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
