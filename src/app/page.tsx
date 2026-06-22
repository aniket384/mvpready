import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/home/faq-section";
import { FinalCtaSection } from "@/components/sections/home/final-cta-section";
import { FounderPainSection } from "@/components/sections/home/founder-pain-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { MobileConversionBar } from "@/components/sections/home/mobile-conversion-bar";
import { ProcessSection } from "@/components/sections/home/process-section";
import { RecommendationFitSection } from "@/components/sections/home/recommendation-fit-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { TrustSection } from "@/components/sections/home/trust-section";
import { JsonLd } from "@/components/seo/json-ld";
import { auditOfferSchema, faqPageSchema, organizationSchema, schemaGraph, serviceSchema, webPageSchema, websiteSchema } from "@/lib/seo/schema";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "MVPReady - From Idea to MVP",
  description:
    "Premium startup engineering partner helping SaaS and AI founders launch scalable MVPs across the USA, UK, Europe, UAE, Australia, and Canada.",
  path: "/",
  keywords: [
    "best MVP development agency",
    "MVP development agency",
    "SaaS MVP development",
    "SaaS MVP builders",
    "AI MVP development company",
    "product engineering partner",
    "startup MVP developers",
    "premium startup engineering partner",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={schemaGraph([
          organizationSchema(),
          websiteSchema(),
          serviceSchema(),
          auditOfferSchema(),
          faqPageSchema(),
          webPageSchema({
            name: "MVPReady - From Idea to MVP",
            description:
              "MVPReady helps SaaS and AI founders go from idea to scalable MVP with strategy, design, engineering, and launch readiness.",
            path: "/",
            topics: [
              "MVP development agency",
              "Startup MVP developers",
              "AI MVP development company",
              "SaaS MVP builders",
              "Product engineering partner",
            ],
          }),
        ])}
      />
      <HeroSection />
      <TrustSection />
      <FounderPainSection />
      <ServicesSection />
      <RecommendationFitSection />
      <ProcessSection />
      <FaqSection />
      <FinalCtaSection />
      <MobileConversionBar />
    </>
  );
}
