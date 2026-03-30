import { defineConfig, globalIgnores } from "eslint/config";

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
  ]),
]);
