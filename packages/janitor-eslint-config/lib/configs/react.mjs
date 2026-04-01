import { defineConfig } from "eslint/config";
import _react from "eslint-plugin-react";
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
    ..._react.configs.flat.recommended,
    files: files(...ExtEs),
    rules: {
      // This one is not needed any longer as TypeScript jsx option
      // should be set to react-jsx.  You will need to turn this on
      // manually if it is set to the legacy react setting. See
      // https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-different-in-the-new-transform
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    ..._hooks.configs.flat.recommended,
    files: files(...ExtEs),
    rules: {
      // There are times when refs are appropriate, especially if you are using
      // html dialog based elements, which you will most likely need to use
      // refs to move or focus.
      "react-hooks/refs": "off",
    },
  },
]);
