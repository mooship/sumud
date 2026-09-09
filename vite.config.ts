/**
 * This is the base config for vite.
 * When building, the adapter config is used which loads this file and extends it.
 */
import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { FontaineTransform } from "fontaine";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

type PkgDep = Record<string, string>;
const { dependencies = {}, devDependencies = {} } = pkg as any as {
  dependencies: PkgDep;
  devDependencies: PkgDep;
  [key: string]: unknown;
};

/**
 * Note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */
export default defineConfig(({ mode }): UserConfig => {
  errorOnDuplicatesPkgDeps(devDependencies, dependencies);

  return {
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
      vanillaExtractPlugin({
        identifiers: mode === "production" ? "short" : "debug",
      }),
      FontaineTransform.vite({
        fallbacks: {
          Inter: [
            "system-ui",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "sans-serif",
          ],
          Newsreader: [
            "Iowan Old Style",
            "Georgia",
            "Cambria",
            "Times New Roman",
            "serif",
          ],
        },
      }),
    ],
    optimizeDeps: {
      exclude: [],
    },
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

// *** utils ***

function errorOnDuplicatesPkgDeps(
  devDependencies: PkgDep,
  dependencies: PkgDep,
) {
  const duplicateDeps = Object.keys(devDependencies).filter(
    (dep) => dependencies[dep],
  );

  const qwikPkg = Object.keys(dependencies).filter((value) =>
    /qwik/i.test(value),
  );

  if (qwikPkg.length > 0) {
    throw new Error(
      `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`,
    );
  }

  if (duplicateDeps.length > 0) {
    throw new Error(
      `Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies". Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"`,
    );
  }
}
