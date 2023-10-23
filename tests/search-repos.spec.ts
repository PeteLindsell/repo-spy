import { test, expect } from "@playwright/test";

test("page renders as expected", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Repo Spy");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Repo Spy"
  );
});
