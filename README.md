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

Requires Node 24.22.1 or newer (24 is tested) and npm.

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build
npm test         # run the test suite
npm run check    # lint + typecheck + test + build
npm run test.e2e # Playwright against the production build
```

## Editing content

Chapter text lives in `src/routes/history/(chapter)/*/index.mdx`. Chapter order, sources, and
Take action listings live in `src/content/*.ts`. See [`AGENTS.md`](AGENTS.md) for architecture
notes and deeper technical detail.

The homepage is a reading guide: a short introduction, the meaning of sumud, an ordered
chapter list, and links to culture and aid organisations. Keep introductory copy specific
and brief rather than repeating the project's mission on each page. English and Arabic
share the page layouts; copy changes need both versions.

Browser tests cover the reading guide, mobile navigation, language switching, keyboard
access, light/dark button contrast and search. Search uses Pagefind's WebAssembly worker;
its scoped CSP exception lives in `public/_headers` alongside the search-page exceptions.

## Licence

Code and original content are dedicated to the public domain under [CC0 1.0](LICENSE). Quoted
material (e.g. the Darwish epigraph) belongs to its respective rights holders and is used here
under fair use for commentary/education.
