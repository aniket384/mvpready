import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const isExternalServer = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 7_500,
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["html"], ["github"], ["list"]] : [["list"], ["html"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: isExternalServer
    ? undefined
    : {
        command: "npx next start -H 127.0.0.1",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], browserName: "chromium", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "iphone",
      use: { ...devices["iPhone 13"], browserName: "chromium" },
    },
    {
      name: "android",
      use: { ...devices["Pixel 5"], browserName: "chromium" },
    },
    {
      name: "tablet",
      use: { ...devices["iPad Pro 11"], browserName: "chromium" },
    },
  ],
});
