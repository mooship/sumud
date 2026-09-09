# Sumud (صمود)

The story of Palestine and its people, before 1947 and after: history, culture, and the
steadfastness the site is named for.

**[sumud.timothybrits.co.za](https://sumud.timothybrits.co.za)**

Sumud is an independent, non-commercial project with no ads and no third-party trackers.
See [`/about/`](https://sumud.timothybrits.co.za/about/) for what it is,
[`/sources/`](https://sumud.timothybrits.co.za/sources/) for how it was researched, and
[`/privacy/`](https://sumud.timothybrits.co.za/privacy/) for what data it collects.

## Stack

Qwik + Qwik City, TypeScript, vanilla-extract, Vitest, deployed to Cloudflare Workers.

## Getting started

Requires Node 22+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev      # http://localhost:5173
```

```bash
pnpm build    # production build
pnpm test     # run the test suite
pnpm check    # lint + typecheck + test + build
```

## Editing content

Chapter text lives in `src/routes/history/(chapter)/*/index.mdx`. Chapter order, sources, and
Take Action listings live in `src/content/*.ts`. See [`CLAUDE.md`](CLAUDE.md) for architecture
notes and deeper technical detail.

## Licence

Code and original content are dedicated to the public domain under [CC0 1.0](LICENSE). Quoted
material (e.g. the Darwish epigraph) belongs to its respective rights holders and is used here
under fair use for commentary/education.
