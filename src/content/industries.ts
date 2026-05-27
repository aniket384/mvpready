import type { SeoLandingPage } from "@/content/locations";

export const industries = [
  {
    slug: "mvp-for-ai-startups",
    title: "MVP for AI Startups",
    eyebrow: "AI startup MVPs",
    description:
      "MVP development for AI startups building copilots, agents, automation products, retrieval workflows, and AI-enabled SaaS.",
    audience:
      "Best for AI founders who need to turn model capability into a product customers can understand and trust.",
    sections: [
      {
        heading: "AI MVPs need trust design",
        body:
          "Users need to understand what the AI did, when to review it, and how reliable the output is. We design AI products around confidence and workflow clarity.",
      },
      {
        heading: "Build the workflow, not just the demo",
        body:
          "A serious AI MVP includes UX, data flow, guardrails, observability, and fallback states, not only prompts or model calls.",
      },
      {
        heading: "Define evaluation before launch",
        body:
          "Founders should know which outputs are acceptable, how quality is reviewed, and which customer outcome proves the AI workflow deserves further investment.",
      },
    ],
    faqs: [
      {
        question: "Can you build AI agents and copilots?",
        answer:
          "Yes. We build agents, copilots, retrieval systems, automation workflows, and AI SaaS features when the product use case is clear.",
      },
      {
        question: "What makes an AI MVP investor-ready?",
        answer:
          "It should show a clear workflow, credible UX, differentiated insight, technical feasibility, and a path to customer value.",
      },
    ],
    links: [
      { href: "/services/ai-product-development", label: "AI MVP development" },
      { href: "/blog/how-to-build-an-ai-mvp", label: "How to build an AI MVP" },
      { href: "/blog/ai-mvp-development-for-startups", label: "AI MVP launch guidance" },
    ],
  },
  {
    slug: "mvp-for-healthcare-startups",
    title: "MVP for Healthcare Startups",
    eyebrow: "Healthcare MVPs",
    description:
      "MVP development for healthcare startups building patient workflows, clinical tools, admin platforms, and health-tech SaaS products.",
    audience:
      "Best for healthcare founders who need careful UX, privacy-aware product decisions, and a credible first product for pilots.",
    sections: [
      {
        heading: "Healthcare MVPs need careful scope",
        body:
          "Healthcare products require clarity around user roles, sensitive data, workflow risk, and stakeholder trust before development starts.",
      },
      {
        heading: "Design for pilots and adoption",
        body:
          "Early healthcare products should make the workflow easier for patients, providers, operators, or administrators without adding unnecessary complexity.",
      },
      {
        heading: "Separate product delivery from compliance approval",
        body:
          "We can design privacy-aware flows and access decisions, while regulated launch decisions should be confirmed with the appropriate healthcare and legal specialists.",
      },
    ],
    faqs: [
      {
        question: "Do you build compliant healthcare products?",
        answer:
          "We can build privacy-aware healthcare MVPs and recommend specialist legal/compliance review for formal HIPAA, GDPR, or regional requirements.",
      },
      {
        question: "Can you build patient portals or workflow tools?",
        answer:
          "Yes. We can build portals, dashboards, workflow tools, intake systems, and healthcare SaaS MVPs.",
      },
    ],
    links: [
      { href: "/services/web-app-development", label: "Web app development" },
      { href: "/blog/startup-tech-stack-guide", label: "Startup tech stack guide" },
      { href: "/services/cto-as-a-service", label: "Technical strategy support" },
    ],
  },
  {
    slug: "mvp-for-saas",
    title: "MVP for SaaS",
    eyebrow: "SaaS MVPs",
    description:
      "MVP development for SaaS founders building dashboards, workflows, customer portals, B2B tools, and subscription products.",
    audience:
      "Best for SaaS founders who need onboarding, activation, product architecture, and revenue-ready product foundations.",
    sections: [
      {
        heading: "SaaS MVPs need activation, not just features",
        body:
          "The MVP should make users reach the first valuable outcome quickly. We focus on onboarding, core workflow clarity, and retention signals.",
      },
      {
        heading: "Build foundations that survive traction",
        body:
          "Roles, permissions, analytics, data models, and integrations should be planned enough to avoid a painful rebuild after early growth.",
      },
      {
        heading: "Use the first release to learn revenue behavior",
        body:
          "A focused SaaS MVP should show who activates, which workflows retain use, where buyers hesitate, and what deserves the next product investment.",
      },
    ],
    faqs: [
      {
        question: "Do you build B2B SaaS MVPs?",
        answer:
          "Yes. We build B2B SaaS dashboards, workflow products, customer portals, and AI-enabled SaaS products.",
      },
      {
        question: "Can you help with onboarding and activation?",
        answer:
          "Yes. We design onboarding and activation flows as part of the product strategy and UX system.",
      },
    ],
    links: [
      { href: "/services/saas-development", label: "SaaS development services" },
      { href: "/locations/saas-development-agency-dubai", label: "SaaS development Dubai" },
      { href: "/blog/saas-mvp-architecture-for-founders", label: "SaaS MVP architecture" },
    ],
  },
  {
    slug: "mvp-for-fintech",
    title: "MVP for FinTech",
    eyebrow: "FinTech MVPs",
    description:
      "MVP development for FinTech startups building dashboards, financial workflows, marketplaces, internal tools, and customer-facing platforms.",
    audience:
      "Best for FinTech founders who need high trust UX, careful data handling, and credible product foundations.",
    sections: [
      {
        heading: "FinTech products must earn trust quickly",
        body:
          "Users need clear data presentation, transparent actions, reliable flows, and strong perceived security from the first interaction.",
      },
      {
        heading: "Scope the risky workflows first",
        body:
          "We help founders identify the financial workflows, permissions, integrations, and edge cases that matter most for early validation.",
      },
      {
        heading: "Make regulated risk explicit",
        body:
          "Payment, identity, data retention, audit, and regulatory requirements should be surfaced early and validated with qualified specialists before launch commitments are made.",
      },
    ],
    faqs: [
      {
        question: "Do you build financial dashboards?",
        answer:
          "Yes. We build dashboards, workflow tools, portals, marketplaces, and MVPs involving financial data and operational workflows.",
      },
      {
        question: "Do you handle financial compliance?",
        answer:
          "We build with privacy and security awareness, but founders should involve legal/compliance specialists for regulated financial products.",
      },
    ],
    links: [
      { href: "/services/startup-app-development", label: "Startup app development" },
      { href: "/services/cto-as-a-service", label: "CTO as a Service" },
      { href: "/blog/how-to-choose-an-mvp-development-agency", label: "Evaluate an MVP partner" },
    ],
  },
  {
    slug: "mvp-for-edtech",
    title: "MVP for EdTech",
    eyebrow: "EdTech MVPs",
    description:
      "MVP development for EdTech startups building learning platforms, course tools, AI tutors, assessment workflows, and education SaaS.",
    audience:
      "Best for education founders who need engaging learning UX, clear product scope, and scalable product foundations.",
    sections: [
      {
        heading: "EdTech MVPs need engagement clarity",
        body:
          "A strong EdTech MVP should make the learning loop obvious: onboarding, content, practice, feedback, progress, and motivation.",
      },
      {
        heading: "AI can support learning workflows",
        body:
          "AI tutors, feedback tools, and adaptive workflows should be designed around learning outcomes rather than novelty.",
      },
      {
        heading: "Measure adoption, not feature count",
        body:
          "An EdTech MVP should make it possible to learn whether students begin, complete, improve, and return before broader platform investment.",
      },
    ],
    faqs: [
      {
        question: "Can you build AI education products?",
        answer:
          "Yes. We can build AI tutors, feedback systems, learning workflows, and EdTech SaaS MVPs.",
      },
      {
        question: "Can you build course platforms?",
        answer:
          "Yes. We can build custom learning portals, course platforms, dashboards, and assessment tools.",
      },
    ],
    links: [
      { href: "/services/ai-product-development", label: "AI product development" },
      { href: "/blog/how-to-build-an-ai-mvp", label: "AI MVP guide" },
      { href: "/services/product-design-services", label: "Product design services" },
    ],
  },
  {
    slug: "mvp-for-e-commerce",
    title: "MVP for E-commerce",
    eyebrow: "E-commerce MVPs",
    description:
      "MVP development for e-commerce startups building marketplaces, custom buying workflows, storefront tools, and commerce operations platforms.",
    audience:
      "Best for commerce founders who need conversion-focused UX, reliable workflows, and custom product experiences beyond generic templates.",
    sections: [
      {
        heading: "Commerce MVPs need conversion clarity",
        body:
          "The product should make discovery, comparison, checkout, fulfillment, or operations easier with clear value for buyers and operators.",
      },
      {
        heading: "Custom commerce should justify itself",
        body:
          "We help founders decide when custom software creates leverage and when existing commerce platforms are enough for early validation.",
      },
      {
        heading: "Protect the buying journey",
        body:
          "Before launch, priority goes to product discovery, trust cues, transaction reliability, operational visibility, and measurable conversion behavior.",
      },
    ],
    faqs: [
      {
        question: "Do you build marketplaces?",
        answer:
          "Yes. We build two-sided marketplaces, custom commerce workflows, vendor portals, and internal commerce operations tools.",
      },
      {
        question: "Should I use Shopify or build custom?",
        answer:
          "If standard commerce flows are enough, Shopify may be faster. Custom development makes sense when the workflow, marketplace, or product logic is differentiated.",
      },
    ],
    links: [
      { href: "/services/web-app-development", label: "Web app development" },
      { href: "/blog/how-to-validate-startup-ideas", label: "Validate startup ideas" },
      { href: "/services/product-design-services", label: "Product design services" },
    ],
  },
] satisfies SeoLandingPage[];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
