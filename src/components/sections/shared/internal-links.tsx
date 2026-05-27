import Link from "next/link";

export function InternalLinks({
  title = "Related resources",
  links,
}: {
  title?: string;
  links: { href: string; label: string }[];
}) {
  return (
    <aside className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-xl font-medium">{title}</h2>
      <div className="mt-4 grid gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
