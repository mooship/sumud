/**
 * Test-only in-memory `Storage` stand-in for `localStorage`, used wherever a spec needs to
 * stub the global (via `vi.stubGlobal("localStorage", ...)`) to test persistence without
 * touching real browser storage. Returns the backing `Map` too, so a test can assert on what
 * got written without going back through the `Storage` interface.
 */
export function stubStorage(initial: Record<string, string> = {}): {
  storage: Storage;
  store: Map<string, string>;
} {
  const store = new Map(Object.entries(initial));
  const storage: Storage = {
    getItem: (key) =>
      // eslint-disable-next-line unicorn/no-null -- the real Storage interface requires `null`, not `undefined`, for a missing key.
      store.has(key) ? store.get(key)! : null,
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    // eslint-disable-next-line unicorn/no-null -- see above.
    key: () => null,
    get length() {
      return store.size;
    },
  };
  return { storage, store };
}
