import css from "@eslint/css";
import { defineConfig } from "eslint/config";

import { ExtCss, files } from "../files/files.mjs";

export const styles = defineConfig([
  {
    ...css.configs.recommended,
    files: files(...ExtCss),
    language: "css/css",
  },
]);
