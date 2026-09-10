export const SEARCH_MOUNT_ID = "pagefind-search";

export interface PagefindWindow {
  PagefindUI?: new (options: {
    element: string;
    showSubResults?: boolean;
  }) => unknown;
}

const SCRIPT_ID = "pagefind-ui-script";

function initPagefindUI(doc: Document): void {
  const PagefindUI = (doc.defaultView as (Window & PagefindWindow) | null)
    ?.PagefindUI;
  if (PagefindUI) {
    new PagefindUI({
      element: `#${SEARCH_MOUNT_ID}`,
      showSubResults: true,
    });
  }
}

/**
 * Injects Pagefind's self-hosted UI assets (built by `pnpm run search.index`
 * into `dist/pagefind/`, so these are always same-origin) and instantiates
 * `PagefindUI` against {@link SEARCH_MOUNT_ID} once the script has loaded.
 * Pagefind isn't a Qwik-aware library, so this is deliberately plain DOM
 * manipulation rather than a component.
 *
 * `document` persists across Qwik City's client-side route navigations, so a
 * visitor leaving `/search/` and coming back within the same session would
 * otherwise remount this and re-inject (and re-fetch) the script every time.
 * Guard on the script tag's id: once it exists, either it's still loading (its
 * own `load` listener will call `initPagefindUI`) or it already ran, in which
 * case `PagefindUI` is already on `window` and can be reused directly.
 */
export function loadPagefindUI(doc: Document): void {
  if (doc.querySelector(`#${SCRIPT_ID}`)) {
    initPagefindUI(doc);
    return;
  }

  const link = doc.createElement("link");
  link.rel = "stylesheet";
  link.href = "/pagefind/pagefind-ui.css";
  // appendChild, not append: @cloudflare/workers-types declares a global HTMLRewriter
  // `Element` interface that merges into DOM's own `Element`, and its `append(content:
  // string | ReadableStream | Response)` shadows the real one -- appendChild isn't on
  // that interface, so it keeps the standard DOM signature.
  // eslint-disable-next-line unicorn/prefer-dom-node-append
  doc.head.appendChild(link);

  const script = doc.createElement("script");
  script.id = SCRIPT_ID;
  script.src = "/pagefind/pagefind-ui.js";
  script.addEventListener("load", () => initPagefindUI(doc));
  // eslint-disable-next-line unicorn/prefer-dom-node-append -- see the comment above.
  doc.body.appendChild(script);
}
