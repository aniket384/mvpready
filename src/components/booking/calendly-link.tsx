import { CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

type CalendlyButtonLinkProps = {
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "link";
};

export function CalendlyButtonLink({
  children = "Schedule a call",
  className,
  size = "md",
  variant = "primary",
}: CalendlyButtonLinkProps) {
  const isConfigured = siteConfig.links.calendly !== "/contact";

  return (
    <ButtonLink
      href={siteConfig.links.calendly}
      size={size}
      variant={variant}
      className={className}
      aria-label={isConfigured ? "Schedule an appointment on Calendly" : "Open the contact form"}
    >
      <CalendarDays size={17} />
      {children}
    </ButtonLink>
  );
}
