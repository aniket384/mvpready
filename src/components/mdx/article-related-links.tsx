import Link from "next/link";

export function ArticleRelatedLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <div className="mt-10 rounded-lg border border-border p-5">
      <p className="text-sm font-medium">Related reading</p>
      <div className="mt-3 grid gap-2 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
