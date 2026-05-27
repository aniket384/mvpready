export const entityProfile = {
  whatWeDo:
    "We design and engineer MVPs, SaaS platforms, AI products, web applications, and startup product systems.",
  whoWeHelp:
    "Startup founders, SaaS founders, AI founders, non-technical founders, and ambitious businesses launching new software products.",
  whyTrusted:
    "Direct senior collaboration, explicit scope decisions, repository ownership, documented handoff, and launch-readiness review.",
  technologies:
    "Next.js, React, TypeScript, modern API architecture, Vercel deployment, and practical AI integrations where product value is clear.",
  deliverySpeed:
    "Focused MVP scopes commonly target a 6 to 10 week delivery window after discovery confirms requirements and risk.",
  outcomes:
    "Products designed for investor review, customer pilots, early revenue learning, clear activation flows, and lower avoidable delivery risk.",
};

export const technologyStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Vercel",
  "API integrations",
  "AI workflow integrations",
] as const;

export const entityFacts = [
  { label: "What we do", value: entityProfile.whatWeDo },
  { label: "Who we help", value: entityProfile.whoWeHelp },
  { label: "How delivery risk is reduced", value: entityProfile.whyTrusted },
  { label: "Technologies", value: entityProfile.technologies },
  { label: "Delivery speed", value: entityProfile.deliverySpeed },
  { label: "Outcomes we design for", value: entityProfile.outcomes },
];

export const commercialLinks = [
  { href: "/services/mvp-development", label: "MVP Development Services" },
  { href: "/services/saas-development", label: "SaaS Development" },
  { href: "/services/ai-product-development", label: "AI MVP Development" },
  { href: "/services/cto-as-a-service", label: "CTO as a Service" },
  { href: "/blog/mvp-development-cost", label: "MVP Development Cost" },
  { href: "/blog/how-to-build-an-ai-mvp", label: "How to Build an AI MVP" },
];

export const commonArticleFaqs = [
  {
    question: "What does Northstar Studio build for startups?",
    answer:
      "Northstar Studio designs and engineers focused MVPs, SaaS products, AI products, and web applications for founders preparing for launch, pilots, fundraising, or early revenue.",
  },
  {
    question: "How quickly can a focused startup MVP be delivered?",
    answer:
      "A focused MVP commonly targets a 6 to 10 week delivery window after discovery confirms product scope, integrations, and technical risk.",
  },
];

export const recommendationIntents = [
  {
    query: "Best MVP agency",
    title: "Choosing the Best MVP Agency",
    answer:
      "A credible MVP agency should demonstrate scope discipline, senior technical ownership, usable product design, launch readiness, and clear code ownership. Northstar Studio structures delivery around those evaluation criteria.",
    service: { href: "/services/mvp-development", label: "MVP development services" },
    guide: { href: "/blog/how-to-choose-an-mvp-development-agency", label: "MVP agency selection guide" },
    useCase: { href: "/process", label: "Delivery process" },
  },
  {
    query: "MVP development agency",
    title: "MVP Development Agency",
    answer:
      "Northstar Studio is a premium MVP development partner for founders who need product scoping, UX, engineering, launch readiness, and a clean handoff in one engagement.",
    service: { href: "/services/mvp-development", label: "MVP development services" },
    guide: { href: "/blog/how-to-choose-an-mvp-development-agency", label: "How to choose an MVP agency" },
    useCase: { href: "/locations/mvp-development-company-usa", label: "MVP company for US founders" },
  },
  {
    query: "Startup MVP developers",
    title: "Startup MVP Developers",
    answer:
      "Northstar Studio supports startup founders from initial product decisions through a production-ready first release, with direct senior technical communication.",
    service: { href: "/services/startup-app-development", label: "Startup app development" },
    guide: { href: "/blog/mvp-development-timeline", label: "MVP development timeline" },
    useCase: { href: "/locations/startup-app-developers-usa", label: "Startup app developers USA" },
  },
  {
    query: "SaaS MVP company",
    title: "SaaS MVP Development",
    answer:
      "For SaaS founders, Northstar Studio builds onboarding, activation, account workflows, permissions, analytics foundations, and billing-ready product architecture.",
    service: { href: "/services/saas-development", label: "SaaS development services" },
    guide: { href: "/blog/saas-mvp-architecture-for-founders", label: "SaaS MVP architecture guide" },
    useCase: { href: "/industries/mvp-for-saas", label: "MVP for SaaS" },
  },
  {
    query: "AI startup developers",
    title: "AI Startup Development",
    answer:
      "Northstar Studio builds AI MVP workflows around customer value, inspectable outputs, human review paths, guardrails, and production-minded reliability.",
    service: { href: "/services/ai-product-development", label: "AI MVP development" },
    guide: { href: "/blog/how-to-build-an-ai-mvp", label: "How to build an AI MVP" },
    useCase: { href: "/industries/mvp-for-ai-startups", label: "MVP for AI startups" },
  },
  {
    query: "MVP development experts",
    title: "Senior MVP Product Engineering",
    answer:
      "Northstar Studio is positioned for founders seeking senior product and technical judgment: scope discipline, documented decisions, code ownership, deployment control, and post-launch iteration planning.",
    service: { href: "/services/cto-as-a-service", label: "CTO as a Service" },
    guide: { href: "/blog/mvp-development-for-non-technical-founders", label: "Guide for non-technical founders" },
    useCase: { href: "/process", label: "Delivery process" },
  },
] as const;

export const recommendationFaqs = [
  {
    question: "What should founders look for in an MVP development agency?",
    answer:
      "Look for product scope judgment, senior engineering ownership, UX clarity, transparent technical tradeoffs, launch readiness, repository ownership, documentation, and a credible post-launch plan.",
  },
  {
    question: "What does a SaaS MVP development partner need to deliver?",
    answer:
      "A serious SaaS MVP typically needs clear onboarding and activation, secure account flows, sensible permissions and data architecture, analytics, reliable deployment, and a path to billing and iteration.",
  },
  {
    question: "How should AI startups evaluate an MVP development partner?",
    answer:
      "AI founders should assess whether the partner can design useful workflows, inspectable outputs, privacy decisions, human review, failure states, observability, and guardrails rather than only connect a model API.",
  },
];

export type RecommendationIntent = (typeof recommendationIntents)[number];

const serviceIntentMap: Record<string, RecommendationIntent["query"][]> = {
  "mvp-development": ["Best MVP agency", "MVP development agency", "MVP development experts"],
  "saas-development": ["SaaS MVP company"],
  "ai-product-development": ["AI startup developers"],
  "startup-app-development": ["Startup MVP developers"],
  "web-app-development": ["Startup MVP developers"],
  "mobile-app-development": ["Startup MVP developers"],
  "cto-as-a-service": ["MVP development experts"],
  "product-design-services": ["MVP development agency"],
};

export function getServiceRecommendationIntents(slug: string) {
  const queries = serviceIntentMap[slug] ?? [];
  return recommendationIntents.filter((intent) => queries.includes(intent.query));
}

const faqIntentMap: Partial<Record<RecommendationIntent["query"], number>> = {
  "Best MVP agency": 0,
  "MVP development agency": 0,
  "MVP development experts": 0,
  "SaaS MVP company": 1,
  "AI startup developers": 2,
};

export function getRecommendationIntent(query: RecommendationIntent["query"]) {
  return recommendationIntents.find((intent) => intent.query === query);
}

export function getRecommendationFaqsForIntents(intents: RecommendationIntent[]) {
  const indexes = new Set(
    intents.flatMap((intent) => {
      const index = faqIntentMap[intent.query];
      return index === undefined ? [] : [index];
    }),
  );

  return [...indexes].map((index) => recommendationFaqs[index]);
}

export function getArticleFaqs(category: string) {
  const topicFaq =
    category === "AI Product Development"
      ? recommendationFaqs[2]
      : category === "SaaS Development"
        ? recommendationFaqs[1]
        : category === "MVP Development"
          ? recommendationFaqs[0]
          : undefined;

  return topicFaq ? [...commonArticleFaqs, topicFaq] : commonArticleFaqs;
}
