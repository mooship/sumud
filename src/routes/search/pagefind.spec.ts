import { describe, expect, it, vi } from "vitest";
import { Window } from "happy-dom";
import {
  loadPagefindUI,
  SEARCH_MOUNT_ID,
  type PagefindWindow,
} from "./pagefind";

function createTestDoc() {
  const window = new Window();
  const doc = window.document as unknown as Document;
  return { window, doc };
}

/** happy-dom's own `Event` class satisfies `Element#dispatchEvent` at runtime, but its
 *  typings don't structurally match lib.dom's `Event` (missing `isTrusted` etc). */
function dispatchLoad(window: Window, target: Element | null) {
  target?.dispatchEvent(new window.Event("load") as unknown as Event);
}

describe("loadPagefindUI", () => {
  it("injects the pagefind stylesheet and script tags, same-origin", () => {
    const { doc } = createTestDoc();
    loadPagefindUI(doc);
    expect(
      doc.querySelector('link[rel="stylesheet"]')?.getAttribute("href"),
    ).toBe("/pagefind/pagefind-ui.css");
    expect(doc.querySelector("script")?.getAttribute("src")).toBe(
      "/pagefind/pagefind-ui.js",
    );
  });

  it("instantiates PagefindUI against the mount element once the script loads", () => {
    const { window, doc } = createTestDoc();
    const PagefindUI = vi.fn();
    (window as unknown as PagefindWindow).PagefindUI = PagefindUI;
    loadPagefindUI(doc);

    dispatchLoad(window, doc.querySelector("script"));

    expect(PagefindUI).toHaveBeenCalledWith({
      element: `#${SEARCH_MOUNT_ID}`,
      showSubResults: true,
    });
  });

  it("does nothing if PagefindUI never becomes available", () => {
    const { window, doc } = createTestDoc();
    loadPagefindUI(doc);
    const script = doc.querySelector("script");
    expect(() => dispatchLoad(window, script)).not.toThrow();
  });
});
