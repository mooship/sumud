// Qwik's rules only; Biome does all other linting. valid-lexical-scope uses type information
// (it spots non-serialisable captures such as class instances), which Biome's Qwik rules lack.
// The root eslint.config.js re-exports this file so editors find it.
import { fileURLToPath } from "node:url";
import tsParser from "@typescript-eslint/parser";
import { qwikEslint9Plugin } from "eslint-plugin-qwik";

const root = fileURLToPath(new URL("../..", import.meta.url));

export default [
  ...qwikEslint9Plugin.configs.recommended.map((config) => ({
    ...config,
    // Type-aware rules need files inside the root tsconfig's `include`.
    files: ["src/**/*.{ts,tsx}"],
  })),
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { projectService: true, tsconfigRootDir: root },
    },
  },
];
