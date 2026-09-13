import type { RequestHandler } from "@builder.io/qwik-city";

/** Marks every route under `/ar/` as Arabic -- see `src/lib/locale.ts` for how this value flows
 *  into `<html lang dir>` (via `getLocale()` in `root.tsx`) and into `entry.ssr.tsx`'s SSG
 *  render options. Nested layouts run after the root `layout.tsx`'s `onRequest`, so this
 *  overrides its `locale("en")` for anything under this directory. */
export const onRequest: RequestHandler = ({ locale }) => {
  locale("ar");
};
