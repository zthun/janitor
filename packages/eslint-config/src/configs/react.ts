import _react from "eslint-plugin-react";

export const react = [
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: _react,
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
