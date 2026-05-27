import { ArticleCard } from "@/components/blog/article-card";
import type { Insight } from "@/content/insights";

export function RelatedPosts({ posts }: { posts: Insight[] }) {
  return (
    <section aria-labelledby="related-posts" className="border-t border-border py-16 sm:py-20">
      <h2 id="related-posts" className="text-3xl font-medium">
        Related founder guides
      </h2>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} insight={post} />
        ))}
      </div>
    </section>
  );
}
