import { defineConfig } from "eslint/config";
import pretty from "eslint-plugin-prettier/recommended";

export const prettier = defineConfig([
  pretty,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          // If you don't set proseWrap to always, markdown
          // does not line break properly, so we are setting it
          // here.
          proseWrap: "always",
        },
      ],
    },
  },
]);
