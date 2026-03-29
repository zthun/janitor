import js from "@eslint/js";
import type { Linter } from "eslint";

export const javascript: Linter.Config[] = [
  js.configs.recommended,
  {
    rules: {
      // We want to support == null so we get a good check for undefined
      // or null
      eqeqeq: ["error", "smart"],
    },
  },
];
