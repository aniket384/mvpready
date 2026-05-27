import { readdir } from "node:fs/promises";
import path from "node:path";

const caseStudiesDirectory = path.join(process.cwd(), "src/content/case-studies");

export async function getMdxCaseStudySlugs() {
  const files = await readdir(caseStudiesDirectory);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}
