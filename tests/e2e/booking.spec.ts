import { expect, test } from "@playwright/test";

const availability = {
  timeZone: "Asia/Calcutta",
  durationMinutes: 30,
  days: [
    {
      date: "2026-06-23",
      label: "Tue, Jun 23",
      slots: [
        {
          start: "2026-06-23T04:30:00.000Z",
          end: "2026-06-23T05:00:00.000Z",
          date: "2026-06-23",
          dateLabel: "Jun 23",
          timeLabel: "10:00 AM - 10:30 AM GMT+5:30",
          weekdayLabel: "Tue",
          timeZone: "Asia/Calcutta",
        },
      ],
    },
  ],
};

test.describe("native booking", () => {
  test("books a Google Meet discovery call from the homepage CTA", async ({ page }) => {
    await page.route("**/api/booking/availability**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(availability),
      });
    });

    await page.route("**/api/booking/book", async (route) => {
      const request = route.request();
      expect(request.method()).toBe("POST");
      const body = request.postDataJSON() as Record<string, string>;
      expect(body.name).toBe("Anika Founder");
      expect(body.email).toBe("founder@example.com");
      expect(body.company).toBe("FounderCo");
      expect(body.start).toBe("2026-06-23T04:30:00.000Z");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Your MVPReady discovery call is booked.",
          booking: {
            eventId: "event_123",
            htmlLink: "https://calendar.google.com/calendar/event?eid=event_123",
            meetLink: "https://meet.google.com/abc-defg-hij",
            start: "2026-06-23T04:30:00.000Z",
            end: "2026-06-23T05:00:00.000Z",
          },
        }),
      });
    });

    await page.goto("/");
    await page.getByRole("button", { name: /Book Free Discovery Call/i }).first().click();

    const dialog = page.getByRole("dialog", { name: /Book a free MVP strategy call/i });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Displayed in");
    await expect(page.locator("[data-booking-portal]")).toHaveCSS("z-index", "999");
    expect(
      await dialog.evaluate((element) => element.closest("[data-booking-portal]")?.parentElement === document.body),
    ).toBe(true);

    await dialog.getByRole("button", { name: /10:00 AM/i }).click();
    await dialog.getByLabel("Name").fill("Anika Founder");
    await dialog.getByLabel("Email").fill("founder@example.com");
    await dialog.getByLabel("Company (optional)").fill("FounderCo");
    await dialog.getByRole("button", { name: "Confirm Google Meet" }).click();

    await expect(dialog.getByRole("heading", { name: "Your call is booked." })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Open Google Meet" })).toHaveAttribute(
      "href",
      "https://meet.google.com/abc-defg-hij",
    );
  });

  test("shows an accessible fallback when availability is unavailable", async ({ page }) => {
    await page.route("**/api/booking/availability**", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Booking is not configured yet." }),
      });
    });

    await page.goto("/");
    await page.getByRole("button", { name: /Book Free Discovery Call/i }).first().click();

    const dialog = page.getByRole("dialog", { name: /Book a free MVP strategy call/i });
    await expect(dialog.getByRole("alert")).toContainText("Booking is not configured yet");
  });
});
