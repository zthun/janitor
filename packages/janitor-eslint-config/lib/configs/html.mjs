import css from "@eslint/css";
import _html from "@html-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

import { ExtCss, ExtHtml, files } from "../files/files.mjs";

export const html = defineConfig([
  {
    ..._html.configs["flat/recommended"],
    files: files(...ExtHtml),
    language: "@html-eslint/html",
  },
  {
    files: files(...ExtHtml),
    rules: {
      // All of these rules conflict with prettier and that linter
      // is the highest priority for formatting.  So we don't need
      // these rules turned on.
      "@html-eslint/indent": "off",
      "@html-eslint/no-extra-spacing-attrs": "off",
      "@html-eslint/require-closing-tags": "off",
      "@html-eslint/attrs-newline": "off",
    },
  },
  {
    ...css.configs.recommended,
    files: files(...ExtCss),
    language: "css/css",
  },
]);
