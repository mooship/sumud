import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import { qwikEslint9Plugin } from "eslint-plugin-qwik";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const ignores = [
  "**/*.log",
  "**/.DS_Store",
  ".vscode/settings.json",
  "**/node_modules",
  "**/dist",
  "**/server",
  "**/.wrangler",
  "**/.cache",
  "**/.vscode",
  "**/tsconfig.tsbuildinfo",
  "**/pnpm-lock.yaml",
  "**/package-lock.json",
  "**/yarn.lock",
  "eslint.config.js",
];

export default tseslint.config(
  globalIgnores(ignores),
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  qwikEslint9Plugin.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.serviceworker,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // `Props`, `props`, `env`, `ctx`, `req`/`res`, `i`, `vars`, `pkg`, `dep`, etc. are the
      // standard names these ecosystems already use (Qwik's own `PropsOf<T>`, Cloudflare's
      // `Env`/`ExecutionContext` types, Node's http types, plain loop indices) -- renaming them
      // to "Properties"/"environment"/"context"/"index" etc. would fight convention rather than
      // improve clarity.
      "unicorn/name-replacements": "off",
    },
  },
  {
    // vanilla-extract's whole API (style/globalStyle/createGlobalTheme, and computed
    // `[vars.color.x]` keys to override a specific CSS custom property under a media query) is
    // top-level side effects and computed property keys by design -- these two rules would flag
    // every `.css.ts` file in the project.
    files: ["**/*.css.ts"],
    rules: {
      "unicorn/no-top-level-side-effects": "off",
      "unicorn/no-unsafe-property-key": "off",
    },
  },
  {
    // Component tests render into `@builder.io/qwik/testing`'s own minimal DOM shim, not a real
    // browser or happy-dom/jsdom -- it doesn't implement `Element#getHTML()`, `.dataset`, or
    // iterator support on the `NodeList` its `querySelectorAll` returns (spreading one throws).
    // These three rules push toward APIs that don't exist here.
    files: ["**/*.spec.{ts,tsx}"],
    rules: {
      "unicorn/prefer-spread": "off",
      "unicorn/prefer-dom-node-html-methods": "off",
      "unicorn/dom-node-dataset": "off",
    },
  },
);
