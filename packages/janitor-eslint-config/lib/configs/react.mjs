import _react from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";
import _hooks from "eslint-plugin-react-hooks";

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
    ..._hooks.configs.flat.recommended,
    files: files(...ExtEs),
  },
  {
    files: files(...ExtEs),
    rules: {
      // There are times when refs are appropriate, especially if you are using
      // html dialog based elements, which you will most likely need to use
      // refs to move or focus.
      "react-hooks/refs": "off",
    },
  },
]);
