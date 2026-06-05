export const siteConfig = {
  name: "Northstar Labs",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vmp-pro.vercel.app",
  description:
    "We finish the MVPs that AI tools couldn't. For non-technical founders pitching investors in the next 30 days.",
  locale: "en_US",
  updatedAt: "2026-05-28",
  links: {
    email: "aniketmishra384@gmail.com",
    linkedin: "https://www.linkedin.com/in/aniket-mishra23",
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "/contact",
  },
};
