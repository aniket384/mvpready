import Link from "next/link";
import { services } from "@/content/services";

export function RelatedServices({ currentSlug }: { currentSlug: string }) {
  return (
    <div className="grid gap-3">
      {services
        .filter((service) => service.slug !== currentSlug)
        .map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="rounded-lg border border-border p-4 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {service.title}
          </Link>
        ))}
    </div>
  );
}
