import vitest from "@vitest/eslint-plugin";
import type { Linter } from "eslint";

export const test: Linter.Config[] = [
  vitest.configs.recommended,
  {
    rules: {
      // This requires an expect call in a test block, which prevents helper
      // functions to reuse test logic.  This needs to be turned off.
      "vitest/expect-expect": "off",
    },
  },
];
