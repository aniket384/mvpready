import { readdir } from "node:fs/promises";
import path from "node:path";

const insightsDirectory = path.join(process.cwd(), "src/content/insights");

export async function getMdxPostSlugs() {
  const files = await readdir(insightsDirectory);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}
