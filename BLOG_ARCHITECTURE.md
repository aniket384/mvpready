# Blog Architecture

The blog uses statically rendered App Router pages with MDX article bodies and a typed
content manifest. This keeps editorial content flexible while metadata, taxonomy,
schema, and internal linking remain deterministic at build time.

## Routes

| Route | Purpose | Rendering |
| --- | --- | --- |
| `/blog` | Founder guide index and topic discovery | Static |
| `/blog/[slug]` | MDX article with schema, TOC, related guides, and FAQ | SSG |
| `/blog/category/[slug]` | Six canonical authority clusters | SSG |
| `/blog/tag/[slug]` | Supporting topic filter pages | SSG |

Category pages are indexable topic hubs. Tag pages with at least two articles are
indexable and included in `sitemap.xml`; one-article tag pages remain usable for
navigation but are `noindex, follow` until the cluster has depth.

## Content Contract

- Article metadata, categories, tags, dates, descriptions, and TOC headings live in
  `src/content/insights.ts`.
- Article bodies live at `src/content/insights/[slug].mdx`.
- Each MDX article is mapped once in `src/lib/mdx/article-registry.tsx`.
- Category definitions and cluster descriptions live in `src/content/blog-taxonomy.ts`.
- The `##` headings in MDX must match `sections[].heading` in the manifest so static
  table-of-contents links remain exact.

## Publishing A Guide

1. Add a typed manifest entry in `src/content/insights.ts` with an existing category,
   focused tags, publish/update dates, and three useful sections.
2. Add the matching `.mdx` file and import/register it in
   `src/lib/mdx/article-registry.tsx`.
3. Link to relevant service, industry, location, or related guide pages from the
   article where it assists the reader.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.

## SEO And AI Retrieval

- Article metadata is programmatically generated with canonical, OpenGraph, Twitter,
  publish, and modified dates.
- Each article emits `Article`, `FAQPage`, and `BreadcrumbList` structured data.
- Categories and qualified tag hubs enter the sitemap automatically.
- Articles and category clusters are included in `llms.txt` as concise canonical
  discovery paths.
- Body content is rendered as semantic server HTML; only reading progress and sharing
  controls hydrate on article pages.
