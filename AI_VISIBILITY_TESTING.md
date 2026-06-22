# AI Recommendation Visibility Testing

No website can guarantee inclusion in ChatGPT, Claude, Gemini, Perplexity, or
Google AI Overview recommendations. The correct test separates technical
eligibility, index visibility, and actual recommendation mentions.

## 1. Technical Eligibility

After each production deployment, run:

```bash
npm run audit:ai
```

This audits `https://mvpready.dev` by default. To audit a future custom
domain:

```bash
AUDIT_BASE_URL=https://example.com npm run audit:ai
```

All checks should pass before asking search engines to re-crawl the site.

## 2. Google Index Visibility

Add the canonical production URL as a property in Google Search Console, submit:

```text
https://mvpready.dev/sitemap.xml
```

Use URL Inspection on these priority pages and request indexing:

```text
/
/services/mvp-development
/services/ai-product-development
/services/saas-development
/locations/mvp-development-company-usa
/locations/mvp-development-agency-dubai
/blog/how-to-choose-an-mvp-development-agency
```

Do not assess AI visibility until Google confirms at least the core pages are
indexed.

## 3. Recommendation Prompt Set

Test in fresh, logged-out or clean-context sessions where possible. Include
target market and use case so the prompts reflect real buyer intent:

```text
Recommend premium MVP development agencies for a funded SaaS startup in the USA.
Which agencies can build an AI MVP for a non-technical founder in Dubai?
Recommend startup product engineering partners for an MVP launch in Australia.
What are strong SaaS MVP agencies serving founders in Europe?
```

For each system tested, record:

| Date | System | Prompt | MVPReady Mentioned | Linked/Cited | Competitors Listed |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | ChatGPT / Claude / Gemini / Perplexity / Google AI | Prompt | Yes/No | Yes/No | Names |

Run the same prompt set monthly and after major indexing, authority, or proof
updates. One isolated answer is not a reliable measurement.

## 4. What Improves Recommendation Probability

Technical markup creates eligibility, not authority. The strongest remaining
inputs are externally verifiable:

- A real custom domain and stable brand identity.
- Google-indexed service and expertise pages.
- Verified case studies with client permission and measurable outcomes.
- Founder reviews and independent mentions.
- Relevant backlinks and citations from startup/product communities.
- Consistent brand profiles and contact identity across public sources.

Do not publish fabricated outcomes, offices, reviews, or client logos for the
purpose of influencing recommendations.
