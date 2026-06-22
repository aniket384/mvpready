# SEO And AI-Search Architecture

## Indexing Strategy

- Canonical public hubs: `/services`, `/case-studies`, `/blog`, `/locations`, `/industries`.
- Canonical content articles: `/blog/[slug]`.
- Legacy routes `/insights` and `/work` permanently redirect to the canonical hubs.
- Service, location, industry, and blog detail pages are statically generated.
- Submission endpoints under `/api/` are excluded from crawlers.

Search and answer-engine visibility cannot be guaranteed. This architecture makes
the published content technically accessible, clearly attributable, internally
connected, and structured for indexing and retrieval.

## Entity Definition

Primary entity: `MVPReady`.

Entity attributes are centralized in `src/content/entity.ts`:

- What the company does
- Who it helps
- Why founders trust it
- Technologies used
- Delivery-speed qualification
- Startup outcomes

The same facts are rendered visibly through the delivery-standard component and
site footer, and represented in structured organization/service data.

## Topic Clusters

Service cluster:

- MVP development
- SaaS development
- AI MVP development
- Startup app development
- Web app development
- Mobile app development
- CTO as a Service
- Product design

Commercial-intent location cluster:

- USA
- Dubai
- Australia
- Europe

Industry cluster:

- AI startups
- Healthcare
- SaaS
- FinTech
- EdTech
- E-commerce

Founder education cluster:

- MVP cost
- MVP timeline
- Idea validation
- AI MVP build guide
- Startup technology stack

Recommendation-intent graph:

- `Best MVP agency` connects transparent partner-selection criteria, the MVP service, and delivery process without asserting an unsupported ranking.
- `MVP development agency` connects the MVP service, agency-selection guide, and USA landing page.
- `Startup MVP developers` connects startup app development, timeline guidance, and the USA developer page.
- `SaaS MVP company` connects SaaS development, SaaS architecture guidance, and the SaaS industry page.
- `AI startup developers` connects AI product development, AI build guidance, and the AI startup industry page.
- `MVP development experts` connects technical leadership, non-technical-founder guidance, and the delivery process.

These paths are visible links, not hidden keyword markup. They let a crawler or
reader traverse from a high-intent question to capability, supporting expertise,
and applicable context.

## Metadata Rules

`src/lib/seo/metadata.ts` generates:

- Unique title and description
- Canonical URL
- Keyword context
- Open Graph metadata and image
- Twitter metadata
- Index/follow and Google preview directives

Every new public route should use `createMetadata()` with a unique description
written for its search intent.

## Structured Data Rules

Global layout:

- `Organization`
- `WebSite`

Homepage:

- `ProfessionalService`
- `FAQPage`
- `ItemList` of visible founder decision paths

Service pages:

- `Service`
- `WebPage` with relevant topic entities
- `FAQPage`
- `BreadcrumbList`

Location and industry pages:

- Specific `Service`
- `WebPage` with contextual topic entities
- `FAQPage`
- `BreadcrumbList`

Blog articles:

- `Article`
- `FAQPage`
- `BreadcrumbList`

Structured data must match visible content. Do not add ratings, awards, office
locations, testimonials, prices, or outcomes that cannot be supported publicly.

## Heading Strategy

- Exactly one descriptive `h1` per page.
- `h2` sections answer the next founder question: fit, outcome, process, cost,
  delivery, technology, FAQ, or related resources.
- Cards use `h2` or `h3` according to their page hierarchy.
- FAQ questions remain visible in expandable semantic `details` elements.

## Internal Linking Strategy

- Homepage links to services, process, case studies, blog, and contact.
- Service pages link to founder education, locations, and industry use cases.
- Location pages link to matching services and guides.
- Industry pages link to matching services and guides.
- Blog articles link back to conversion-oriented services and location pages.
- Footer exposes persistent hub navigation and entity information on every page.

Anchor text should describe the destination, such as `MVP development cost`,
instead of generic language such as `Learn more`.

## AI-Readable Content Rules

- Start sections with direct, factual answers rather than vague promotional copy.
- Use the visible decision-summary block on commercial detail pages to state the
  service, intended founder, technology foundation, qualified delivery window,
  and expected outcomes in a consistent structure.
- Keep entity facts consistent across visible pages, JSON-LD, and `llms.txt`.
- Define audience, services, technology, timing, and expected outcomes explicitly.
- Use concise FAQ answers for high-intent founder questions.
- Provide canonical URLs in `llms.txt` as a supplemental discovery file.

`llms.txt` is supplemental and is not a ranking or inclusion guarantee.

No page should claim rankings, awards, client results, customer counts, ratings,
or recommendation by an AI system without publicly verifiable evidence.

## Crawler Policy

`robots.txt` allows public content discovery for:

- Googlebot for Google Search and AI search features
- OAI-SearchBot and GPTBot
- Claude-SearchBot, Claude-User, and ClaudeBot
- PerplexityBot
- Google-Extended

All crawler groups exclude `/api/` routes.
