import { Card } from "@/components/ui/card";

export function CaseStudyCard({
  title,
  description,
  outcome,
}: {
  title: string;
  description: string;
  outcome: string;
}) {
  return (
    <Card className="h-full">
      <p className="font-mono text-xs uppercase text-accent">{outcome}</p>
      <h2 className="mt-6 text-2xl font-medium">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
    </Card>
  );
}
