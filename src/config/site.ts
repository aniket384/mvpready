export const siteConfig = {
  name: "MVPReady",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mvpready.dev",
  description:
    "Premium startup engineering partner helping SaaS and AI founders launch scalable MVPs.",
  locale: "en_US",
  updatedAt: "2026-06-22",
  tagline: "From Idea to MVP.",
  links: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@mvpready.dev",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/aniket-mishra23",
    twitter: process.env.NEXT_PUBLIC_X_URL,
    github: process.env.NEXT_PUBLIC_GITHUB_URL,
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL,
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "/contact",
  },
  socialProfiles: [
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/aniket-mishra23",
    process.env.NEXT_PUBLIC_X_URL,
    process.env.NEXT_PUBLIC_GITHUB_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
  ].filter((url): url is string => Boolean(url)),
};
