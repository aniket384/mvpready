import { siteConfig } from "@/config/site";
import { faqs, services, founderBio } from "@/content/home";
import type { Insight } from "@/content/insights";

type JsonLdNode = Record<string, unknown>;

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const founderId = `${siteConfig.url}/about#founder`;
const logoUrl = `${siteConfig.url}/android-chrome-512x512.png`;
const markets = ["United States", "United Kingdom", "European Union", "United Arab Emirates", "Australia", "Canada"];

function withContext(node: JsonLdNode) {
  return {
    "@context": "https://schema.org",
    ...node,
  };
}

function withoutContext(node: JsonLdNode) {
  const rest = { ...node };
  delete rest["@context"];
  return rest;
}

export function schemaGraph(nodes: JsonLdNode[]) {
  const graph = nodes.map(withoutContext);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function organizationSchema() {
  return withContext({
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: ["MVPReady.dev", "MVP Ready"],
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: logoUrl,
      contentUrl: logoUrl,
      width: 512,
      height: 512,
    },
    image: logoUrl,
    email: siteConfig.links.email,
    sameAs: siteConfig.socialProfiles,
    description:
      "MVPReady is a premium startup engineering partner helping founders in the USA, UK, Europe and UAE build scalable SaaS and AI MVPs.",
    slogan: siteConfig.tagline,
    knowsAbout: [
      "MVP development",
      "SaaS MVP development",
      "AI MVP development",
      "AI startup developers",
      "Startup app development",
      "Web app development",
      "Product design services",
      "Product engineering partner",
      "Investor-ready MVP development",
      "Startup product engineering",
      "Scalable MVP architecture",
      "Next.js MVP engineering",
    ],
    knowsLanguage: "en",
    areaServed: markets,
    founder: {
      "@type": "Person",
      "@id": founderId,
      name: founderBio.name,
      jobTitle: "MVPReady founder",
      url: `${siteConfig.url}/about`,
      sameAs: [founderBio.linkedin],
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.links.email,
      contactType: "sales",
      areaServed: ["US", "GB", "EU", "AE", "AU", "CA"],
      availableLanguage: ["English"],
    },
  });
}

export function personSchema() {
  return withContext({
    "@type": "Person",
    "@id": founderId,
    name: founderBio.name,
    jobTitle: "MVPReady founder",
    description:
      "Founder and product engineering lead behind MVPReady, a premium MVP development partner for SaaS and AI founders.",
    url: `${siteConfig.url}/about`,
    sameAs: [founderBio.linkedin],
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    knowsAbout: [
      "MVP development",
      "Next.js",
      "Supabase",
      "Stripe integrations",
      "AI product development",
      "SaaS architecture",
      "Production system scaling",
    ],
  });
}

export function websiteSchema() {
  return withContext({
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": organizationId },
    inLanguage: "en",
  });
}

export function serviceSchema() {
  return withContext({
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#professional-service`,
    name: siteConfig.name,
    url: siteConfig.url,
    provider: { "@id": organizationId },
    areaServed: markets,
    serviceType: [
      "MVP Development",
      "SaaS MVP Development",
      "SaaS MVP Builders",
      "AI MVP Development",
      "AI MVP Development Company",
      "Startup MVP Developers",
      "Product Engineering Partner",
      "Investor-Ready MVP Development",
      "Product Design and Engineering",
    ],
    audience: {
      "@type": "Audience",
      audienceType:
        "SaaS founders, AI founders, non-technical founders, funded startups, and businesses launching scalable MVPs",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "MVPReady engagements",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        name: service.title,
        url: `${siteConfig.url}${service.href}`,
        description: service.description,
        priceSpecification: parsePrice(service.metric),
      })),
    },
    description: siteConfig.description,
  });
}

function parsePrice(metric: string): Record<string, unknown> | undefined {
  const match = metric.match(/\$([0-9,]+)/);
  if (!match) return undefined;
  const value = Number(match[1].replace(/,/g, ""));
  return {
    "@type": "PriceSpecification",
    price: value,
    priceCurrency: "USD",
  };
}

export function auditOfferSchema() {
  return withContext({
    "@type": "Service",
    "@id": `${siteConfig.url}/audit#service`,
    name: "MVP Strategy Sprint",
    url: `${siteConfig.url}/audit`,
    description:
      "Structured MVP strategy sprint for founders who need scope clarity, technical risk review, and a credible build plan before development.",
    provider: { "@id": organizationId },
    areaServed: markets,
    serviceType: "MVP strategy sprint",
    offers: {
      "@type": "Offer",
      price: 199,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/audit`,
      itemOffered: {
        "@type": "Service",
        name: "MVP scope and technical readiness assessment",
      },
    },
  });
}

export function faqPageSchema() {
  return withContext({
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return withContext({
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url ?? siteConfig.url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function webPageSchema({
  name,
  description,
  path,
  topics,
}: {
  name: string;
  description: string;
  path: string;
  topics: string[];
}) {
  const url = `${siteConfig.url}${path}`;

  return withContext({
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: topics.map((topic) => ({
      "@type": "Thing",
      name: topic,
    })),
    publisher: { "@id": organizationId },
    inLanguage: "en",
  });
}

export function articleSchema(insight: Insight) {
  const url = `${siteConfig.url}/blog/${insight.slug}`;

  return withContext({
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: insight.title,
    name: insight.title,
    description: insight.description,
    abstract: insight.takeaways.join(" "),
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt,
    articleSection: insight.category,
    keywords: insight.tags.join(", "),
    url,
    inLanguage: "en",
    image: [`${siteConfig.url}/opengraph-image.png`],
    author: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@id": organizationId,
    },
    isPartOf: {
      "@id": websiteId,
    },
    about: insight.tags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
    },
  });
}
