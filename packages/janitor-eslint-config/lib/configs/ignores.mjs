import { defineConfig, globalIgnores } from "eslint/config";

/**
 * Adds the standard global ignores.
 */
export const ignores = defineConfig([
  globalIgnores([
    // Outputs
    "**/dist",
    "**/node_modules",
    "**/coverage",
    "**/CHANGELOG.md",

    // Generated
    "**/.yarn",
    "**/*.husky",
    "**/lerna.json",
    "**/cspell.json",
  ]),
]);
