import type { MdxFrontmatter } from "@/types/mdx";

export function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, content: source } as {
      frontmatter: Partial<MdxFrontmatter>;
      content: string;
    };
  }

  const [, rawFrontmatter, content] = match;
  const frontmatter: Partial<MdxFrontmatter> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim().replace(/^"|"$/g, "");

    if (key && value && !line.startsWith("  -")) {
      frontmatter[key.trim() as keyof MdxFrontmatter] = value as never;
    }
  }

  return { frontmatter, content };
}
