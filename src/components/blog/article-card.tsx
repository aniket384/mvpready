import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Insight } from "@/content/insights";
import { getCategoryHref } from "@/lib/blog/posts";

export function ArticleCard({ insight }: { insight: Insight }) {
  return (
    <Card className="flex h-full flex-col">
      <Link
        href={getCategoryHref(insight)}
        className="text-sm font-medium text-accent hover:underline"
      >
        {insight.category}
      </Link>
      <h2 className="mt-4 text-2xl font-medium">
        <Link href={`/blog/${insight.slug}`} className="hover:underline">
          {insight.title}
        </Link>
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {insight.description}
      </p>
      <p className="mt-5 text-xs text-muted-foreground">{insight.readTime}</p>
      <Link
        href={`/blog/${insight.slug}`}
        className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium hover:underline"
      >
        Read guide
        <ArrowRight size={15} />
      </Link>
    </Card>
  );
}
