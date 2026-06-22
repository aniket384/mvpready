import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("renders accessible form fields and submits to API", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      const request = route.request();
      expect(request.method()).toBe("POST");
      const body = request.postDataJSON() as Record<string, string>;
      expect(body.name).toBe("Anika Founder");
      expect(body.email).toBe("founder@example.com");
      expect(body.message).toContain("AI workflow");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, message: "Brief received. We will reply with the clearest next step." }),
      });
    });

    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Discuss the MVP");

    await page.getByLabel("Name").fill("Anika Founder");
    await page.getByLabel("Email").fill("founder@example.com");
    await page.getByLabel("Company").fill("FounderCo");
    await page.getByLabel("Budget range").fill("$25k-$75k");
    await page.getByLabel("What are you building?").fill("An AI workflow MVP for customer onboarding.");
    await page.getByRole("button", { name: "Request a build review" }).click();

    await expect(page.getByRole("status")).toContainText("Brief received");
  });

  test("shows graceful API error state", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Online submission is temporarily unavailable." }),
      });
    });

    await page.goto("/contact");
    await page.getByLabel("Name").fill("Anika Founder");
    await page.getByLabel("Email").fill("founder@example.com");
    await page.getByLabel("What are you building?").fill("A SaaS MVP.");
    await page.getByRole("button", { name: "Request a build review" }).click();

    await expect(page.locator("form").getByRole("alert")).toContainText("temporarily unavailable");
    await expect(page.getByRole("link", { name: "Send this brief by email" })).toBeVisible();
  });
});
