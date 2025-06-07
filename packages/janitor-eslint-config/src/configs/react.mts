import type { ESLint, Linter } from "eslint";
import _react from "eslint-plugin-react";

export const react: Linter.Config[] = [
  {
    files: ["**/*.{js,cjs,mjs,ts,mts,jsx,tsx}"],
    plugins: {
      react: _react as ESLint.Plugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // This one is not needed any longer as TypeScript jsx option
      // should be set to react-jsx.  You will need to turn this on
      // manually if it is set to the legacy react setting. See
      // https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-different-in-the-new-transform
      "react/react-in-jsx-scope": "off",
    },
  },
];
