import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { Header } from "./header";

describe("Header", () => {
  it("marks the current nav item with aria-current", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/">
        <Header />
      </QwikCityMockProvider>,
    );
    const nav = screen.querySelector('nav[aria-label="Primary"]');
    const links = Array.from(nav?.querySelectorAll("a") ?? []);
    const current = links.find(
      (link) => link.getAttribute("href") === "/history/",
    );
    const other = links.find(
      (link) => link.getAttribute("href") === "/culture/",
    );
    expect(current?.getAttribute("aria-current")).toBe("page");
    expect(other?.getAttribute("aria-current")).toBeFalsy();
  });

  it("switches to Arabic nav labels, hrefs and the Arabic homepage link under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/history/">
        <Header />
      </QwikCityMockProvider>,
    );
    const nav = screen.querySelector('nav[aria-label="التنقل الرئيسي"]');
    const links = Array.from(nav?.querySelectorAll("a") ?? []);
    expect(
      links.some((link) => link.getAttribute("href") === "/ar/history/"),
    ).toBe(true);
    const homeLink = screen.querySelector('a[href="/ar/"]');
    expect(homeLink).toBeTruthy();
  });

  it("toggles the mobile menu button between open and closed states", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <Header />
      </QwikCityMockProvider>,
    );
    const button = screen.querySelector("button")!;
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(
      screen.querySelector("nav[data-open]")?.getAttribute("data-open"),
    ).toBe("false");

    await userEvent(button, "click");

    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.querySelector("nav[data-open]")?.getAttribute("data-open"),
    ).toBe("true");
  });
});
