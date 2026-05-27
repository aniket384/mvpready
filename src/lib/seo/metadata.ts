import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { seoConfig } from "@/config/seo";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  image = "/images/case-studies/analytics-platform.jpg",
}: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    keywords: [...new Set([...keywords, ...seoConfig.defaultKeywords])],
    category: "Technology",
    creator: siteConfig.name,
    publisher: siteConfig.name,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      publishedTime,
      modifiedTime,
      locale: siteConfig.locale,
      images: [{ url: image, alt: `${siteConfig.name} product engineering` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
