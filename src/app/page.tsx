import type { Metadata } from "next";
import { CaseStudiesSection } from "@/components/sections/home/case-studies-section";
import { FaqSection } from "@/components/sections/home/faq-section";
import { FinalCtaSection } from "@/components/sections/home/final-cta-section";
import { FounderPainSection } from "@/components/sections/home/founder-pain-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { MobileConversionBar } from "@/components/sections/home/mobile-conversion-bar";
import { ProcessSection } from "@/components/sections/home/process-section";
import { DeliveryConfidenceSection } from "@/components/sections/home/delivery-confidence-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";
import { TrustSection } from "@/components/sections/home/trust-section";
import { WhyChooseUsSection } from "@/components/sections/home/why-choose-us-section";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, serviceSchema, webPageSchema, websiteSchema } from "@/lib/seo/schema";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Premium MVP Development Agency for Startup Founders",
  description:
    "Northstar Studio builds investor-ready MVPs, SaaS platforms, and AI products for serious startup founders.",
  path: "/",
  keywords: [
    "MVP development agency",
    "startup MVP developers",
    "AI MVP development company",
    "SaaS MVP agency",
  ],
  image: "/images/case-studies/analytics-platform.jpg",
});

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={serviceSchema()} />
      <JsonLd
        data={webPageSchema({
          name: "Premium MVP Development Agency for Startup Founders",
          description:
            "Northstar Studio builds investor-ready MVPs, SaaS platforms, and AI products for serious startup founders.",
          path: "/",
          topics: ["MVP development agency", "SaaS MVP development", "AI MVP development"],
        })}
      />
      <HeroSection />
      <TrustSection />
      <FounderPainSection />
      <FounderProof />
      <ServicesSection />
      <ProcessSection />
      <DeliveryConfidenceSection />
      <CaseStudiesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <MobileConversionBar />
    </>
  );
}
