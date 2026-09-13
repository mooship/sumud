/**
 * `localStorage` access can throw (private browsing in some engines, blocked site data,
 * disabled storage) and the global itself is absent in this project's non-browser unit test
 * environment -- every read/write this site does through it should degrade to a no-op rather
 * than break the page or a test. `getLocalStorage()` uses `typeof` rather than a bare reference
 * so it never throws even where the global isn't declared at all; `storage` is threaded through
 * as a parameter, not read directly inside these functions, so tests can supply a stand-in
 * without touching real browser storage.
 */
export function getLocalStorage(): Storage | undefined {
  return typeof localStorage === "undefined" ? undefined : localStorage;
}

export function safeGetItem(
  storage: Storage | undefined,
  key: string,
): string | undefined {
  if (!storage) return undefined;
  try {
    return storage.getItem(key) ?? undefined;
  } catch {
    return undefined;
  }
}

export function safeSetItem(
  storage: Storage | undefined,
  key: string,
  value: string,
): void {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {
    // Best-effort persistence only -- a failed write just means we ask again next visit.
  }
}
