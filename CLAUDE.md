# CLAUDE.md

Guidance for Claude Code (or any agent) working in this repository.

## What this is

Sumud tells the story of Palestine and its people, before 1947 and after, at
sumud.timothybrits.co.za. It's a content site first, a tech demo second: most of the value is in
the prose (`src/routes/**/*.mdx`) and the content data (`src/content/*.ts`), not the framework
plumbing. Stack: Qwik + Qwik City (SSG), TypeScript, vanilla-extract, Vitest, deployed as static
output plus a thin Cloudflare Pages Worker.

## Safety

- **Never deploy to production (`wrangler deploy`) without explicit permission from the user.**
  Always ask first and wait for confirmation.

## Before touching historical/factual content

- **Prose must read as human-written, not AI-generated**: no listicle cadence, no "in
  conclusion," no hedging filler, no em dashes (use commas, colons, or parentheses -- and when
  you do need a dash, it's a spaced `--`, not `—`). Read a paragraph out loud before committing
  to it.
- **British English spelling** throughout (organisation, colour, licence as a noun, -ise not
  -ize).
- **Sourcing matters**: this covers genuinely contested history. Casualty/displacement figures,
  especially for anything post-2023, must be attributed to a source ("according to Gaza's
  Health Ministry...") rather than stated as bare fact. When historians disagree (e.g. the scale
  and intent behind 1948 expulsions), say so rather than picking a side silently. See
  `src/routes/sources/index.tsx` / `src/content/sources.ts` for the kind of sourcing already in
  use, and add to it rather than inventing citations.
- **Don't add a "Take Action" organisation, book, quote, or claimed statistic without being able
  to justify it** -- this is a real-world sensitive-topics site, not a placeholder demo. Every
  entry in `src/content/organisations.ts` and `src/content/books.ts` should be a real,
  independently verifiable organisation or book, not one assembled from a vague memory of the
  genre. If asked to add current-events content, search for what's actually happened recently
  rather than extrapolating from training data; the situation changes fast and the existing
  "present day" chapter (`src/routes/history/(chapter)/gaza-and-the-present/index.mdx`) is
  deliberately dated by its own last-verified facts.

## Adding or changing a page

Several places have to move together, and only some of them are wired up automatically -- get
this wrong and a page either 404s in nav, or silently never appears anywhere but its own URL.

- **A new route directory under `src/routes/` is enough to make it live and indexed.** The
  Cloudflare Pages adapter (`adapters/cloudflare-pages/vite.config.ts`) runs Qwik City's SSG with
  `ssg.include: ["/*"]`, so `pnpm build` prerenders every route it finds and regenerates
  `dist/sitemap.xml` from the same crawl -- no per-route registration needed for either.
- **Header nav and footer are not automatic in the same way.** Add the route to `NAV_ITEMS` in
  `src/content/nav.ts` to have it appear in the header (`src/components/layout/header.tsx`); the
  footer's "Read" column (`src/components/layout/footer.tsx`) renders straight from the same
  `NAV_ITEMS` array, so you only add it once. `src/content/nav.spec.ts` fails the build if a nav
  entry's href has no matching `index.tsx`/`index.mdx`, so a typo'd route is caught immediately.
- **`public/llms.txt` is hand-maintained and nothing checks it.** It's a plain-language sitemap
  for LLM crawlers; update its route list by hand whenever a page is added, removed or retitled.
  Nothing in the build or test suite will remind you.
- **Pick the right shared shell for a new long-form page.** A standalone MDX page outside the
  history sequence (About, Culture, Privacy) wraps its content in `<ArticleShell eyebrow="...">`
  (`src/components/layout/article-shell.tsx`) for the title header and `Prose` styling. A new
  _history chapter_ instead goes inside `src/routes/history/(chapter)/` and needs an entry added
  to `HISTORY_CHAPTERS` in `src/content/history-chapters.ts` (slug order there drives the
  prev/next links) -- see "Pathless layout groups" below for what that shell gives it for free.
  A page with bespoke layout needs (like Take Action, Sources, Further Reading, or the homepage)
  is just a plain `index.tsx` built from `Container` and hand-written `index.css.ts`, following
  whichever of those is closest in shape.
- **Structured content data gets a sibling spec file.** Every `src/content/*.ts` list
  (`organisations.ts`, `sources.ts`, `books.ts`, `history-chapters.ts`, `nav.ts`) has a matching
  `*.spec.ts` asserting the boring-but-important invariants: no duplicate names/titles, every
  description over some minimum length, every URL is `https:` and parses. Follow that pattern for
  a new content file rather than skipping the spec or inventing a different shape of test.
- **Every route component gets an `index.spec.tsx`** rendering it through `createDOM()` +
  `QwikCityMockProvider` and asserting on `head.title`/`head.meta` and on the rendered content
  (see `src/routes/take-action/index.spec.tsx` or `src/routes/further-reading/index.spec.tsx` for
  the shape). Note `screen` from `createDOM()` is the rendered root element itself, not a
  `document` -- use `screen.querySelectorAll(...)` / `screen.textContent` directly, there is no
  `screen.body`.
- **A component that needs a populated `DocumentHead` in its test** (e.g. something that reads
  `useDocumentHead()`) can't get one from `QwikCityMockProvider` alone -- its default head is
  empty and it exposes no prop to seed it. Render `<HeadSeeder title="..." meta={[...]} />`
  (`src/testing/head-seeder.tsx`) as a sibling before the component under test; it writes into the
  same head store via a `useTask$`, since Qwik's dev mode flags a direct store write during render.
- **Every page needs an Arabic counterpart under `src/routes/ar/`, at the identical slug.** The
  site is bilingual (see "Arabic / RTL" below) -- adding a new English page without its `/ar/`
  mirror leaves a dangling link the moment it's added to `NAV_ITEMS` (the header/footer nav is
  locale-aware and always emits both). For a page whose `.tsx` component already reads its own
  copy from `useLocation()`'s pathname (the pattern used throughout `src/routes/`), the `/ar/`
  route file is a one-line re-export -- `export { default, head } from "~/routes/<page>/index";`
  -- not a duplicate component. Only MDX prose (history chapters, About, Culture, Privacy) and the
  small per-locale `ArticleShell` layouts need real duplicate files, since prose can't be
  parameterized.

## Arabic / RTL

The site ships a full Arabic translation at `/ar/*`, mirroring every English route at the same
slug -- no separate i18n library, just Qwik City's own routing and request-locale mechanism.

- **Locale is set per-route, not detected at runtime.** `src/routes/layout.tsx`'s `onRequest`
  calls `requestEvent.locale("en")`; `src/routes/ar/layout.tsx`'s does the same for `"ar"`,
  overriding it for everything nested under `/ar/`. Qwik City's SSG runs this same request
  pipeline once per crawled path at build time, so `getLocale()` (from `@builder.io/qwik`, used in
  `root.tsx` and `entry.ssr.tsx`) resolves correctly for every static page with zero runtime cost.
  `entry.ssr.tsx` reads the locale from `opts.serverData.locale` -- **not** a top-level
  `opts.locale`, which doesn't exist and silently resolves to `undefined` if you reach for it
  (this was a real, easy-to-make bug: every page rendered `<html lang="en-GB" dir="ltr">`
  regardless of `requestEvent.locale()` until this was fixed).
- **`src/lib/locale.ts`** is the single source of truth for locale logic: `getLocaleFromPathname`,
  `localizedPathname` (maps a path to its equivalent in the other locale -- pure prefix
  arithmetic, since slugs are always identical across locales), and `LOCALE_HTML_ATTRS`
  (`lang`/`dir` per locale). Reach for these rather than checking `pathname.startsWith("/ar/")`
  inline.
- **Structured content data carries its Arabic translation inline, not in a parallel file.** Every
  `src/content/*.ts` list (history chapters, glossary, sources, books, organisations) has an `ar`
  field alongside each English one (`chapter.ar.title`, `org.ar.description`, etc.) -- proper
  nouns, URLs, book titles and author names are kept as-is in both locales. Route components pick
  the right one with `locale === "ar" ? x.ar.title : x.title`. Each content file's spec asserts
  the Arabic fields are present and non-trivial, same as the English ones.
- **RTL is handled with logical CSS properties, not a parallel stylesheet.** Use
  `marginInlineStart`/`paddingInlineEnd`/`insetInlineStart`/`borderInlineStart`/`textAlign: "end"`
  instead of `-Left`/`-Right`/`left`/`right` in any new `.css.ts` -- `dir="rtl"` on `<html>` (set
  automatically per the locale mechanism above) flips these for free. The one physical exception
  is `env(safe-area-inset-left/right)` in `container.css.ts`: that's a device notch position, not
  a text-direction concern, so it stays paired with physical `paddingLeft`/`paddingRight`. A
  directional icon (an arrow implying "forward") needs an explicit mirror: add the `rtl-mirror`
  utility class (`src/styles/global.css.ts`) to the icon element itself.
- **The language switcher and first-visit suggestion banner use a plain `<a>`/`<button>`, not
  Qwik City's `Link`.** `Link`'s own click-preload handler intercepts simulated clicks in this
  project's test harness before a component's `onClick$` gets a turn (the same reason
  `header.tsx`'s mobile-nav-close handler is the one documented coverage gap in
  `vitest.config.ts`) -- a plain element sidesteps that and stays fully testable. Detection
  (`src/components/layout/language-banner-logic.ts`) is a pure, directly-tested function reading
  `navigator.languages`/`localStorage`; the component itself just wires it into a
  `useVisibleTask$`, following the same split already used by `src/routes/search/pagefind.ts`.
  `src/lib/safe-storage.ts` wraps all `localStorage` access (`getLocalStorage()`,
  `safeGetItem`/`safeSetItem`) so a missing or throwing `localStorage` -- including in this
  project's non-browser unit test environment, where the bare global isn't declared at all --
  degrades to a no-op instead of an unhandled rejection.

## Architecture gotchas (learned the hard way while building this)

- **vanilla-extract selectors**: `style({ selectors: { "&:hover h2": {...} } })` fails to build
  -- `&` can only combine with pseudo-classes/attribute selectors on the _same_ element, never
  descendant combinators. For "style raw child tags inside this component" (e.g. `Prose`,
  which styles MDX-rendered `h2`/`p`/`blockquote`), use `globalStyle(\`${parentClass} h2\`, ...)`
  instead -- see `src/components/ui/prose.css.ts`. For "style element B differently when A is
  hovered," define B's style with `selectors: { [\`${aClass}:hover &\`]: {...} }` on B, not on A
  (vanilla-extract requires the cross-reference to live on the target class, and the referenced
  class must already be defined above it in the file).
- **Fontaine fallback names**: the generated fallback family is `"<Family> fallback"` where
  `<Family>` is the _exact_ `font-family` string in the source `@font-face` (e.g. Fontsource's
  `"Inter Variable"`, not `"Inter"`). Theme font stacks must reference the fallback as
  `"Inter Variable fallback"` verbatim or the fallback face silently never matches. Fontaine
  resolves metrics by name first (works for any font in the Capsize database, i.e. most of
  Google Fonts) before falling back to reading the actual font file -- no `resolvePath` needed
  for Fontsource fonts.
- **Polymorphic `as="tag"` components** (`Container`): typing props as `PropsOf<"div"> & { as?:
... }` breaks the Qwik JSX optimizer's type-check when the tag actually renders as something
  else (`ref` type mismatch between element types). Fix: `Omit<PropsOf<"div">, "ref">`. `as` itself
  is a closed union (`"div" | "section" | "header" | "footer" | "main" | "article"`) in
  `src/components/ui/container.tsx`, not a bare `string` -- extend that union first if a new
  section legitimately needs a different semantic tag.
- **`interface Foo extends Bar[...]`** (indexed-access heritage clause) breaks Qwik's optimizer
  parser with a cryptic `Expected '{', got 'interface'`. Use `type Foo = Bar[...] & {...}`
  instead, or the `PropsOf<T>` helper from `@builder.io/qwik`.
- **MDX routes**: Qwik City renders `.mdx` files under `src/routes/` as pages natively (no extra
  deps). YAML frontmatter's `title`/`description` become `head.title` / a description meta tag
  automatically; any other frontmatter key lands in `head.frontmatter` (read via
  `useDocumentHead().frontmatter`, see `src/routes/history/(chapter)/layout.tsx`).
- **Pathless layout groups**: `src/routes/history/(chapter)/layout.tsx` wraps every route inside
  `(chapter)/` without adding `(chapter)` to the URL. Used to give the seven history chapters
  shared chrome (period badge, prev/next nav, Article JSON-LD) without duplicating it in every
  `.mdx` file, while leaving `history/index.tsx` (the hub) on a different layout.
- **JSON-LD placement**: `<JsonLd data={...} />` (`src/components/seo/json-ld.tsx`) renders a
  `<script type="application/ld+json">` directly in the page body via
  `dangerouslySetInnerHTML`, deliberately not threaded through `DocumentHead` -- search engines
  parse structured data anywhere in the document, and Qwik City's head API has no first-class
  slot for arbitrary body scripts. `data` is passed as a plain object and `JSON.stringify`'d
  inline, so never put unsanitised user input in it (there is none on this site today).
- **`_headers` only covers static-asset responses.** Anything rendered by the Worker itself (the
  404 page; in principle any non-prerendered route) skips `public/_headers` entirely. The same
  security header set is therefore duplicated in `src/entry.cloudflare-pages.tsx`
  (`SECURITY_HEADERS`/`applySecurityHeaders` in `src/security-headers.ts`, unit-tested directly so
  it can be checked without booting the whole app). If you change one, change both.
- **`wrangler dev`/`wrangler deploy` need a real production-shaped build first** (`dist/` +
  `server/`, both produced by `pnpm build`) -- the `[build] command` in `wrangler.jsonc` makes
  `wrangler dev` rebuild automatically, which takes several seconds; don't assume a stale
  request means the server is broken, it may just still be building.

## Deployment (Cloudflare Workers)

The site deploys as a Worker with static assets, configured by the root `wrangler.jsonc`
(previously undocumented here): `name: "sumud"`, `main: "dist/_worker.js"` (the Qwik Cloudflare
Pages adapter's output -- see `src/entry.cloudflare-pages.tsx`), `assets.directory: "dist"` with
`binding: "ASSETS"` and `not_found_handling: "404-page"`, custom domain
`sumud.timothybrits.co.za`, `compatibility_date` kept current with `nodejs_compat`, Smart
Placement, cross-version caching, and full observability (logs + traces, `head_sampling_rate: 1`).
This is the same config shape shared across all three `timothybrits.co.za` Workers (karta, pacer,
sumud). `build.command` (`pnpm run build`) is what `wrangler dev`/Workers Builds uses to
(re)build the site -- see the gotcha above. There is no automated deploy step in
`.github/workflows/ci.yml`; deploying is a manual `wrangler deploy`, which needs a local
`wrangler login`.

## Design tokens, icons and brand assets

- **`src/styles/theme.css.ts`** is the single source of truth for colour, type scale, spacing,
  radius, shadow and z-index (`vars.*`, a vanilla-extract `createGlobalTheme` on `:root`). Don't
  hardcode a hex value or `rem` figure in a component's `.css.ts` -- add or reuse a token instead.
  Dark mode is _not_ per-component: it's one `globalStyle(":root", { "@media": { "(prefers-
color-scheme: dark)": { vars: {...} } } })` block at the bottom of the same file that overrides
  a subset of the colour tokens. A component that only ever reads `vars.color.*` gets dark mode
  for free; introducing a raw colour bypasses it.
- **Icons are generated, not hand-written.** `src/components/ui/icons/*.tsx` and its `index.ts`
  barrel are produced by `pnpm icons` (`scripts/generate-icons.mjs`) from `lucide-static` SVGs --
  add the Lucide icon's PascalCase name and kebab-case filename to the `ICONS` map at the top of
  the script, re-run it, and the component + barrel export appear together. Don't edit the
  generated `.tsx` files directly, edits will be silently lost next run.
- **Favicon, PWA icons and the OG share image are also generated**, by
  `node scripts/generate-images.mjs` (uses `sharp` + `png-to-ico`), from `public/favicon.svg` and
  the small hand-authored SVG markup/colour constants inside that script. Re-run it after editing
  `public/favicon.svg` or after changing a brand colour that the script also hardcodes (`BG`,
  `OLIVE`, `OLIVE_MID`, `TERRACOTTA`, `INK`, `INK_MUTED`) -- these aren't imported from
  `theme.css.ts` since the script runs outside Vite/vanilla-extract.

## Commands

```bash
pnpm check          # lint + typecheck + test + build -- run this before considering anything done
pnpm test.coverage  # vitest run --coverage (istanbul provider -- see below); CI-enforced, not pre-commit
pnpm icons          # after adding an icon name to scripts/generate-icons.mjs
node scripts/generate-images.mjs  # after editing public/favicon.svg or its brand colours
```

Coverage uses the `istanbul` provider, not the default `v8` one: `v8`'s coverage remapping can't
correctly attribute code inside a `component$()`/`$()` closure back to its source line once
Qwik's optimizer has rewritten it (everything reports 0%, even when a passing test genuinely
renders and exercises it), while `istanbul` instruments the source directly and doesn't have this
problem. Thresholds in `vitest.config.ts` are 100% for branches/lines and 99% for
statements/functions -- the one known gap is `header.tsx`'s mobile-nav-close `onClick$`, which a
simulated click can't reach (`Link`'s own click-preload handler runs first and throws on this
minimal test DOM's unresolved `elm.href`, so ours never fires). `coverage.exclude` in
`vitest.config.ts` also carries the framework entry files (`entry.dev.tsx`, `entry.preview.tsx`,
`entry.ssr.tsx`, `entry.cloudflare-pages.tsx`, `root.tsx`, `routes/layout.tsx`): Qwik City loads
these through its own internal module resolution rather than a plain import, so even a directly
rendered, passing unit test (confirmed for `routes/layout.tsx`) still reports 0% -- they're only
reachable end-to-end, via a real dev/preview server request.

There is no separate "format" CI check currently wired up beyond `pnpm fmt.check`; run `pnpm fmt`
before committing if you've hand-edited anything Prettier would reflow.

**Pre-commit vs. CI aren't the same checks.** `lefthook.yml` runs on staged files at commit time:
`eslint --fix` and `prettier --write` (both `stage_fixed`, so their fixes get included in the
commit automatically), plus a full `pnpm run test` -- no coverage, no typecheck, no build. CI
(`.github/workflows/ci.yml`) runs the fuller sequence on every push/PR: lint, typecheck,
`test.coverage` (coverage thresholds are only enforced here), then build. A commit can pass the
local hook and still fail CI on typecheck, coverage thresholds, or a production-only build error
-- run `pnpm check` (and `pnpm test.coverage` if you touched anything coverage-sensitive) before
treating something as done, don't rely on the hook alone.
