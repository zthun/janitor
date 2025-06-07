import js from "@eslint/js";
import type { Linter } from "eslint";

export const javascript: Linter.Config[] = [
  js.configs.recommended,
  {
    rules: {
      // We want to support == null so we get a good check for undefined
      // or null
      eqeqeq: ["error", "smart"],
      // Would be fine, but there's a bug in this where you have a function with
      // access arguments.  Those constructors are often empty - so we want to let
      // a part of this one through.
      "no-empty-function": "off",
    },
  },
];
