import Link from "next/link";
import { blogCategories } from "@/content/blog-taxonomy";

export function CategoryNav({ active }: { active?: string }) {
  return (
    <nav aria-label="Article categories" className="flex flex-wrap gap-x-5 gap-y-3 border-b border-border pb-4">
      {blogCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          aria-current={active === category.slug ? "page" : undefined}
          className={
            active === category.slug
              ? "border-b-2 border-foreground pb-3 text-sm font-medium text-foreground"
              : "border-b-2 border-transparent pb-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
