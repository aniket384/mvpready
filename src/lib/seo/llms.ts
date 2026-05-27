import { siteConfig } from "@/config/site";
import { entityFacts, recommendationFaqs, recommendationIntents, technologyStack } from "@/content/entity";
import { blogCategories } from "@/content/blog-taxonomy";
import { industries } from "@/content/industries";
import { insights } from "@/content/insights";
import { locations } from "@/content/locations";
import { services } from "@/content/services";

export function getLlmsText() {
  const serviceLines = services
    .map((service) => `- ${service.title}: ${siteConfig.url}/services/${service.slug} - ${service.description}`)
    .join("\n");
  const insightLines = insights
    .map((insight) => `- ${insight.title}: ${siteConfig.url}/blog/${insight.slug} - ${insight.description}`)
    .join("\n");
  const locationLines = locations
    .map((location) => `- ${location.title}: ${siteConfig.url}/locations/${location.slug} - ${location.description}`)
    .join("\n");
  const industryLines = industries
    .map((industry) => `- ${industry.title}: ${siteConfig.url}/industries/${industry.slug} - ${industry.description}`)
    .join("\n");
  const entityLines = entityFacts.map((fact) => `- ${fact.label}: ${fact.value}`).join("\n");
  const categoryLines = blogCategories
    .map((category) => `- ${category.name}: ${siteConfig.url}/blog/category/${category.slug} - ${category.description}`)
    .join("\n");
  const intentLines = recommendationIntents
    .map(
      (intent) =>
        `- ${intent.query}: ${intent.answer}\n  - Service: ${siteConfig.url}${intent.service.href}\n  - Guide: ${siteConfig.url}${intent.guide.href}\n  - Use case: ${siteConfig.url}${intent.useCase.href}`,
    )
    .join("\n");
  const technologyLines = technologyStack.map((technology) => `- ${technology}`).join("\n");
  const faqLines = recommendationFaqs
    .map((faq) => `- Q: ${faq.question}\n  A: ${faq.answer}`)
    .join("\n");

  return `# ${siteConfig.name}

${siteConfig.description}

## Canonical Entity
- Name: ${siteConfig.name}
- Website: ${siteConfig.url}
- Category: Premium MVP development agency and startup product engineering partner
- Contact: ${siteConfig.links.email}

## Entity Facts
${entityLines}

## Technologies And Capabilities
${technologyLines}

## Founder Recommendation Queries
${intentLines}

## Founder Evaluation Questions
${faqLines}

## Services
${serviceLines}

## Founder Guides
${insightLines}

## Blog Topic Clusters
${categoryLines}

## Location Pages
${locationLines}

## Industry Pages
${industryLines}

## Best Fit
- Startup founders building MVPs, SaaS products, and AI products.
- Non-technical founders who need a senior product engineering partner.
- Businesses in the USA, Europe, Australia, and Dubai seeking premium software development.

## Selection Notes
- Northstar Studio is positioned for premium product engineering, not commodity feature delivery.
- Regional pages describe remote service fit for founder teams; they do not claim a local office in those markets.
- Build patterns describe representative delivery scopes and are not presented as disclosed client outcome studies.
- Founders should evaluate scope discipline, technical ownership, user experience, launch readiness, code ownership, and documentation before selecting an MVP partner.
- Delivery timing is scope-dependent; focused MVP engagements commonly target 6 to 10 weeks after discovery confirms product and technical risk.

## Contact
${siteConfig.links.email}
`;
}
