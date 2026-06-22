import { expect, test } from "@playwright/test";

test.describe("homepage", () => {
  test("renders premium MVPReady positioning and key CTAs", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/MVPReady - From Idea to MVP/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Launch a scalable MVP with senior product engineering",
    );
    await expect(page.getByRole("link", { name: /Plan your MVP/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore engagements/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /When founders compare MVP partners/i })).toBeVisible();
  });

  test("exposes SEO and AI discovery resources", async ({ page, request }) => {
    await page.goto("/");

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", "https://mvpready.dev");

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();
    const parsed = JSON.parse(jsonLd ?? "{}") as { "@graph"?: Array<{ "@type"?: string }> };
    expect(parsed["@graph"]?.map((node) => node["@type"])).toEqual(
      expect.arrayContaining(["Organization", "WebSite", "ProfessionalService", "WebPage"]),
    );

    const llms = await request.get("/llms.txt");
    await expect(llms).toBeOK();
    const llmsText = await llms.text();
    expect(llmsText).toContain("# MVPReady");
    expect(llmsText).toContain("[MVPReady](https://mvpready.dev)");

    const robots = await request.get("/robots.txt");
    await expect(robots).toBeOK();
    await expect(await robots.text()).toContain("Sitemap: https://mvpready.dev/sitemap.xml");
  });
});
