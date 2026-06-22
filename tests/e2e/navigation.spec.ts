import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("desktop navigation reaches core pages", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop navigation is hidden on mobile viewports.");

    await page.goto("/");

    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Strategy Sprint" }).click();
    await expect(page).toHaveURL(/\/audit$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Make the MVP build clear");

    await page.getByRole("link", { name: "MVPReady home" }).click();
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("MVPReady helps founders");
  });

  test("mobile menu opens, navigates, and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu is only visible on mobile/tablet projects.");

    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();

    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("MVPReady helps founders");
  });
});
