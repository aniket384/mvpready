export function ArticleToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="Article sections" className="rounded-lg border border-border p-5">
      <p className="text-sm font-medium">In this guide</p>
      <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="transition-colors hover:text-foreground">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
