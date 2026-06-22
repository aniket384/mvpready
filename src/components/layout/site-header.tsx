import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-button";
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
          <Link href="/" className="flex items-center gap-3" aria-label="MVPReady home">
            <Image
              src="/brand/mvpready-logo-light.svg"
              alt="MVPReady"
              width={196}
              height={44}
              className="h-9 w-auto dark:hidden"
            />
            <Image
              src="/brand/mvpready-logo-dark.svg"
              alt="MVPReady"
              width={196}
              height={44}
              className="hidden h-9 w-auto dark:block"
            />
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
            <BookingButton size="sm" variant="secondary">
              Book Free Discovery Call
            </BookingButton>
            <ButtonLink href="/audit" size="sm">
              Plan the MVP
              <ArrowRight size={15} />
            </ButtonLink>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
