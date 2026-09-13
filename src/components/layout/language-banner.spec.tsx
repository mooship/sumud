import { afterEach, describe, expect, it, vi } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { LOCALE_BANNER_DISMISSED_KEY, LOCALE_STORAGE_KEY } from "~/lib/locale";
import { stubStorage } from "~/testing/storage-stub";
import { LanguageBanner } from "./language-banner";

function stubBrowser(languages: string[]) {
  const { storage, store } = stubStorage();
  vi.stubGlobal("navigator", { languages, language: languages[0] });
  vi.stubGlobal("localStorage", storage);
  return store;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("LanguageBanner", () => {
  it("renders nothing when the browser's language matches the current page", async () => {
    stubBrowser(["en-GB"]);
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <LanguageBanner />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector('[role="note"]')).toBeFalsy();
  });

  it("falls back to navigator.language when navigator.languages is unavailable", async () => {
    const { storage } = stubStorage();
    vi.stubGlobal("navigator", { language: "ar-EG" });
    vi.stubGlobal("localStorage", storage);
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <LanguageBanner />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector('[role="note"]')).toBeTruthy();
  });

  it("offers Arabic to a visitor with an Arabic browser language on an English page", async () => {
    stubBrowser(["ar-EG"]);
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <LanguageBanner />
      </QwikCityMockProvider>,
    );
    const banner = screen.querySelector('[role="note"]');
    expect(banner).toBeTruthy();
    expect(banner?.getAttribute("dir")).toBe("rtl");
    const link = screen.querySelector("a")!;
    expect(link.getAttribute("href")).toBe("/ar/history/nakba/");
  });

  it("does not offer anything once the visitor already chose a locale", async () => {
    const store = stubBrowser(["ar-EG"]);
    store.set(LOCALE_STORAGE_KEY, "en");
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <LanguageBanner />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector('[role="note"]')).toBeFalsy();
  });

  it("saves the chosen locale when the offered link is followed", async () => {
    const store = stubBrowser(["ar-EG"]);
    const { screen, render, userEvent } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <LanguageBanner />
      </QwikCityMockProvider>,
    );
    await userEvent(screen.querySelector("a")!, "click");
    expect(store.get(LOCALE_STORAGE_KEY)).toBe("ar");
  });

  it("hides the banner and remembers the dismissal when dismissed", async () => {
    const store = stubBrowser(["ar-EG"]);
    const { screen, render, userEvent } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <LanguageBanner />
      </QwikCityMockProvider>,
    );
    await userEvent(screen.querySelector("button")!, "click");
    expect(store.get(LOCALE_BANNER_DISMISSED_KEY)).toBe("1");
    expect(screen.querySelector('[role="note"]')).toBeFalsy();
  });
});
