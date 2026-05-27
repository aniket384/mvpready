import path from "node:path";
import { getMdxContent } from "@/lib/mdx/get-mdx-content";

export async function getMdxPostBySlug(slug: string) {
  return getMdxContent(path.join(process.cwd(), "src/content/insights", `${slug}.mdx`));
}
