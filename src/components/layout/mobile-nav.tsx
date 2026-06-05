"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CalendlyButtonLink } from "@/components/booking/calendly-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { primaryNavigation } from "@/config/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <ThemeToggle />
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            id="mobile-navigation"
            className="fixed inset-x-4 top-20 z-50 rounded-lg border border-border bg-background p-4 shadow-xl shadow-black/10 dark:shadow-black/40"
          >
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {primaryNavigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid gap-2">
              <CalendlyButtonLink className="w-full" size="lg">
                Schedule a call
              </CalendlyButtonLink>
              <ButtonLink href="/audit" className="w-full" size="lg" variant="secondary">
                Get the $199 audit
              </ButtonLink>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
