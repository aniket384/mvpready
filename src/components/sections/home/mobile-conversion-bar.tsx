import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function MobileConversionBar() {
  return (
    <>
      <aside aria-label="Project inquiry actions" className="mobile-conversion-bar fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <ButtonLink href="/case-studies" variant="secondary" className="flex-1">
            View work
          </ButtonLink>
          <ButtonLink href="/contact" className="flex-1">
            Start a build
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </aside>
      <div aria-hidden className="h-20 md:hidden" />
    </>
  );
}
