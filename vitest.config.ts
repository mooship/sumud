import { defineConfig } from "vitest/config";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    qwikCity({
      mdxPlugins: {
        remarkGfm: true,
        rehypeSyntaxHighlight: false,
        rehypeAutolinkHeadings: true,
      },
    }),
    qwikVite(),
    tsconfigPaths({ root: "." }),
    vanillaExtractPlugin({ identifiers: "debug" }),
  ],
  test: {
    environment: "node",
    include: ["src/**/*.spec.{ts,tsx}"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        // Framework bootstrap/entry files that Qwik (City)'s own build
        // tooling loads and executes through its own internal module
        // resolution rather than a plain import -- even a test that
        // directly imports and renders one (confirmed for src/routes/
        // layout.tsx, which a real, passing unit test exercises) still
        // reports 0% here, because the code that actually runs at
        // request time isn't the same instrumented copy this coverage
        // tool sees. Only reachable end-to-end (a real dev/preview
        // server request), not via a unit test.
        "src/entry.dev.tsx",
        "src/entry.preview.tsx",
        "src/entry.ssr.tsx",
        "src/entry.cloudflare-pages.tsx",
        "src/root.tsx",
        "src/routes/layout.tsx",
      ],
      // branches/lines are a genuine 100%. statements/functions sit fractionally below
      // it (296/297 and 141/142) for one known, narrow gap: header.tsx's mobile nav Link
      // closes the menu via an onClick$ that a simulated click can't reach here -- Link's
      // own click-preload handler runs first and calls `new URL(elm.href)`, which throws
      // because this minimal test DOM's anchors don't resolve `.href` to an absolute URL
      // the way a real browser does, so our handler never gets a chance to run.
      thresholds: {
        statements: 99,
        branches: 100,
        functions: 99,
        lines: 100,
      },
    },
  },
});
