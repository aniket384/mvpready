import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbLink = {
  href: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbLink[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <ChevronRight className="h-3.5 w-3.5" aria-hidden /> : null}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
