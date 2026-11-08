// Installs tools/lint (Qwik's ESLint rules, on TypeScript 6) the first time it is needed, so the
// pre-commit hook and `npm run lint` work on a fresh clone.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const lint = join(import.meta.dirname, "..", "tools", "lint");

if (!existsSync(join(lint, "node_modules", ".bin"))) {
  console.log("Installing tools/lint (first run only)...");
  const result = spawnSync("npm", ["ci", "--prefix", lint], {
    stdio: "inherit",
    shell: true,
  });
  process.exit(result.status ?? 1);
}
