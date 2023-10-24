import { test, expect } from "@playwright/test";

// TODO stub api endpoints to prevent testing somebody elses application
// and to give deterministic results
test.describe("Repo Spy", () => {
  test("page renders as expected", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Repo Spy");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Search for GitHub repos"
    );
  });

  test("can search for GitHub userName", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("GitHub user or organization name").fill("github");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(
      page.getByRole("heading", { name: "GitHub", level: 2 })
    ).toBeVisible();
    await expect(page.getByText("How people build software.")).toBeVisible();
    await expect(page.getByRole("table").locator("tr").first()).toContainText(
      "🌎 LocationSan Francisco, CA"
    );
  });

  test("can paginate results", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("GitHub user or organization name").fill("github");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByRole("alert")).toContainText(/Showing page 1 of/);
    await page.getByRole("button", { name: /Page 3 of/ }).click();
    await expect(page.getByRole("alert")).toContainText(/Showing page 3 of/);
    await expect(
      page.getByRole("heading", { name: "advisory-database", level: 3 })
    ).not.toBeVisible();
  });

  test("can filter results", async ({ page }) => {
    const requestPromise = page.waitForRequest((request) =>
      request.url().includes("https://api.github.com/search/repositories")
    );

    await page.goto("/");
    await page.getByLabel("GitHub user or organization name").fill("github");
    await page.getByRole("button", { name: "Search" }).click();

    await page.getByLabel("Language").fill("typescript");
    await page.getByLabel("Topics").fill("package");
    await page.getByLabel("License").fill("MIT");

    await page.getByRole("button", { name: "Update Filters" }).click();

    const request = await requestPromise;
    expect(request.url()).toEqual(
      "https://api.github.com/search/repositories?page=1&per_page=20&sort=updated&q=fork%3Atrue+template%3Afalse+user%3Agithub"
    );
  });
});
