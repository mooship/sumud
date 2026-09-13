import { afterEach, describe, expect, it, vi } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { LOCALE_STORAGE_KEY } from "~/lib/locale";
import { stubStorage } from "~/testing/storage-stub";
import { LanguageSwitcher } from "./language-switcher";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("LanguageSwitcher", () => {
  it("links to the Arabic equivalent of the current English page", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <LanguageSwitcher />
      </QwikCityMockProvider>,
    );
    const link = screen.querySelector("a")!;
    expect(link.getAttribute("href")).toBe("/ar/history/nakba/");
    expect(link.getAttribute("hreflang")).toBe("ar");
    expect(link.textContent).toBe("العربية");
  });

  it("links back to the English equivalent of the current Arabic page", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/history/nakba/">
        <LanguageSwitcher />
      </QwikCityMockProvider>,
    );
    const link = screen.querySelector("a")!;
    expect(link.getAttribute("href")).toBe("/history/nakba/");
    expect(link.getAttribute("hreflang")).toBe("en");
    expect(link.textContent).toBe("English");
  });

  it("remembers the chosen locale in localStorage when clicked", async () => {
    const { storage, store } = stubStorage();
    vi.stubGlobal("localStorage", storage);

    const { screen, render, userEvent } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <LanguageSwitcher />
      </QwikCityMockProvider>,
    );
    const link = screen.querySelector("a")!;
    await userEvent(link, "click");
    expect(store.get(LOCALE_STORAGE_KEY)).toBe("ar");
  });
});
