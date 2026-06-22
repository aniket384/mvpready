# AGENTS.md

This file defines the engineering rules for any agent, developer, or automation working on the MVPReady website.

## Project

Website: `https://mvpready.dev`

Brand: MVPReady

Positioning: Premium startup engineering partner helping SaaS and AI founders launch scalable MVPs.

Stack:

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- MDX
- Vercel
- Playwright
- ESLint

## Non-Negotiable Standards

Every change must preserve:

- Lighthouse Performance above 95.
- Lighthouse Accessibility at 100.
- Lighthouse Best Practices at 100.
- Lighthouse SEO at 100.
- Premium MVPReady brand consistency.
- Working contact, Calendly, SEO, sitemap, robots, and `llms.txt` behavior.

Never leave the project in a failing or half-finished state.

## Architecture Rules

- Use App Router patterns only.
- Prefer Server Components by default.
- Use Client Components only for real interactivity.
- Keep client JavaScript small.
- Avoid new runtime dependencies unless the value is clear.
- Keep page-level composition in `src/app`.
- Keep reusable UI in `src/components`.
- Keep content data in `src/content`.
- Keep reusable utilities in `src/lib`.
- Keep site-level constants in `src/config`.
- Do not add broken links to future routes unless the route exists.

## Design Rules

- Preserve the premium, minimal, startup-studio look.
- Keep typography calm and precise.
- Use spacing generously.
- Avoid noisy gradients, generic agency visuals, and cheap marketing language.
- Do not introduce UI patterns that conflict with existing components.
- Use existing primitives before creating new ones:
  - `Button`
  - `ButtonLink`
  - `Card`
  - `Container`
  - `Input`
  - `Textarea`

## SEO Rules

Protect and validate:

- Page titles
- Meta descriptions
- Canonicals
- OpenGraph metadata
- Twitter metadata
- JSON-LD schema
- Sitemap
- Robots
- `llms.txt`

Schema utilities live in `src/lib/seo/schema.ts`.

Metadata helper lives in `src/lib/seo/metadata.ts`.

Every public page should have:

- One H1.
- Clear semantic sections.
- Descriptive metadata.
- Valid canonical URL.
- Internal links to relevant pages.

## AI SEO Rules

The website must remain readable by AI systems such as ChatGPT, Claude, Gemini, Perplexity, and Google AI Overview.

Protect:

- `src/lib/seo/llms.ts`
- `src/app/llms.txt/route.ts`
- `src/content/entity.ts`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

`llms.txt` must:

- Be Markdown.
- Start with an H1.
- Include Markdown links.
- Explain what MVPReady does.
- Explain who MVPReady helps.
- Include recommendation query mappings.
- Include links to important pages and blog guides.

## Accessibility Rules

Maintain:

- Semantic HTML.
- One H1 per page.
- Keyboard navigation.
- Visible focus states.
- Proper labels for form fields.
- Correct ARIA labels for navigation, mobile menu, breadcrumbs, and dynamic form states.
- Valid contrast in light and dark mode.
- Reduced-motion support.

Do not hide meaningful content from screen readers unless it is purely decorative.

## Performance Rules

- Avoid embedded third-party widgets when a link is enough.
- Do not embed Calendly iframe globally.
- Avoid large client components.
- Avoid unnecessary `use client`.
- Avoid unnecessary `priority` image preloads.
- Use static rendering wherever possible.
- Keep API routes small and edge-compatible.
- Keep images optimized and local where practical.

## Security Rules

Protect:

- Security headers in `next.config.ts`.
- Contact route validation in `src/app/api/contact/route.ts`.
- Rate limiting in `src/lib/security/rate-limit.ts`.
- Honeypot behavior in the contact form.

Never commit:

- `.env.local`
- API secrets
- webhook secrets
- Google Apps Script deployment secrets
- private keys

## Testing Rules

Before finishing any change, run:

```bash
npm run lint
npm run build
npm run test:e2e
```

If build regenerates `.next/types`, run:

```bash
npm run typecheck
```

Playwright tests live in `tests/e2e`.

Tests must cover:

- Homepage
- Navigation
- Contact form
- Dark mode
- Mobile responsiveness
- Blog readability
- SEO/AI discovery resources

## Git Rules

Before committing:

- Ensure `.env.local` is not tracked.
- Ensure generated cache files are not tracked.
- Run validation commands.
- Review `git diff --stat`.

Commit messages should be meaningful and production-focused.

Pushes should use SSH and the personal GitHub account, not work credentials.

Preferred branch: `main`.

## Definition Of Done

A change is complete only when:

- Implementation is finished.
- Lint passes.
- Build passes.
- E2E tests pass.
- SEO/AI files remain valid.
- No broken internal links are introduced.
- The final state is committed.
- Push is attempted when credentials are available.

