import { siteConfig } from "@/config/site";

export function canonicalUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
