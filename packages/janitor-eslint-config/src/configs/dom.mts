import css from "@eslint/css";
import html from "@html-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

import { ExtCss, ExtHtml, files } from "../files/files.mjs";

export const dom = defineConfig([
  {
    ...html.configs["flat/recommended"],
    files: files(ExtHtml),
    rules: {
      // Prettier defaults to 2 spaces, so this needs to as well.
      "@html-eslint/indent": ["error", 2],
    },
  },
  {
    ...css.configs.recommended,
    files: files(ExtCss),
  },
]);
