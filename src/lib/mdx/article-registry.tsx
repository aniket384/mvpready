import type { ComponentType } from "react";
import AiMvpDevelopment from "@/content/insights/ai-mvp-development-for-startups.mdx";
import HowToBuildAiMvp from "@/content/insights/how-to-build-an-ai-mvp.mdx";
import HowToChooseAgency from "@/content/insights/how-to-choose-an-mvp-development-agency.mdx";
import HowToValidateIdeas from "@/content/insights/how-to-validate-startup-ideas.mdx";
import MvpCost from "@/content/insights/mvp-development-cost.mdx";
import MvpForNonTechnicalFounders from "@/content/insights/mvp-development-for-non-technical-founders.mdx";
import MvpTimeline from "@/content/insights/mvp-development-timeline.mdx";
import SaasMvpArchitecture from "@/content/insights/saas-mvp-architecture-for-founders.mdx";
import ScalingAfterMvp from "@/content/insights/scaling-a-startup-product-after-mvp.mdx";
import StartupTechStack from "@/content/insights/startup-tech-stack-guide.mdx";

const articleBodies: Record<string, ComponentType> = {
  "ai-mvp-development-for-startups": AiMvpDevelopment,
  "how-to-build-an-ai-mvp": HowToBuildAiMvp,
  "how-to-choose-an-mvp-development-agency": HowToChooseAgency,
  "how-to-validate-startup-ideas": HowToValidateIdeas,
  "mvp-development-cost": MvpCost,
  "mvp-development-for-non-technical-founders": MvpForNonTechnicalFounders,
  "mvp-development-timeline": MvpTimeline,
  "saas-mvp-architecture-for-founders": SaasMvpArchitecture,
  "scaling-a-startup-product-after-mvp": ScalingAfterMvp,
  "startup-tech-stack-guide": StartupTechStack,
};

export function getArticleBody(slug: string) {
  return articleBodies[slug];
}
