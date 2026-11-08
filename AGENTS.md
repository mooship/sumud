# AGENTS.md

Guidance for anyone, human or AI, working in this repository. `CLAUDE.md` imports this file; put shared rules here.

Sumud tells the story of Palestine and its people, before 1947 and after, at
sumud.timothybrits.co.za. It's a content site first, a tech demo second: most of the value is in
the prose (`src/routes/**/*.mdx`) and the content data (`src/content/*.ts`), not the framework
plumbing. Stack: Qwik + Qwik City (SSG), TypeScript 7, vanilla-extract, Vitest, Biome, deployed
as static output on an assets-only Cloudflare Worker.

## Commands

```bash
npm run dev            # Vite dev server (SSR mode)
npm run build          # client + server builds, `tsc --incremental --noEmit`, Pagefind index
npm run typecheck      # tsc --noEmit (TypeScript 7, the native compiler)
npm test               # vitest run
npm run test.coverage  # vitest run --coverage (istanbul provider, see below); CI-enforced
npm run test.e2e       # Playwright against the built site (`npm run preview` on port 4174); runs in CI
npm run lint           # Biome check (lint, formatting, import order) + Qwik's ESLint rules
npm run lint:fix       # the same, applying safe fixes
npm run format         # Biome format --write
npm run check          # lint + typecheck + test + build; run this before considering anything done
npm run icons          # after adding an icon name to scripts/generate-icons.mjs
node scripts/generate-images.mjs  # after editing public/favicon.svg or its brand colours
```

Biome (`biome.jsonc`) does all formatting and nearly all linting. Its formatter settings match the
Prettier defaults the code was written with (two spaces, double quotes, trailing commas, 80
columns). The Markdown and YAML formatters are off, and `.mdx` prose is never formatted. Imports
are sorted by Biome's `organizeImports` assist, so `npm run lint` fails on an unsorted import
block; `npm run lint:fix` sorts it. The generated icon files come out of `npm run icons`
unformatted, so run `npm run lint:fix` (or let the commit hook do it) afterwards.

Qwik's own rules (`valid-lexical-scope`, `use-method-usage`, `no-react-props`, `loader-location`
and the rest of `eslint-plugin-qwik`'s recommended set) still run in ESLint, from `tools/lint`.
That package has its own `package.json`, lockfile and TypeScript 6, because the plugin needs
`@typescript-eslint/parser`, which supports TypeScript below 6.1 only, while the site compiles with
TypeScript 7. `valid-lexical-scope` is type-aware: it flags a `$()` closure that captures a class
instance or a plain function, which Biome's syntactic Qwik rules miss, as they also miss a hook
called inside an `if`. Biome's `qwik` domain is switched off so the two don't report the same
thing twice. `scripts/ensure-lint.mjs` installs `tools/lint` on first use, so `npm run lint` and the
commit hook work on a fresh clone. The root `eslint.config.js` only re-exports
`tools/lint/eslint.config.js` so editors find it, and the root tsconfig must stay readable by
TypeScript 6 for the same reason.

Coverage uses the `istanbul` provider, not the default `v8` one: `v8`'s coverage remapping can't
correctly attribute code inside a `component$()`/`$()` closure back to its source line once
Qwik's optimizer has rewritten it (everything reports 0%, even when a passing test genuinely
renders and exercises it), while `istanbul` instruments the source directly and doesn't have this
problem. Thresholds in `vitest.config.ts` are 100% for branches/lines and 99% for
statements/functions. The one known gap is `header.tsx`'s mobile-nav-close `onClick$`, which a
simulated click can't reach (`Link`'s own click-preload handler runs first and throws on this
minimal test DOM's unresolved `elm.href`, so ours never fires). `coverage.exclude` in
`vitest.config.ts` also carries the framework entry files (`entry.dev.tsx`, `entry.preview.tsx`,
`entry.ssr.tsx`, `entry.cloudflare-pages.tsx`, `root.tsx`, `routes/layout.tsx`): Qwik City loads
these through its own internal module resolution rather than a plain import, so even a directly
rendered, passing unit test (confirmed for `routes/layout.tsx`) still reports 0%. They're only
reachable end-to-end, via a real dev/preview server request.

Pre-commit vs. CI aren't the same checks. `lefthook.yml` runs two jobs on staged files at commit
time: `format` (`biome format --write`) and then `lint` (`biome check --write` plus Qwik's ESLint
rules with `--fix`), both `stage_fixed`, so their fixes get included in the commit automatically.
It never runs unit tests, coverage, typecheck or build. CI (`.github/workflows/ci.yml`) runs the
fuller sequence on every push/PR: `lint:ci` (`biome ci` plus the Qwik rules), typecheck,
`test.coverage` (coverage thresholds are only enforced here), build, and a separate Playwright job.
`.github/workflows/lighthouse.yml` builds the site and runs Lighthouse CI against `wrangler dev`.
A commit can pass the local hook and still fail CI on typecheck, coverage thresholds, or a
production-only build error.

## Engineering principles

- Test first. For logic and for bug fixes, write the failing spec, watch it fail for the reason
  you expect, make it pass, then tidy up. Unit specs cover content data invariants
  (`src/content/*.spec.ts`), pure helpers (`src/lib/`, `language-banner-logic.ts`, `pagefind.ts`),
  feed handlers and every route component through `createDOM()`. Layout, RTL behaviour, contrast,
  search and CSP are covered by the Playwright suite and Lighthouse, and prose by reading it. Never
  weaken or skip a test to get green; fix the code or say why the test is wrong.
- The site grows at known seams: a new entry in a `src/content/*.ts` list, a new route directory
  (with its `/ar/` mirror), a line in `NAV_ITEMS` or `HISTORY_CHAPTERS`, a token in
  `src/styles/theme.css.ts`, a name in the `ICONS` map. A change that needs edits to unrelated
  components is a sign the seam is in the wrong place. Keep each module to one reason to change:
  route components read data and render it, and the `onRequest` and `onGet` handlers in layouts
  and feeds stay thin. Components lean on the exported content types and the `locale.ts` helpers
  rather than on each other's internals.
- One source for each fact. Copy lives in the content files with its Arabic beside it, and design
  values live in the theme tokens. Locale rules belong to `src/lib/locale.ts`, and the RSS and
  Atom feeds are both built from `src/content/feed.ts`. Where two places must agree, a spec checks
  them (`nav.spec.ts` against the route files). Don't merge two pieces of code only because they
  look alike.
- Keep it simple. Plain functions and plain data arrays are the norm here; add no options, props or
  abstraction layers for a second use case that doesn't exist yet.
- Stay on the task. Don't refactor code the task doesn't touch; mention a nearby problem instead.

## Conventions

### Commit messages

Use [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for every commit, with the subject format `<type>[optional scope][!]: <description>`. Use a recognised type such as `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `build`, `ci` or `chore`. Mark breaking changes with `!` and explain them in the body or a `BREAKING CHANGE:` footer.

### Dependencies and lockfiles

Node 24 and 26 are supported, with 24.22.1 as the floor (`engines.node`; `.node-version` says
`24`). npm is 11 everywhere: `engines.npm` is `>=11.0.0` and `packageManager` pins `npm@11.19.1`,
the only setting Workers Builds reads to choose its npm (it otherwise stays on 10). CI runs
`npm install --global npm@11` before every `npm ci`, because Node 26 can ship a different npm
major. The `Lint, typecheck, test & build` job runs on a Node 24 and 26 matrix; Playwright and
Lighthouse use `.node-version`.

- There are two lockfiles, the root one and `tools/lint/package-lock.json`. `tools/lint` takes the
  same `engines` and `packageManager` but keeps its own `typescript` at `^6.0.3`.
- After a `package.json` change run a real `npm install` (not `--package-lock-only`, which keeps
  stale nested entries when a range or override changes) and commit it with the lockfile in the
  same commit. If `npm ls` then shows `invalid`, delete the stale nested entries from the lockfile
  and install again; never hand-edit versions.
- Verify with a real `npm ci --ignore-scripts` in a throwaway clone, not `--dry-run`, which has
  passed a lockfile that failed a real install. Do the same in `tools/lint`.
- A lockfile that npm 10 accepts and npm 11 rejects, or the reverse, is an environment mismatch,
  not a problem with the change. Dependabot owns its lockfile changes: push a corrected one to its
  branch only when a real `npm ci` under npm 11 fails.
- Prerelease pins are exact, because a caret on a prerelease resolves to nightly builds, and a
  prerelease does not satisfy a plain peer range such as `>=2.9`.
- Run the project's binaries with `npm run` or `npx --no-install <tool>`; a plain `npx` can fetch
  an unrelated package of the same name.
- Do not install in a working tree someone else is using.

### Code comments

Comment only a non-obvious why: a constraint, a workaround, or a reason someone might otherwise
undo the code. Keep it short and next to the thing it explains. Config files may carry a comment
when the reason for a setting isn't obvious (`biome.jsonc`, `wrangler.jsonc`, the workflows). A
`biome-ignore` needs its reason after the colon.

### Before touching historical/factual content

- Prose must read as written by a person. No listicle cadence, no "in conclusion", no hedging
  filler. No em dashes, and no `--` standing in for one: use a comma, colon, full stop or
  brackets instead (in Arabic copy, «،» «؛» or brackets). The only dashes in prose are the
  unspaced en dash in a date range (1917–1947) and ordinary hyphens. Also avoid the usual
  machine-writing tells: "not X but Y" contrasts, a quotable one-line closer at the end of a
  section, forced lists of three, "carries weight", "crucially", "it's worth pausing on",
  "testament", "tapestry", "in the end", and Title Case labels in sentence-case copy. Read a
  paragraph out loud before committing to it. The same rules apply to UI strings, page titles,
  the PWA manifest and these docs.
- British English spelling throughout (organisation, colour, licence as a noun, -ise not -ize).
  Proper nouns keep their official spelling (Palestine Liberation Organization).
- Sourcing matters: this covers genuinely contested history. Casualty/displacement figures,
  especially for anything post-2023, must be attributed to a source ("according to Gaza's
  Health Ministry...") rather than stated as bare fact. When historians disagree (e.g. the scale
  and intent behind 1948 expulsions), say so rather than picking a side silently. See
  `src/routes/sources/index.tsx` / `src/content/sources.ts` for the kind of sourcing already in
  use, and add to it rather than inventing citations.
- Don't add a "Take action" organisation, book, quote, or claimed statistic without being able
  to justify it. This is a real-world sensitive-topics site, not a placeholder demo. Every
  entry in `src/content/organisations.ts` and `src/content/books.ts` should be a real,
  independently verifiable organisation or book, not one assembled from a vague memory of the
  genre. If asked to add current-events content, search for what's actually happened recently
  rather than extrapolating from training data; the situation changes fast and the existing
  "present day" chapter (`src/routes/history/(chapter)/gaza-and-the-present/index.mdx`) is
  deliberately dated by its own last-verified facts.

## Definition of done

- Any code change: `npm run check` passes (lint, typecheck, unit tests, build), and the working tree
  is clean after the build.
- Logic, a component or content data: also `npm run test.coverage`, since its thresholds only run
  in CI.
- Layout, styling, RTL, navigation, search or headers: also `npm run test.e2e`, and look at the
  page in both locales.
- Dependencies: follow "Dependencies and lockfiles" above: a real `npm install` under npm 11 (in
  `tools/lint` too if that changed), then a real `npm ci --ignore-scripts` in a clean clone.
- Prose or content data only: `npm run check`, plus reading the change against the writing and
  sourcing rules above.
- CI (including Lighthouse and the Workers Builds check) is green before merging.

If you skipped any of these, say which and why.

## Safety

- A merge or push to `main` deploys to production through Workers Builds. Pull requests get a
  Workers Builds check; only `main` deploys to production.
- **Never run `wrangler deploy` by hand without explicit permission from the user.** Always ask
  first and wait for confirmation.
- Never commit credentials. `.env*` and `.dev.vars` are gitignored for that reason.

## Adding or changing a page

Several places have to move together, and only some of them are wired up automatically. Get
this wrong and a page either 404s in nav, or silently never appears anywhere but its own URL.

- A new route directory under `src/routes/` is enough to make it live and indexed. The
  Cloudflare Pages adapter (`adapters/cloudflare-pages/vite.config.ts`) runs Qwik City's SSG with
  `ssg.include: ["/*"]`, so `npm run build` prerenders every route it finds and regenerates
  `dist/sitemap.xml` from the same crawl, with no per-route registration needed for either.
- Header nav and footer are not automatic in the same way. Add the route to `NAV_ITEMS` in
  `src/content/nav.ts` to have it appear in the header (`src/components/layout/header.tsx`); the
  footer's "Read" column (`src/components/layout/footer.tsx`) renders straight from the same
  `NAV_ITEMS` array, so you only add it once. `src/content/nav.spec.ts` fails the build if a nav
  entry's href has no matching `index.tsx`/`index.mdx`, so a typo'd route is caught immediately.
- `public/llms.txt` is hand-maintained and nothing checks it. It's a plain-language sitemap
  for LLM crawlers; update its route list by hand whenever a page is added, removed or retitled.
  Nothing in the build or test suite will remind you.
- Pick the right shared shell for a new long-form page. A standalone MDX page outside the
  history sequence (About, Culture, Privacy) wraps its content in `<ArticleShell eyebrow="...">`
  (`src/components/layout/article-shell.tsx`) for the title header and `Prose` styling. A new
  _history chapter_ instead goes inside `src/routes/history/(chapter)/` and needs an entry added
  to `HISTORY_CHAPTERS` in `src/content/history-chapters.ts` (slug order there drives the
  prev/next links). See "Pathless layout groups" below for what that shell gives it for free.
  A page with bespoke layout needs (like Take action, Sources, Further reading, or the homepage)
  is just a plain `index.tsx` built from `Container` and hand-written `index.css.ts`, following
  whichever of those is closest in shape.
- Structured content data gets a sibling spec file. Every `src/content/*.ts` list
  (`organisations.ts`, `sources.ts`, `books.ts`, `history-chapters.ts`, `nav.ts`) has a matching
  `*.spec.ts` asserting the boring-but-important invariants: no duplicate names/titles, every
  description over some minimum length, every URL is `https:` and parses. Follow that pattern for
  a new content file rather than skipping the spec or inventing a different shape of test.
- Every route component gets an `index.spec.tsx` rendering it through `createDOM()` +
  `QwikCityMockProvider` and asserting on `head.title`/`head.meta` and on the rendered content
  (see `src/routes/take-action/index.spec.tsx` or `src/routes/further-reading/index.spec.tsx` for
  the shape). Note `screen` from `createDOM()` is the rendered root element itself, not a
  `document`. Use `screen.querySelectorAll(...)` / `screen.textContent` directly, there is no
  `screen.body`.
- A component that needs a populated `DocumentHead` in its test (e.g. something that reads
  `useDocumentHead()`) can't get one from `QwikCityMockProvider` alone: its default head is
  empty and it exposes no prop to seed it. Render `<HeadSeeder title="..." meta={[...]} />`
  (`src/testing/head-seeder.tsx`) as a sibling before the component under test; it writes into the
  same head store via a `useTask$`, since Qwik's dev mode flags a direct store write during render.
- Every page needs an Arabic counterpart under `src/routes/ar/`, at the identical slug. The
  site is bilingual (see "Arabic / RTL" below), and adding a new English page without its `/ar/`
  mirror leaves a dangling link the moment it's added to `NAV_ITEMS` (the header/footer nav is
  locale-aware and always emits both). For a page whose `.tsx` component already reads its own
  copy from `useLocation()`'s pathname (the pattern used throughout `src/routes/`), the `/ar/`
  route file is a one-line re-export (`export { default, head } from "~/routes/<page>/index";`),
  not a duplicate component. Only MDX prose (history chapters, About, Culture, Privacy) and the
  small per-locale `ArticleShell` layouts need real duplicate files, since prose can't be
  parameterized.

## Arabic / RTL

The site ships a full Arabic translation at `/ar/*`, mirroring every English route at the same
slug. There is no separate i18n library, just Qwik City's own routing and request-locale mechanism.

- Locale is set per-route, not detected at runtime. `src/routes/layout.tsx`'s `onRequest`
  calls `requestEvent.locale("en")`; `src/routes/ar/layout.tsx`'s does the same for `"ar"`,
  overriding it for everything nested under `/ar/`. Qwik City's SSG runs this same request
  pipeline once per crawled path at build time, so `getLocale()` (from `@builder.io/qwik`, used in
  `root.tsx` and `entry.ssr.tsx`) resolves correctly for every static page with zero runtime cost.
  `entry.ssr.tsx` reads the locale from `opts.serverData.locale`, not a top-level
  `opts.locale`, which doesn't exist and silently resolves to `undefined` if you reach for it
  (this was a real, easy-to-make bug: every page rendered `<html lang="en-GB" dir="ltr">`
  regardless of `requestEvent.locale()` until this was fixed).
- `src/lib/locale.ts` is the single source of truth for locale logic: `getLocaleFromPathname`,
  `localizedPathname` (maps a path to its equivalent in the other locale with pure prefix
  arithmetic, since slugs are always identical across locales), and `LOCALE_HTML_ATTRS`
  (`lang`/`dir` per locale). Reach for these rather than checking `pathname.startsWith("/ar/")`
  inline.
- Structured content data carries its Arabic translation inline, not in a parallel file. Every
  `src/content/*.ts` list (history chapters, glossary, sources, books, organisations) has an `ar`
  field alongside each English one (`chapter.ar.title`, `org.ar.description`, etc.). Proper
  nouns, URLs, book titles and author names are kept as-is in both locales. Route components pick
  the right one with `locale === "ar" ? x.ar.title : x.title`. Each content file's spec asserts
  the Arabic fields are present and non-trivial, same as the English ones.
- RTL is handled with logical CSS properties, not a parallel stylesheet. Use
  `marginInlineStart`/`paddingInlineEnd`/`insetInlineStart`/`borderInlineStart`/`textAlign: "end"`
  instead of `-Left`/`-Right`/`left`/`right` in any new `.css.ts`: `dir="rtl"` on `<html>` (set
  automatically per the locale mechanism above) flips these for free. The one physical exception
  is `env(safe-area-inset-left/right)` in `container.css.ts`: that's a device notch position, not
  a text-direction concern, so it stays paired with physical `paddingLeft`/`paddingRight`. A
  directional icon (an arrow implying "forward") needs an explicit mirror: add the `rtl-mirror`
  utility class (`src/styles/global.css.ts`) to the icon element itself.
- The language switcher and first-visit suggestion banner use a plain `<a>`/`<button>`, not
  Qwik City's `Link`. `Link`'s own click-preload handler intercepts simulated clicks in this
  project's test harness before a component's `onClick$` gets a turn (the same reason
  `header.tsx`'s mobile-nav-close handler is the one documented coverage gap in
  `vitest.config.ts`). A plain element sidesteps that and stays fully testable. Detection
  (`src/components/layout/language-banner-logic.ts`) is a pure, directly-tested function reading
  `navigator.languages`/`localStorage`; the component itself just wires it into a
  `useVisibleTask$`, following the same split already used by `src/routes/search/pagefind.ts`.
  `src/lib/safe-storage.ts` wraps all `localStorage` access (`getLocalStorage()`,
  `safeGetItem`/`safeSetItem`) so a missing or throwing `localStorage` (including in this
  project's non-browser unit test environment, where the bare global isn't declared at all)
  degrades to a no-op instead of an unhandled rejection.

## Architecture gotchas (learned the hard way while building this)

- vanilla-extract selectors: `style({ selectors: { "&:hover h2": {...} } })` fails to build:
  `&` can only combine with pseudo-classes/attribute selectors on the _same_ element, never
  descendant combinators. For "style raw child tags inside this component" (e.g. `Prose`,
  which styles MDX-rendered `h2`/`p`/`blockquote`), use ``globalStyle(`${parentClass} h2`, ...)``
  instead (see `src/components/ui/prose.css.ts`). For "style element B differently when A is
  hovered," define B's style with ``selectors: { [`${aClass}:hover &`]: {...} }`` on B, not on A
  (vanilla-extract requires the cross-reference to live on the target class, and the referenced
  class must already be defined above it in the file).
- Fontaine fallback names: the generated fallback family is `"<Family> fallback"` where
  `<Family>` is the _exact_ `font-family` string in the source `@font-face` (e.g. Fontsource's
  `"IBM Plex Sans Variable"`, not `"IBM Plex Sans"`). Theme font stacks must reference the fallback as
  `"IBM Plex Sans Variable fallback"` verbatim or the fallback face silently never matches. Fontaine
  resolves metrics by name first (works for any font in the Capsize database, i.e. most of
  Google Fonts) before falling back to reading the actual font file, so no `resolvePath` is needed
  for Fontsource fonts. The pairing is IBM Plex Sans with IBM Plex Sans Arabic for UI and body,
  and Newsreader with Noto Naskh Arabic for headings and quotes (`src/styles/fonts.ts`). Each
  Fontsource file carries a `unicode-range`, so a page only downloads the scripts it uses.
- Arabic text is never italic, uppercased or letter-spaced. `src/styles/global.css.ts` resets
  those on `:lang(ar)`, and `:root:lang(ar)` in `theme.css.ts` raises the type scale and line
  height. Mark inline Arabic in English pages with `lang="ar" dir="rtl"` so the reset applies.
- Polymorphic `as="tag"` components (`Container`): typing props as `PropsOf<"div"> & { as?:
... }` breaks the Qwik JSX optimizer's type-check when the tag actually renders as something
  else (`ref` type mismatch between element types). Fix: `Omit<PropsOf<"div">, "ref">`. `as` itself
  is a closed union (`"div" | "section" | "header" | "footer" | "main" | "article"`) in
  `src/components/ui/container.tsx`, not a bare `string`. Extend that union first if a new
  section legitimately needs a different semantic tag.
- `interface Foo extends Bar[...]` (indexed-access heritage clause) breaks Qwik's optimizer
  parser with a cryptic `Expected '{', got 'interface'`. Use `type Foo = Bar[...] & {...}`
  instead, or the `PropsOf<T>` helper from `@builder.io/qwik`.
- MDX routes: Qwik City renders `.mdx` files under `src/routes/` as pages natively (no extra
  deps). YAML frontmatter's `title`/`description` become `head.title` / a description meta tag
  automatically; any other frontmatter key lands in `head.frontmatter` (read via
  `useDocumentHead().frontmatter`, see `src/routes/history/(chapter)/layout.tsx`).
- Pathless layout groups: `src/routes/history/(chapter)/layout.tsx` wraps every route inside
  `(chapter)/` without adding `(chapter)` to the URL. Used to give the seven history chapters
  shared chrome (period badge, prev/next nav, Article JSON-LD) without duplicating it in every
  `.mdx` file, while leaving `history/index.tsx` (the hub) on a different layout.
- JSON-LD placement: `<JsonLd data={...} />` (`src/components/seo/json-ld.tsx`) renders a
  `<script type="application/ld+json">` directly in the page body via
  `dangerouslySetInnerHTML`, deliberately not threaded through `DocumentHead`. Search engines
  parse structured data anywhere in the document, and Qwik City's head API has no first-class
  slot for arbitrary body scripts. `data` is passed as a plain object and `JSON.stringify`'d
  inline, so never put unsanitised user input in it (there is none on this site today).
- `public/_headers` sets every header. The deployed Worker is assets-only (no `main` in
  `wrangler.jsonc`): every route is prerendered, and unknown paths get `dist/404.html` from the
  assets layer, so no Worker code runs and `_headers` applies to every response, the 404 included.
  The Cloudflare Pages adapter entry remains necessary for prerendering, but its generated
  `dist/_worker.js` is excluded by `public/.assetsignore`. If a route ever needs to render on
  request, put `main` back and add runtime response headers for that route.
- `wrangler dev`/`wrangler deploy` need a real production-shaped build first (`dist/` +
  `server/`, both produced by `npm run build`). The `[build] command` in `wrangler.jsonc` makes
  `wrangler dev` rebuild automatically, which takes several seconds; don't assume a stale
  request means the server is broken, it may just still be building.

## Deployment (Cloudflare Workers)

The site deploys as an assets-only Worker, configured by the root `wrangler.jsonc`:
`name: "sumud"`, `assets.directory: "dist"` with `not_found_handling: "404-page"`, custom domain
`sumud.timothybrits.co.za`, `compatibility_date` kept current with `nodejs_compat`, and full
observability (logs + traces, `head_sampling_rate: 1`). There is no Smart Placement and no
Workers Cache (`cache.enabled` would count every static asset request as a billed Worker
request).
`build.command` (`npm run build`) is what `wrangler dev`/Workers Builds uses to
(re)build the site (see the gotcha above). Cloudflare Workers Builds is connected to the GitHub repository: every push to `main`
builds and deploys production, and pull requests get a "Workers Builds: sumud" check. The GitHub
workflows never deploy. A manual `wrangler deploy` needs a local `wrangler login` and the
user's permission (see Safety).

## Design tokens, icons and brand assets

- `src/styles/theme.css.ts` is the single source of truth for colour, type scale, spacing,
  radius, shadow and z-index (`vars.*`, a vanilla-extract `createGlobalTheme` on `:root`). Don't
  hardcode a hex value or `rem` figure in a component's `.css.ts`. Add or reuse a token instead.
  Dark mode is _not_ per-component: it's one `globalStyle(":root", { "@media": { "(prefers-
color-scheme: dark)": { vars: {...} } } })` block at the bottom of the same file that overrides
  a subset of the colour tokens. A component that only ever reads `vars.color.*` gets dark mode
  for free; introducing a raw colour bypasses it.
- Icons are generated, not hand-written. `src/components/ui/icons/*.tsx` and its `index.ts`
  barrel are produced by `npm run icons` (`scripts/generate-icons.mjs`) from `lucide-static` SVGs.
  Add the Lucide icon's PascalCase name and kebab-case filename to the `ICONS` map at the top of
  the script, re-run it, and the component + barrel export appear together. Don't edit the
  generated `.tsx` files directly, edits will be silently lost next run.
- Favicon, PWA icons and the OG share image are also generated, by
  `node scripts/generate-images.mjs` (uses `sharp` + `png-to-ico`), from `public/favicon.svg` and
  the small hand-authored SVG markup/colour constants inside that script. Re-run it after editing
  `public/favicon.svg` or after changing a brand colour that the script also hardcodes (`BG`,
  `OLIVE`, `OLIVE_MID`, `TERRACOTTA`, `INK`, `INK_MUTED`). These aren't imported from
  `theme.css.ts` since the script runs outside Vite/vanilla-extract.
