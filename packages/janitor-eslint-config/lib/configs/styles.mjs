import css from "@eslint/css";
import { defineConfig } from "eslint/config";

import { ExtCss, files } from "../files/files.mjs";

/**
 * Adds linting for css.
 */
export const styles = defineConfig([
  {
    ...css.configs.recommended,
    files: files(...ExtCss),
    language: "css/css",
  },
]);
