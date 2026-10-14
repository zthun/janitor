import { defineConfig } from "eslint/config";
import pretty from "eslint-plugin-prettier/recommended";

/**
 * Adds stylistic code format linting to your project.
 *
 * If you have this as a plugin, then you should not use
 * prettier as your default formatter, but instead just
 * do an eslint fix on each save.
 */
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
