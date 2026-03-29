import html from "@html-eslint/eslint-plugin";
import type { Linter } from "eslint";

const files = ["**/*.html", "**/*.htm"];

export const dom: Linter.Config[] = [
  {
    files,
    ...html.configs["flat/recommended"],
  },
  {
    files,
    rules: {
      // Prettier defaults to 2 spaces, so this needs to as well.
      "@html-eslint/indent": ["error", 2],
    },
  },
];
