export type MdxFrontmatter = {
  title: string;
  description: string;
  slug: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  canonical?: string;
  keywords?: string[];
};
