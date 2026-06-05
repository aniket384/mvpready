import { ArrowRight } from "lucide-react";
import { CalendlyButtonLink } from "@/components/booking/calendly-link";
import { ButtonLink } from "@/components/ui/button";

export function MobileConversionBar() {
  return (
    <>
      <aside aria-label="Project inquiry actions" className="mobile-conversion-bar fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <CalendlyButtonLink variant="secondary" className="flex-1">
            Book call
          </CalendlyButtonLink>
          <ButtonLink href="/audit" className="flex-1">
            $199 audit
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </aside>
      <div aria-hidden className="h-20 md:hidden" />
    </>
  );
}
