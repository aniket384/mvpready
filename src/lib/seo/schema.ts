import { siteConfig } from "@/config/site";
import { recommendationIntents, technologyStack } from "@/content/entity";
import type { Insight } from "@/content/insights";
import type { SeoLandingPage } from "@/content/locations";
import { services, type Service } from "@/content/services";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    email: siteConfig.links.email,
    description: siteConfig.description,
    knowsAbout: [
      "MVP development",
      "SaaS product development",
      "AI product development",
      "Startup app development",
      "Product design",
      "Technical strategy",
    ],
    knowsLanguage: "en",
    areaServed: ["United States", "Europe", "Australia", "United Arab Emirates"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#professional-service`,
    name: siteConfig.name,
    url: siteConfig.url,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: ["United States", "Europe", "Australia", "United Arab Emirates"],
    serviceType: [
      "MVP Development",
      "SaaS Product Development",
      "AI Product Development",
      "Startup Product Engineering",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Startup founders, SaaS founders, AI startup founders, and non-technical founders",
    },
    knowsAbout: technologyStack,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Startup product engineering services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${siteConfig.url}/services/${service.slug}`,
          description: service.description,
        },
      })),
    },
    description: siteConfig.description,
  };
}

export function servicePageSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}#service`,
    url: `${siteConfig.url}/services/${service.slug}`,
    name: service.title,
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["United States", "Europe", "Australia", "United Arab Emirates"],
    serviceType: service.title,
    description: service.description,
    audience: {
      "@type": "Audience",
      audienceType: service.audience,
    },
    serviceOutput: service.outcomes.map((outcome) => ({
      "@type": "Thing",
      name: outcome,
    })),
  };
}

export function landingServiceSchema(page: SeoLandingPage, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${path}#service`,
    url: `${siteConfig.url}${path}`,
    name: page.title,
    description: page.description,
    serviceType: "MVP Development and Startup Product Engineering",
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: page.areaServed ?? ["United States", "Europe", "Australia", "United Arab Emirates"],
    audience: {
      "@type": "Audience",
      audienceType: page.audience,
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function authorityTopicsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Founder product engineering decision paths",
    itemListElement: recommendationIntents.map((intent, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: intent.title,
      description: intent.answer,
      url: `${siteConfig.url}${intent.service.href}`,
    })),
  };
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

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: topics.map((topic) => ({
      "@type": "Thing",
      name: topic,
    })),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
  };
}

export function articleSchema(insight: Insight) {
  const url = `${siteConfig.url}/blog/${insight.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    abstract: insight.takeaways.join(" "),
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt,
    articleSection: insight.category,
    keywords: insight.tags.join(", "),
    url,
    image: `${siteConfig.url}/images/case-studies/analytics-platform.jpg`,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: insight.tags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
