import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Insight } from "@/content/insights";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Card className="flex h-full flex-col">
      <p className="text-sm font-medium text-accent">{insight.category}</p>
      <h2 className="mt-4 text-2xl font-medium">{insight.title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{insight.description}</p>
      <Link
        href={`/insights/${insight.slug}`}
        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium hover:underline"
      >
        Read guide
        <ArrowRight size={15} />
      </Link>
    </Card>
  );
}
