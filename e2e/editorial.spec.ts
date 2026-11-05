import { expect, test } from "@playwright/test";

const chapters = [
  "ottoman-palestine",
  "british-mandate",
  "nakba",
  "occupation-and-exile",
  "occupation-and-settlement",
  "oslo-to-blockade",
  "gaza-and-the-present",
];

for (const locale of ["en", "ar"] as const) {
  const prefix = locale === "ar" ? "/ar" : "";

  for (const width of [375, 820, 1024, 1440]) {
    test(`${locale} reading guide at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${prefix}/`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sumud");
      const main = page.getByRole("main");
      await expect(main.getByRole("complementary")).toBeVisible();
      await expect(main.locator("ol li")).toHaveCount(7);
      await expect(main.locator(`a[href="${prefix}/history/"]`)).toHaveCount(1);
      for (const slug of chapters) {
        await expect(
          main.locator(`a[href="${prefix}/history/${slug}/"]`),
        ).toBeVisible();
      }
      await expect(page.locator('header span[lang="ar"]')).toHaveText("صمود");
      const menu = page.locator('button[aria-controls="mobile-nav"]');
      if (width <= 1152) await expect(menu).toBeVisible();
      else await expect(menu).toBeHidden();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await main.locator(`a[href="${prefix}/history/"]`).click();
      await expect(page).toHaveURL(`${prefix}/history/`);
      await page
        .locator(`main a[href="${prefix}/history/ottoman-palestine/"]`)
        .click();
      await expect(page).toHaveURL(`${prefix}/history/ottoman-palestine/`);
      await expect(page.getByRole("article")).toBeVisible();
    });
  }

  test(`${locale} mobile menu and language switch preserve the route`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${prefix}/culture/`);
    const toggle = page.locator('button[aria-controls="mobile-nav"]');
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const nav = page.locator("#mobile-nav");
    await expect(nav).toBeVisible();
    await nav.locator(`a[href="${prefix}/sources/"]`).click();
    await expect(page).toHaveURL(`${prefix}/sources/`);
    await expect(page.locator("#mobile-nav")).toBeHidden();
    await page
      .getByRole("button", {
        name: locale === "ar" ? "فتح القائمة" : "Open menu",
      })
      .click();
    await page
      .locator("#mobile-nav")
      .getByRole("link", {
        name: locale === "ar" ? "English" : "العربية",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(`${locale === "ar" ? "" : "/ar"}/sources/`);
  });
}

test("primary link has readable contrast in both colour schemes, including hover", async ({
  page,
}) => {
  await page.goto("/");
  const link = page.locator('main a[href="/history/"]');
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    for (const isHovered of [false, true]) {
      if (isHovered) await link.hover();
      else await page.mouse.move(0, 0);
      const contrast = await link.evaluate((el) => {
        // eslint-disable-next-line unicorn/consistent-function-scoping -- Runs in the browser, not the test process.
        const luminance = (colour: string) => {
          const rgb = colour.match(/\d+/g)!.slice(0, 3).map(Number);
          const linear = rgb.map((channel) => {
            const value = channel / 255;
            return value <= 0.04045
              ? value / 12.92
              : ((value + 0.055) / 1.055) ** 2.4;
          });
          return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
        };
        const styles = getComputedStyle(el);
        const foreground = luminance(styles.color);
        const background = luminance(styles.backgroundColor);
        return (
          (Math.max(foreground, background) + 0.05) /
          (Math.min(foreground, background) + 0.05)
        );
      });
      expect(
        contrast,
        `${colorScheme}, hover=${isHovered}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("skip link is keyboard accessible", async ({ page }) => {
  await page.goto("/");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

for (const locale of ["en", "ar"] as const) {
  test(`${locale} search finds the culture article without CSP errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });
    const prefix = locale === "ar" ? "/ar" : "";
    await page.goto(`${prefix}/search/`);
    await page
      .getByRole("textbox")
      .fill(locale === "ar" ? "التطريز" : "tatreez");
    const result = page.getByRole("main").getByRole("link", {
      name: locale === "ar" ? "الثقافة والصمود" : "Culture & Sumud",
      exact: true,
    });
    await expect(result).toHaveAttribute("href", `${prefix}/culture/`);
    await result.click();
    await expect(page).toHaveURL(`${prefix}/culture/`);
    expect(errors).toEqual([]);
  });
}

test("WebAssembly permission is scoped to search and its worker", async ({
  request,
}) => {
  for (const route of [
    "/search/",
    "/ar/search/",
    "/pagefind/pagefind-worker.js",
  ]) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-security-policy"]).toContain(
      "'wasm-unsafe-eval'",
    );
    expect(response.headers()["content-security-policy"]).not.toContain(
      "'unsafe-eval'",
    );
  }
  const home = await request.get("/");
  expect(home.headers()["content-security-policy"]).not.toContain(
    "'wasm-unsafe-eval'",
  );
});

test("English and Arabic reading routes render without browser errors or overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => {
    errors.push(error.message);
  });
  await page.setViewportSize({ width: 375, height: 812 });
  for (const prefix of ["", "/ar"]) {
    for (const route of [
      "/",
      "/history/",
      "/culture/",
      "/about/",
      "/sources/",
      "/further-reading/",
      "/glossary/",
      "/search/",
      "/take-action/",
      "/privacy/",
      ...chapters.map((slug) => `/history/${slug}/`),
    ]) {
      const response = await page.goto(`${prefix}${route}`);
      expect(response?.status(), `${prefix}${route}`).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${prefix}${route}`,
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
