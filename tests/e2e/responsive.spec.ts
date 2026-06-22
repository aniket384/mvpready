import { expect, test } from "@playwright/test";

test.describe("responsive layouts", () => {
  test("homepage has no horizontal overflow and keeps CTAs reachable", async ({ page }) => {
    await page.goto("/");

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBe(false);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /Plan your MVP/i }).first()).toBeVisible();
  });

  test("blog article is readable with table of contents and related posts", async ({ page }) => {
    await page.goto("/blog/how-to-choose-an-mvp-development-agency");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("How to Choose an MVP Development Agency");
    await expect(page.getByRole("navigation", { name: "Article sections" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Related founder guides" })).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBe(false);
  });
});
