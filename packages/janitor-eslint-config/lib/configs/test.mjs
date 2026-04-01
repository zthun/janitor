import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";

import { ExtEs, filesTest } from "../files/files.mjs";

export const test = defineConfig([
  {
    ...vitest.configs.recommended,
    files: filesTest(...ExtEs),
  },
  {
    files: filesTest(...ExtEs),
    rules: {
      // This requires an expect call in a test block, which prevents helper
      // functions to reuse test logic.  This needs to be turned off.
      "vitest/expect-expect": "off",
    },
  },
]);
