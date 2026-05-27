export function ComparisonTable({
  rows,
}: {
  rows: { label: string; premium: string; cheap: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-px border-b border-border last:border-b-0 md:grid-cols-3">
          <div className="bg-muted/40 p-4 text-sm font-medium">{row.label}</div>
          <div className="p-4 text-sm text-muted-foreground">{row.premium}</div>
          <div className="p-4 text-sm text-muted-foreground">{row.cheap}</div>
        </div>
      ))}
    </div>
  );
}
