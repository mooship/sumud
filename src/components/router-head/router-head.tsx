import { component$ } from "@builder.io/qwik";
import {
  useDocumentHead,
  useLocation,
  type DocumentMeta,
} from "@builder.io/qwik-city";

const SITE_NAME = "Sumud";
const SITE_URL = "https://sumud.timothybrits.co.za";
const DEFAULT_DESCRIPTION =
  "Sumud tells the story of Palestine and its people, before 1947 and after -- their history, culture, and steadfastness.";

/** Appends the site name to a page's own title, falling back to just the site name on the
 *  homepage (which sets no title of its own). */
export function resolveHeadTitle(
  pageTitle: string | undefined,
  siteName: string = SITE_NAME,
): string {
  return pageTitle ? `${pageTitle} · ${siteName}` : siteName;
}

/** Pulls the page's own `<meta name="description">` content out of `head.meta`, falling back to
 *  the site-wide default for any route that doesn't set one. */
export function resolveHeadDescription(
  meta: readonly DocumentMeta[],
  fallback: string = DEFAULT_DESCRIPTION,
): string {
  return meta.find((m) => m.name === "description")?.content ?? fallback;
}

/**
 * Renders everything inside <head>. Page routes set title/meta/links via
 * `useDocumentHead`, this component turns that into actual tags plus the
 * defaults every page should carry (canonical URL, Open Graph, Twitter card).
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const canonical = new URL(loc.url.pathname, SITE_URL).toString();
  const title = resolveHeadTitle(head.title);
  const description = resolveHeadDescription(head.meta);
  const ogImage = `${SITE_URL}/og-image.png`;

  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#faf6ef"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#151310"
      />

      {head.meta
        .filter((m) => m.name !== "description")
        .map((m) => (
          <meta key={m.key} {...m} />
        ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
