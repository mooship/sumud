/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare workers, etc.)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import { DEFAULT_LOCALE, LOCALE_HTML_ATTRS, type Locale } from "./lib/locale";

export default function renderSsr(opts: RenderToStreamOptions) {
  // Qwik City's request handler nests the per-request locale (set via `requestEvent.locale()`
  // in a route's onRequest, see routes/layout.tsx and routes/ar/layout.tsx) under
  // `serverData.locale`, not a top-level `opts.locale` -- there is no such top-level option.
  const locale =
    ((opts.serverData as { locale?: string } | undefined)?.locale as
      Locale | undefined) ?? DEFAULT_LOCALE;
  const { lang, dir } = LOCALE_HTML_ATTRS[locale];

  return renderToStream(<Root />, {
    manifest,
    ...opts,
    containerAttributes: {
      lang,
      dir,
      ...opts.containerAttributes,
    },
    serverData: {
      ...opts.serverData,
    },
  });
}
