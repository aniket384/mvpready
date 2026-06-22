import { ArrowRight } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-button";
import { ButtonLink } from "@/components/ui/button";

export function MobileConversionBar() {
  return (
    <>
      <aside aria-label="Project inquiry actions" className="mobile-conversion-bar fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <BookingButton variant="secondary" className="flex-1">
            Book call
          </BookingButton>
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
