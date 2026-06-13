import { expect, test } from "@playwright/test";

test("renders the MiMo Code landing page in Chinese", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "MiMo Code", exact: true })).toBeVisible();
  await expect(page.getByText("面向开发者的新一代 AI 编程助手")).toBeVisible();
  await expect(page.getByText("curl -fsSL https://mimo.xiaomi.com/install | bash")).toBeVisible();
  await expect(page.getByRole("heading", { name: "为什么选择 MiMo Code" })).toBeVisible();
  await expect(page.locator(".card")).toHaveCount(5);
});

test("loads the cloned visual assets", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() =>
    [...document.images].every((img) => img.complete && img.naturalWidth > 0),
  );

  const assets = await page.evaluate(() => {
    const heroBg = getComputedStyle(document.querySelector(".hero__bg")!).backgroundImage;
    const images = [...document.images].map((img) => ({
      src: img.getAttribute("src"),
      complete: img.complete,
      width: img.naturalWidth,
    }));
    return { heroBg, images };
  });

  expect(assets.heroBg).toContain("/coder/assets/");
  expect(assets.images.length).toBeGreaterThanOrEqual(7);
  for (const image of assets.images) {
    expect(image.src).toContain("/coder/assets/");
    expect(image.complete).toBe(true);
    expect(image.width).toBeGreaterThan(0);
  }
});

test("copies the install command", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");

  await page.getByRole("button", { name: "复制命令" }).click();

  await expect(page.getByText("已复制")).toBeVisible();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(
    "curl -fsSL https://mimo.xiaomi.com/install | bash",
  );
});

test("switches language from Chinese to English", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Language" }).click();
  await page.getByRole("menuitem", { name: "English" }).click();

  await expect(page.getByText("Why Choose MiMo Code")).toBeVisible();
  await expect(page.getByText("A next-generation AI coding assistant")).toBeVisible();
  await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();
});
