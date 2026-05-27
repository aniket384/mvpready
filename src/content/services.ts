export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  audience: string;
  concerns: string[];
  approach: string[];
  outcomes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const services = [
  {
    slug: "mvp-development",
    title: "MVP Development Agency",
    eyebrow: "Startup MVP development",
    description:
      "Premium MVP development for founders who need a polished, investor-ready product without wasting months on unclear scope or fragile execution.",
    audience:
      "Best for startup founders, non-technical founders, SaaS founders, and early teams preparing for pilots, fundraising, or first revenue.",
    concerns: [
      "You have a strong idea but need a defensible first scope.",
      "You need launch speed without accepting a disposable codebase.",
      "You need clear ownership, cost decisions, and technical guidance.",
    ],
    approach: [
      "Define the customer problem, release boundary, and evidence the MVP must create.",
      "Design and build the critical workflow with performance, analytics, and deployment considered early.",
      "Hand over a documented product foundation you can operate and extend.",
    ],
    outcomes: [
      "Validated product scope and user journey",
      "Production-ready web application",
      "Clean architecture ready for iteration",
      "Launch-ready SEO, analytics, and performance foundation",
    ],
    faqs: [
      {
        question: "What makes your MVP development premium?",
        answer:
          "We combine product strategy, UX, senior engineering, performance, and launch readiness instead of simply converting a feature list into code.",
      },
      {
        question: "How long does MVP development take?",
        answer:
          "Most focused MVPs take 6 to 10 weeks depending on scope, integrations, product complexity, and founder decision speed.",
      },
    ],
  },
  {
    slug: "saas-development",
    title: "SaaS MVP Development Agency",
    eyebrow: "SaaS product engineering",
    description:
      "SaaS MVP development for founders building subscription products, B2B workflows, internal platforms, marketplaces, and revenue-ready software.",
    audience:
      "Best for founders who need onboarding, dashboards, account flows, permissions, integrations, and scalable product foundations.",
    concerns: [
      "A polished demo exists, but onboarding and activation are not dependable.",
      "Permissions, billing direction, or data workflows are becoming expensive to change.",
      "You need a SaaS foundation that customers can rely on.",
    ],
    approach: [
      "Map activation, account structure, roles, data model, and integration risk.",
      "Build the revenue-critical workflows before broadening the feature surface.",
      "Prepare analytics, deployment, and iteration decisions for early traction.",
    ],
    outcomes: [
      "SaaS architecture that survives early traction",
      "Conversion-focused onboarding and activation flows",
      "Reliable workflows for customers and operators",
      "A technical base ready for billing and growth",
    ],
    faqs: [
      {
        question: "Do you build B2B SaaS products?",
        answer:
          "Yes. We build B2B SaaS platforms, dashboards, workflow tools, customer portals, and internal operations products.",
      },
      {
        question: "Can you support the product after launch?",
        answer:
          "Yes. We can continue with iteration, performance improvements, analytics, feature expansion, and technical handoff.",
      },
    ],
  },
  {
    slug: "ai-product-development",
    title: "AI MVP Development Company",
    eyebrow: "AI product development",
    description:
      "AI MVP development for founders turning models, automations, copilots, and retrieval workflows into products customers can trust.",
    audience:
      "Best for AI startup founders, SaaS teams adding AI workflows, and businesses building automation products.",
    concerns: [
      "A model demo is promising, but the customer workflow is unclear.",
      "Outputs need review, guardrails, privacy decisions, and failure handling.",
      "You need an AI product people can trust, not a novelty feature.",
    ],
    approach: [
      "Define the user job, evaluation signal, data boundary, and human review path.",
      "Design inspectable output states, fallbacks, controls, and useful interaction patterns.",
      "Build observability and iteration hooks so quality can improve after launch.",
    ],
    outcomes: [
      "AI workflows designed around real user jobs",
      "Clean UX around model outputs and human review",
      "Retrieval, automation, and copilot product patterns",
      "Production-minded reliability and guardrails",
    ],
    faqs: [
      {
        question: "Do you build AI agents and copilots?",
        answer:
          "Yes. We build AI copilots, workflow automation, retrieval systems, internal AI tools, and SaaS AI features when they have a clear product use case.",
      },
      {
        question: "Do you only build prototypes?",
        answer:
          "No. We focus on usable AI products with clear UX, reliability expectations, and production-ready engineering decisions.",
      },
    ],
  },
  {
    slug: "startup-app-development",
    title: "Startup App Development Company",
    eyebrow: "Startup app development",
    description:
      "Startup app development for founders who need a polished product, fast execution, and senior technical judgment from idea to launch.",
    audience:
      "Best for early-stage founders building web, mobile, SaaS, marketplace, or AI-enabled products for first customers or investors.",
    concerns: [
      "You know the opportunity but are unsure which product surface to launch first.",
      "Previous development has been slow, difficult to manage, or hard to trust.",
      "A near-term pilot or investor conversation requires a credible application.",
    ],
    approach: [
      "Translate business goals into a focused user journey and release plan.",
      "Select the right web, mobile, or cross-platform delivery path for the use case.",
      "Ship with documented technical decisions and a clear next-release roadmap.",
    ],
    outcomes: [
      "Product scope translated into a launchable application",
      "Architecture designed for iteration after MVP launch",
      "Founder-friendly communication around technical tradeoffs",
      "Launch-ready product flows, analytics, and deployment",
    ],
    faqs: [
      {
        question: "Do you build apps from just an idea?",
        answer:
          "Yes. We help founders turn an idea into product scope, UX flows, technical architecture, and a launch-ready first version.",
      },
      {
        question: "Is startup app development different from normal software development?",
        answer:
          "Yes. Startup app development requires sharper prioritization, faster learning loops, founder communication, and technical choices that support uncertainty.",
      },
    ],
  },
  {
    slug: "web-app-development",
    title: "Web App Development Services",
    eyebrow: "Premium web applications",
    description:
      "Modern web app development for startups and businesses building fast, reliable, conversion-focused products with scalable foundations.",
    audience:
      "Best for SaaS dashboards, customer portals, internal tools, marketplaces, AI workflows, and product-led web experiences.",
    concerns: [
      "Your web product must feel immediate, credible, and usable across devices.",
      "Existing frontend complexity is slowing improvements and affecting quality.",
      "Performance, accessibility, and search visibility matter at launch.",
    ],
    approach: [
      "Prioritize core journeys, responsive behavior, accessibility, and conversion moments.",
      "Build with structured React and Next.js architecture, TypeScript, and reusable UI systems.",
      "Validate rendering, performance fundamentals, analytics, and deployment readiness.",
    ],
    outcomes: [
      "Fast, accessible, SEO-aware web application",
      "Responsive product experience across devices",
      "Clean frontend architecture with scalable components",
      "Performance-minded implementation for Core Web Vitals",
    ],
    faqs: [
      {
        question: "What technologies do you use for web apps?",
        answer:
          "We typically use modern React and Next.js architecture with TypeScript, clean component systems, and production-grade deployment practices.",
      },
      {
        question: "Can you improve an existing web app?",
        answer:
          "Yes. We can refactor UX, improve performance, stabilize frontend architecture, and rebuild critical product flows.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development for Startups",
    eyebrow: "Startup mobile products",
    description:
      "Mobile app development for founders who need focused product strategy, clean UX, and a launch-ready mobile experience.",
    audience:
      "Best for founders building mobile-first MVPs, companion apps, marketplaces, consumer products, and field workflows.",
    concerns: [
      "The core behavior happens on a phone, but the initial scope is uncertain.",
      "You need mobile UX that feels deliberate rather than a compressed web product.",
      "Backend and release planning need to support future iteration.",
    ],
    approach: [
      "Confirm that a mobile-first release is the right validation path.",
      "Design essential mobile journeys, states, notifications, and data interactions.",
      "Plan APIs, release ownership, analytics, and the next product increment.",
    ],
    outcomes: [
      "Mobile-first product scope and interaction design",
      "Launch-ready app flows for early users",
      "API and backend planning for mobile growth",
      "Clear roadmap for post-MVP iteration",
    ],
    faqs: [
      {
        question: "Should my startup build mobile first?",
        answer:
          "Only if the core user behavior is naturally mobile. We help founders decide between mobile, web, or responsive MVP paths before development starts.",
      },
      {
        question: "Can you build both web and mobile products?",
        answer:
          "Yes. We can plan product architecture across web and mobile when the business case supports both platforms.",
      },
    ],
  },
  {
    slug: "cto-as-a-service",
    title: "CTO as a Service for Startups",
    eyebrow: "Fractional technical leadership",
    description:
      "CTO as a Service for founders who need senior technical strategy, architecture decisions, vendor oversight, and product engineering leadership.",
    audience:
      "Best for non-technical founders, early-stage startups, and growing teams that need senior technical judgment before hiring a full-time CTO.",
    concerns: [
      "Technical decisions are expensive, but you are not ready for a full-time CTO.",
      "A vendor or existing build needs independent scrutiny before more investment.",
      "Hiring, architecture, and product scope need one accountable technical view.",
    ],
    approach: [
      "Audit product risk, architecture, delivery process, and ownership gaps.",
      "Set priorities, decision criteria, and a technical roadmap in business language.",
      "Support vendor accountability, hiring decisions, or a controlled build path.",
    ],
    outcomes: [
      "Technical roadmap and architecture decisions",
      "Engineering hiring and vendor evaluation support",
      "Product scope translated into buildable milestones",
      "Reduced technical and operational risk",
    ],
    faqs: [
      {
        question: "Is CTO as a Service useful for non-technical founders?",
        answer:
          "Yes. It gives non-technical founders a senior technical partner for architecture, product tradeoffs, hiring, and vendor accountability.",
      },
      {
        question: "Can you review our existing product or team?",
        answer:
          "Yes. We can audit product architecture, engineering workflows, technical debt, team structure, and launch readiness.",
      },
    ],
  },
  {
    slug: "product-design-services",
    title: "Product Design Services for Startups",
    eyebrow: "Founder-focused product design",
    description:
      "Product design services for startups that need clear UX, premium interface design, conversion-focused flows, and build-ready product systems.",
    audience:
      "Best for founders who need product strategy, user flows, MVP scope, SaaS dashboards, AI interfaces, or investor-ready clickable product concepts.",
    concerns: [
      "The idea is valuable, but users may not immediately understand the product.",
      "A complex SaaS or AI workflow needs clarity before engineering cost compounds.",
      "Your first serious product impression needs confidence and restraint.",
    ],
    approach: [
      "Clarify user jobs, hierarchy, critical flows, and the first release boundary.",
      "Design interface states that explain value and remove avoidable uncertainty.",
      "Deliver decisions and components that translate cleanly into engineering.",
    ],
    outcomes: [
      "Clear MVP scope and user journeys",
      "Premium interface system aligned with startup positioning",
      "Conversion-focused onboarding and activation flows",
      "Build-ready design decisions for engineering",
    ],
    faqs: [
      {
        question: "Do you design before development?",
        answer:
          "Yes. We use design to clarify product scope, reduce founder risk, and make engineering faster and more deliberate.",
      },
      {
        question: "Can you redesign an existing MVP?",
        answer:
          "Yes. We can simplify flows, improve trust perception, sharpen visual hierarchy, and make the product easier to sell.",
      },
    ],
  },
] satisfies Service[];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
