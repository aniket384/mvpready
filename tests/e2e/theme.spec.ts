import { expect, test } from "@playwright/test";

test("dark mode can be toggled without breaking layout", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /Use (dark|light) theme/i }).first();
  await expect(toggle).toBeVisible();
  await toggle.click();

  await expect(page.locator("html")).toHaveClass(/dark|light/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
