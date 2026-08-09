import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import { flatConfigs as _import } from "eslint-plugin-import-x";
import _simple from "eslint-plugin-simple-import-sort";
import _unused from "eslint-plugin-unused-imports";

import { ExtEs, files } from "../files/files.mjs";

export const javascript = defineConfig([
  {
    ...js.configs.recommended,
    files: files(...ExtEs),
  },
  {
    files: files(...ExtEs),
    rules: {
      // We want to support == null so we get a good check for undefined
      // or null
      eqeqeq: ["error", "smart"],
    },
  },
  {
    ..._import.recommended,
    files: files(...ExtEs),
    languageOptions: {
      parserOptions: {
        // The ecma version from the import config is 2018, and we
        // want some later features.  This should support
        // our current version that janitor-ts-config supports
        // by default.
        ecmaVersion: 2022,
      },
    },
  },
  {
    files: files(...ExtEs),
    rules: {
      // This lint error is the main reason to use import as we want to make
      // sure we've installed our dependencies correctly.
      "import-x/no-extraneous-dependencies": "error",

      // These are straight up broken with Typescript when you need to work with
      // mts files that must have the file extension present.  These can be fixed
      // using resolves, but it's such a pain and it's just not worth the hassle
      // for basic linting support.  The no-extraneous-dependencies is really
      // the recommended config we want, so these being forced off are fine.
      "import-x/named": "off",
      "import-x/no-unresolved": "off",
    },
  },
  {
    files: files(...ExtEs),
    plugins: {
      "simple-import-sort": _simple,
    },
    rules: {
      // The simple import sort plugin is mostly here for sorting the imports
      // with fix support.  The option, import/order does something similar
      // and is much more configurable, but it doesn't support sorting exports
      // Simple import sort is much more config free and basic and it's grouping
      // is just fine, so we are using this instead of the more complex
      // alternative.
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: files(...ExtEs),

    plugins: {
      "unused-imports": _unused,
    },
    rules: {
      // This is the same as import/no-unused-modules, but that one does not
      // auto fix when it's detected and this one does, so we are favoring this
      // one instead.  We're turning off no-unused-modules in case the default
      // recommended config ever turns it on.
      "import-x/no-unused-modules": "off",
      "unused-imports/no-unused-imports": "error",
    },
  },
]);
