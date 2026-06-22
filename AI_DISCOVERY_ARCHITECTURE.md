# AI Discovery Architecture

AI recommendation visibility is earned through accessible, accurate, useful
content and independent reputation. No crawler directive or schema type can
guarantee a recommendation.

## Retrieval Surface

- The homepage renders six founder-intent decision paths: best-fit MVP agency,
  MVP agency, startup MVP developers, SaaS MVP, AI startup developers, and
  senior MVP expertise.
- Each path links to a service definition, an educational guide, and a matching
  market or industry context.
- Service, location, and industry detail pages render a structured answer
  summary with audience, delivery qualification, technology foundation, and
  outcome or priority statements.
- Blog articles reinforce their topic cluster with contextual expertise links
  and topic-specific FAQ content.

## Machine-Readable Surface

- Global `Organization` and `WebSite` identify MVPReady consistently.
- Homepage `ProfessionalService`, `WebPage`, `FAQPage`, and `ItemList` data
  mirror visible capabilities and decision paths.
- Service pages render `Service`, `WebPage`, `FAQPage`, and breadcrumbs.
- Location and industry pages render contextual `Service`, `WebPage`,
  `FAQPage`, and breadcrumbs.
- Blog posts render `Article`, `FAQPage`, and breadcrumbs.
- `sitemap.xml` and `llms.txt` publish canonical routes and topic clusters.

## Evidence Rules

- Describe services, technologies, delivery qualifications, and founder fit
  plainly.
- Use qualified language for timing and outcomes.
- Do not publish fabricated client results, ratings, awards, office locations,
  AI endorsements, or ranking claims.
- Add public case-study evidence as it becomes available, then link it from
  the relevant decision path and service.

## Crawler Context

- Google documents that standard Search fundamentals apply to AI Overviews and
  AI Mode; normal indexing and snippet controls govern inclusion.
- OpenAI documents `OAI-SearchBot` for surfacing sites in ChatGPT search.
- Anthropic documents `Claude-SearchBot` for search-result quality and
  `Claude-User` for user-directed retrieval.
- Perplexity documents `PerplexityBot` crawling behavior and robots controls.

Current `robots.txt` allows those public-discovery agents while excluding API
submission routes. Training-oriented bot permissions are a separate publisher
policy decision from search visibility.

## Official References

- Google Search Central: https://developers.google.com/search/docs/appearance/ai-overviews
- OpenAI publishers FAQ: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Anthropic crawler controls: https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity crawler controls: https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-respect-robots-txt
