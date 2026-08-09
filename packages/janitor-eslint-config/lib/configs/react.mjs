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
]);
