export function ServiceOutcomes({ outcomes }: { outcomes: string[] }) {
  return (
    <div className="grid gap-3">
      {outcomes.map((outcome) => (
        <div key={outcome} className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
          {outcome}
        </div>
      ))}
    </div>
  );
}
