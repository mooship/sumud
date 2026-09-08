# Sumud (صمود)

The story of Palestine and its people, before 1947 and after: history, culture, and the
steadfastness the site is named for.

**[sumud.timothybrits.co.za](https://sumud.timothybrits.co.za)**

Sumud is an independent, non-commercial project. It has no ads and no trackers. See
[`/about/`](https://sumud.timothybrits.co.za/about/) for what it is and
[`/sources/`](https://sumud.timothybrits.co.za/sources/) for how it was researched.

## Stack

- **[Qwik](https://qwik.dev/) + Qwik City** -- resumable rendering, file-based routing, built-in
  Markdown/MDX support for the long-form chapters.
- **TypeScript**, strict mode throughout.
- **[vanilla-extract](https://vanilla-extract.style/)** -- zero-runtime, type-safe CSS. See
  [`src/styles/theme.css.ts`](src/styles/theme.css.ts) for the design tokens.
- **[Fontsource](https://fontsource.org/)** (self-hosted variable fonts: Inter, Newsreader) +
  **[Fontaine](https://github.com/unjs/fontaine)** (auto-generated, metric-matched fallback
  fonts, to keep layout shift near zero on font swap).
- **[Lucide](https://lucide.dev/)** icons, vendored as small generated Qwik components (see
  [Icons](#icons) below) rather than an unmaintained Qwik wrapper package.
- **clsx** for conditional class names.
- **[Vitest](https://vitest.dev/)** for content/data integrity tests.
- **Cloudflare Workers** (static assets + a small Worker for fallback/404 handling), deployed
  with **Wrangler**.

## Getting started

Requires Node 22+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev          # start the dev server at http://localhost:5173
```

Other scripts:

```bash
pnpm build        # production build (client + SSR worker + type check)
pnpm preview       # build, then run it locally through `wrangler dev`
pnpm test          # run the Vitest suite once
pnpm test.watch    # Vitest in watch mode
pnpm lint          # ESLint
pnpm fmt           # Prettier, write mode
pnpm typecheck     # tsc --noEmit
pnpm check         # lint + typecheck + test + build, in that order
pnpm icons         # regenerate src/components/ui/icons/ from lucide-static
```

## Project structure

```
src/
  routes/                  file-based routes (Qwik City)
    history/
      index.tsx             history hub / timeline
      (chapter)/             pathless layout group -- shared chapter chrome
        layout.tsx            header, prev/next nav, Article JSON-LD
        nakba/index.mdx        one .mdx file per chapter
        ...
    culture/, about/         single long-form MDX pages with a shared ArticleShell
    sources/, take-action/   data-driven pages (see src/content/)
  components/
    layout/                 header, footer, article shell
    ui/                     Container, Prose, PullQuote, ButtonLink, icons/
    seo/                    JSON-LD helper
  content/                  typed content data (nav, history chapter metadata,
                             sources, organisations) -- edit these, not JSX, to
                             change what appears in listings/nav
  styles/                   theme tokens, global styles, font imports
adapters/cloudflare-pages/  Cloudflare build (Qwik's adapter name predates the
                             Pages -> Workers-with-assets migration; it still
                             produces the right output for a Worker)
public/                     static files, copied as-is: favicon, manifest,
                             robots.txt, llms.txt, _headers, generated icons/OG image
scripts/                    generate-icons.mjs, generate-images.mjs -- regenerate
                             committed assets from source (lucide-static, hand-drawn SVG)
```

### Editing content

- **A history chapter**: edit its `index.mdx` directly (frontmatter: `title`, `description`,
  `period`). Chapter order and the hub-page summaries live in
  [`src/content/history-chapters.ts`](src/content/history-chapters.ts) -- a Vitest test asserts
  every chapter listed there has a matching `.mdx` file on disk.
- **Sources / further reading**: [`src/content/sources.ts`](src/content/sources.ts).
- **Take Action organisations**: [`src/content/organisations.ts`](src/content/organisations.ts).
- **Nav links**: [`src/content/nav.ts`](src/content/nav.ts).

### Icons

Lucide has no actively maintained Qwik binding, so icons are generated as plain Qwik
components from [`lucide-static`](https://www.npmjs.com/package/lucide-static)'s SVG source by
[`scripts/generate-icons.mjs`](scripts/generate-icons.mjs). To add an icon: add its lucide file
name to the `ICONS` map in that script, then run `pnpm icons`.

## Deployment

The site deploys to Cloudflare Workers (static assets + a small Worker for the 404 page and any
non-prerendered route) at `sumud.timothybrits.co.za`, configured in
[`wrangler.jsonc`](wrangler.jsonc). Every page is statically generated at build time
(`ssg.include: ["/*"]`); the Worker itself only runs for what the static asset layer can't
serve.

```bash
pnpm build
npx wrangler deploy
```

`wrangler deploy` provisions the custom domain route automatically -- the `timothybrits.co.za`
zone just needs to already be active on the Cloudflare account, which it is.

**CI/CD**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs lint/typecheck/test/build
on every push and PR. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) deploys on
push to `main`, and needs two repository secrets to actually run:

- `CLOUDFLARE_API_TOKEN` -- a token with Workers Scripts:Edit permission
- `CLOUDFLARE_ACCOUNT_ID`

Until those are added, the CI workflow still runs (and gates merges); the deploy workflow will
simply fail at the deploy step.

### Cloudflare configuration

- **Static assets**: `[assets]` in `wrangler.jsonc`, serving `dist/` directly at the edge --
  requests for prerendered pages never invoke the Worker.
- **Headers**: [`public/_headers`](public/_headers) sets security headers (CSP, HSTS, frame
  options, permissions policy, etc.) and long-lived immutable caching for hashed build output
  and fonts. Because `_headers` only applies to static-asset responses, the same header set is
  applied in code in [`src/entry.cloudflare-pages.tsx`](src/entry.cloudflare-pages.tsx) for
  anything the Worker renders itself (the 404 page).
- **Observability**: `[observability]` enables Workers Logs at 100% sampling -- fine for a
  low-traffic content site; turn `head_sampling_rate` down if that changes.
- **Build cache**: CI uses `actions/setup-node`'s built-in pnpm store cache
  (`cache: pnpm` in `ci.yml`/`deploy.yml`), so dependency installs are fast on repeat runs.

## SEO & "LLM" readiness

- Every page ships a canonical URL, Open Graph/Twitter meta, and JSON-LD (`WebSite` on the
  homepage, `Article` on every chapter) -- see [`src/components/seo/json-ld.tsx`](src/components/seo/json-ld.tsx).
- [`public/llms.txt`](public/llms.txt) is a plain-language, linked summary of the site for AI
  agents/crawlers, per the emerging [llms.txt convention](https://llmstxt.org/) -- Chrome
  Lighthouse's Agentic Browsing audits check for it.
- `sitemap.xml` is generated automatically at build time from the real route list; `robots.txt`
  points to it.
- Semantic HTML (headings, `<article>`, `<nav>`, skip link, autolinked chapter headings) and a
  single, consistent typographic system throughout, rather than per-page one-offs.

## Accessibility

Skip-to-content link, visible focus rings, a real heading hierarchy, `prefers-reduced-motion`
support, and a dark theme driven purely by `prefers-color-scheme` (no JS, no flash of wrong
theme). Colour choices are checked against WCAG AA contrast, not just picked by eye -- see
`src/styles/theme.css.ts`.

## Mobile & notch support

`viewport-fit=cover` + `apple-mobile-web-app-status-bar-style: black-translucent` let the page
draw edge-to-edge on iOS, so content uses `env(safe-area-inset-*)` (via `max()` in
`Container`, and directly in the header/body) to stay clear of the notch, Dynamic Island and
home indicator rather than sitting flush against them. All interactive targets (nav links, the
mobile menu button, buttons) are sized to at least 44×44px per the WCAG/iOS/Material touch
target guidelines.

## Design system notes

- **Decorative motif**: `OrnamentDivider` (`src/components/ui/ornament-divider.tsx`) is a
  repeating diamond pattern in the spirit of Palestinian tatreez cross-stitch, used as a section
  divider instead of a plain rule. Reuse it rather than inventing another divider style.
- **Icon badges**: feature cards and section groups put their icon in a coloured circle
  (`cardIconBadge` / `groupIconBadge` patterns) rather than a bare icon -- keep this consistent
  when adding new card grids.
- **Paper grain**: `body` has a barely-there SVG noise texture (see `global.css.ts`) rather than
  a flat fill, echoing the "parchment" palette. Don't stack more texture on top of it.

## Licence

Code and original content are dedicated to the public domain under
[CC0 1.0](LICENSE). Quoted material (e.g. the Darwish epigraph) belongs to its respective
rights holders and is used here under fair use for commentary/education.
