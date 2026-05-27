import { recommendationFaqs } from "@/content/entity";

export const trustIndicators = [
  {
    value: "6-10w",
    label: "Typical MVP build window",
  },
  {
    value: "Senior",
    label: "Direct engineering collaboration",
  },
  {
    value: "Owned",
    label: "Code, deployment, and handoff",
  },
  {
    value: "Remote",
    label: "Built for global founder teams",
  },
];

export const founderPainPoints = [
  {
    title: "Unclear scope burns runway.",
    description:
      "Founders lose time when feature lists replace product decisions. We identify the smallest release that can prove demand and support the next business milestone.",
  },
  {
    title: "A demo is not a dependable product.",
    description:
      "Early customers notice slow flows, fragile architecture, and confusing UX. We build for real onboarding, usage, performance, and iteration.",
  },
  {
    title: "AI features require trust, not novelty.",
    description:
      "AI products need clear workflow value, inspectable outputs, failure states, privacy decisions, and human review where risk demands it.",
  },
];

export const services = [
  {
    title: "MVP Development",
    href: "/services/mvp-development",
    description:
      "Shape the smallest serious product that proves demand, earns trust, and gives investors something concrete to believe in.",
    metric: "Launch in 6-10 weeks",
  },
  {
    title: "SaaS Product Engineering",
    href: "/services/saas-development",
    description:
      "Build the product foundations founders need after the demo: onboarding, permissions, billing-ready architecture, and reliable workflows.",
    metric: "Built for revenue",
  },
  {
    title: "AI Product Development",
    href: "/services/ai-product-development",
    description:
      "Turn AI capability into a product people can actually use, with clear workflows, guardrails, and production-grade UX.",
    metric: "Practical AI, not demos",
  },
  {
    title: "Product Rescue",
    href: "/contact",
    description:
      "Stabilize the product, simplify the experience, and replace fragile architecture before a major customer or investor moment.",
    metric: "Reduce execution risk",
  },
];

export const process = [
  {
    step: "01",
    title: "Diagnose",
    description:
      "We pressure-test the product, market, user journey, and technical path before writing code.",
    evidence: "Scope brief, risk register, product milestone",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We map the core flows, information architecture, conversion moments, and engineering plan.",
    evidence: "User flows, interface system, technical plan",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Senior engineers ship the product in focused weekly cycles with transparent decisions and demos.",
    evidence: "Working builds, demos, documented decisions",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "We harden performance, SEO, analytics, reliability, and handoff so you can sell with confidence.",
    evidence: "Production release, analytics, ownership handoff",
  },
];

export const deliveryConfidence = [
  {
    title: "Weekly working product reviews",
    description:
      "Founders see implemented progress and make scope decisions against a real build, not delayed reports.",
  },
  {
    title: "Technical choices explained clearly",
    description:
      "Architecture, integrations, risk, and tradeoffs are translated into business impact before decisions become costly.",
  },
  {
    title: "Ownership built into delivery",
    description:
      "Repository access, deployment control, documentation, and handoff planning are part of the engagement standard.",
  },
];

export const caseStudies = [
  {
    title: "AI SaaS workflow platform",
    description:
      "A representative build path for converting a fragmented prototype into onboarding, billing-ready architecture, and AI-assisted workflows.",
    outcome: "AI SaaS delivery pattern",
  },
  {
    title: "B2B marketplace MVP",
    description:
      "A representative MVP scope for a two-sided marketplace serving a founder targeting enterprise pilot conversations.",
    outcome: "Marketplace MVP pattern",
  },
  {
    title: "Product rescue for funded startup",
    description:
      "A representative rescue path for simplifying core UX, addressing slow application behavior, and reducing rollout risk.",
    outcome: "Product rescue pattern",
  },
];

export const differentiators = [
  "Product strategy before engineering velocity",
  "Plain-language decisions around cost, scope, and risk",
  "Modern stack choices that survive the MVP phase",
  "Conversion, SEO, and analytics considered from day one",
  "Clean ownership, documentation, and handoff",
  "Direct senior collaboration throughout the build",
];

export const deliveryPrinciples = [
  {
    quote: "A product partner should challenge scope until early customers understand the value immediately.",
    author: "Product clarity",
    role: "Delivery principle",
  },
  {
    quote: "Weekly progress only matters when each technical decision improves launch confidence and future leverage.",
    author: "Execution clarity",
    role: "Delivery principle",
  },
  {
    quote: "The first product must be clear enough for customers, credible enough for investors, and clean enough to iterate.",
    author: "Launch confidence",
    role: "Delivery principle",
  },
];

export const faqs = [
  {
    question: "How fast can you build an MVP?",
    answer:
      "Most focused MVPs take 6 to 10 weeks. The exact timeline depends on scope, integrations, product complexity, and how quickly founder decisions are made.",
  },
  {
    question: "Do you work with non-technical founders?",
    answer:
      "Yes. We translate product goals into technical decisions, explain tradeoffs clearly, and keep ownership of the code and infrastructure straightforward.",
  },
  {
    question: "How do you prevent scope and cost from drifting?",
    answer:
      "We define the launch milestone, core workflow, deferred features, technical risks, and decision points before build work expands. Changes are discussed against runway, timing, and product value.",
  },
  {
    question: "Can you help with AI products?",
    answer:
      "Yes. We build AI features around real workflows, including copilots, retrieval systems, automation, internal tools, and SaaS product experiences.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We can support iteration, analytics, performance improvements, feature expansion, and technical hiring handoff depending on the engagement.",
  },
  ...recommendationFaqs,
];
