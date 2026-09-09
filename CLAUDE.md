# CLAUDE.md

Guidance for Claude Code (or any agent) working in this repository.

## What this is

Sumud tells the story of Palestine and its people, before 1947 and after, at
sumud.timothybrits.co.za. It's a content site first, a tech demo second: most of the value is in
the prose (`src/routes/**/*.mdx`) and the content data (`src/content/*.ts`), not the framework
plumbing.

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
- **Don't add a "Take Action" organisation, quote, or claimed statistic without being able to
  justify it** -- this is a real-world sensitive-topics site, not a placeholder demo. If asked to
  add current-events content, search for what's actually happened recently rather than
  extrapolating from training data; the situation changes fast and the existing "present day"
  chapter (`src/routes/history/(chapter)/gaza-and-the-present/index.mdx`) is deliberately dated
  by its own last-verified facts.

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
  else (`ref` type mismatch between element types). Fix: `Omit<PropsOf<"div">, "ref">`.
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
- **`_headers` only covers static-asset responses.** Anything rendered by the Worker itself (the
  404 page; in principle any non-prerendered route) skips `public/_headers` entirely. The same
  security header set is therefore duplicated in `src/entry.cloudflare-pages.tsx`. If you change
  one, change both.
- **`wrangler dev`/`wrangler deploy` need a real production-shaped build first** (`dist/` +
  `server/`, both produced by `pnpm build`) -- the `[build] command` in `wrangler.jsonc` makes
  `wrangler dev` rebuild automatically, which takes several seconds; don't assume a stale
  request means the server is broken, it may just still be building.

## Commands

```bash
pnpm check          # lint + typecheck + test + build -- run this before considering anything done
pnpm test.coverage  # vitest run --coverage (istanbul provider -- see below); CI-enforced, not pre-commit
pnpm icons          # after adding an icon name to scripts/generate-icons.mjs
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
