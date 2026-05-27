import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { FounderProof } from "@/components/sections/shared/founder-proof";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { locations } from "@/content/locations";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "Global MVP Development Company for Founders",
  description:
    "Premium MVP development for founders in the USA, Dubai, Australia, Europe, and global startup markets.",
  path: "/locations",
  keywords: ["MVP development company USA", "MVP development agency Dubai"],
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Global MVP Development Company for Founders",
          description: "Premium MVP development for founders in the USA, Dubai, Australia, Europe, and global startup markets.",
          path: "/locations",
          topics: ["MVP development company USA", "MVP development agency Dubai", "MVP development Europe", "MVP development Australia"],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Locations", url: `${siteConfig.url}/locations` },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/locations", label: "Locations" },
        ]}
        eyebrow="Locations"
        title="Remote MVP development for global startup markets."
        description="Senior product engineering for founder teams in the USA, Dubai and the UAE, Australia, and Europe, delivered through clear remote collaboration and ownership."
      />
      <FounderProof />
      <section className="py-20 sm:py-24">
        <Container>
          <p className="mb-10 max-w-3xl text-sm leading-7 text-muted-foreground">
            Northstar Studio works remotely with founders in these markets. These pages describe market fit and delivery considerations; they do not imply a local office.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link key={location.slug} href={`/locations/${location.slug}`}>
                <Card className="h-full">
                  <p className="text-sm font-medium text-accent">{location.eyebrow}</p>
                  <h2 className="mt-4 text-2xl font-medium">
                    {location.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {location.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Build with a remote senior partner."
        description="Discuss an MVP, SaaS, or AI product for your market with a delivery process designed for clear founder decisions and ownership."
      />
    </>
  );
}
