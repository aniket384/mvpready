import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Northstar Studio, a premium MVP development and startup product engineering partner.",
  path: "/privacy-policy",
  keywords: ["privacy policy"],
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Privacy Policy", url: `${siteConfig.url}/privacy-policy` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/privacy-policy", label: "Privacy Policy" },
        ]}
        eyebrow="Privacy"
        title="Privacy Policy"
        description="We collect only the information needed to evaluate project inquiries, respond to founders, and operate the website responsibly."
        showActions={false}
      />
      <section className="py-20 sm:py-24">
        <Container size="narrow">
          <div className="space-y-10 text-base leading-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-medium text-foreground">
                Information we collect
              </h2>
              <p className="mt-4">
                When you contact us, we may collect your name, email, company,
                project details, budget range, and any context you choose to share.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-medium text-foreground">
                How we use information
              </h2>
              <p className="mt-4">
                We use submitted information to respond to inquiries, evaluate fit,
                discuss potential engagements, and improve the clarity of our services.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-medium text-foreground">
                Data sharing
              </h2>
              <p className="mt-4">
                We do not sell personal information. If third-party tools are added
                for email, analytics, or CRM workflows, they should be selected with
                privacy and security in mind.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
