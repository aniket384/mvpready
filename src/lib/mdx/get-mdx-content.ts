import { readFile } from "node:fs/promises";
import { parseFrontmatter } from "@/lib/mdx/frontmatter";

export async function getMdxContent(path: string) {
  const source = await readFile(path, "utf8");
  return parseFrontmatter(source);
}
