import { siteConfig } from "@/config/site";

export function defaultOpenGraphImage(path = "/images/og-default.png") {
  return new URL(path, siteConfig.url).toString();
}
