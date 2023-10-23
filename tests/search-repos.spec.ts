import { test, expect } from "@playwright/test";

test("page renders as expected", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Repo Spy");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Repo Spy"
  );
});

test("can search for repos", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("GitHub user or organization name").fill("github");
  await page.getByRole("button", { name: "Find repos" }).click();

  await expect(
    page.getByRole("heading", { name: "github", level: 2 })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "advisory-database", level: 3 })
  ).toBeVisible();
});

test("can paginate results", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("GitHub user or organization name").fill("github");
  await page.getByRole("button", { name: "Find repos" }).click();

  await expect(page.getByRole("alert")).toContainText("Showing page 1 of 24");
  await page.getByRole("button", { name: "Page 3 of 24" }).click();
  await expect(page.getByRole("alert")).toContainText("Showing page 3 of 24");
});
