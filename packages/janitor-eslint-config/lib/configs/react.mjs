import _react from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";

import { ExtEs, files } from "../files/files.mjs";

export const react = defineConfig([
  {
    files: files(...ExtEs),
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ..._react.configs.recommended,
    files: files(...ExtEs),
  },
  {
    files: files(...ExtEs),
    rules: {
      // This one is broken.  You actually don't need a removeEventListener
      // if you are using an AbortController.  This results in false
      // positives.
      "@eslint-react/web-api-no-leaked-event-listener": "off",
    },
  },
]);
