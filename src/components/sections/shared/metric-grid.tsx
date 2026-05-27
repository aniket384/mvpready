export function MetricGrid({
  metrics,
}: {
  metrics: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-background p-5">
          <p className="text-xl font-medium">{metric.value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
