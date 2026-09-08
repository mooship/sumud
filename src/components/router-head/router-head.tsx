import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

const SITE_NAME = "Sumud";
const SITE_URL = "https://sumud.timothybrits.co.za";
const DEFAULT_DESCRIPTION =
  "Sumud tells the story of Palestine and its people, before 1947 and after -- their history, culture, and steadfastness.";

/**
 * Renders everything inside <head>. Page routes set title/meta/links via
 * `useDocumentHead`, this component turns that into actual tags plus the
 * defaults every page should carry (canonical URL, Open Graph, Twitter card).
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const canonical = new URL(loc.url.pathname, SITE_URL).toString();
  const title = head.title ? `${head.title} · ${SITE_NAME}` : SITE_NAME;
  const description =
    head.meta.find((m) => m.name === "description")?.content ??
    DEFAULT_DESCRIPTION;
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
