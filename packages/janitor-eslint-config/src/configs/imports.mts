import type { Linter } from "eslint";
import _import from "eslint-plugin-import";
import _simple from "eslint-plugin-simple-import-sort";
import _unused from "eslint-plugin-unused-imports";

export const imports: Linter.Config[] = [
  _import.flatConfigs.recommended,
  {
    plugins: {
      "unused-imports": _unused,
      "simple-import-sort": _simple,
    },
    rules: {
      // This lint error is the main reason to use import as we want to make
      // sure we've installed our dependencies correctly.
      "import/no-extraneous-dependencies": "error",

      // These are straight up broken with Typescript when you need to work with
      // mts files that must have the file extension present.  These can be fixed
      // using resolves, but it's such a pain and it's just not worth the hassle
      // for basic linting support.  The no-extraneous-dependencies is really
      // the recommended config we want, so these being forced off are fine.
      "import/named": "off",
      "import/no-unresolved": "off",

      // This is the same as import/no-unused-modules, but that one does not
      // auto fix when it's detected and this one does, so we are favoring this
      // one instead.  We're turning off no-unused-modules in case the default
      // recommended config ever turns it on.
      "import/no-unused-modules": "off",
      "unused-imports/no-unused-imports": "error",

      // The simple import sort plugin is mostly here for sorting the imports
      // with fix support.  The option, import/order does something similar
      // and is much more configurable, but it doesn't support sorting exports
      // Simple import sort is much more config free and basic and it's grouping
      // is just fine, so we are using this instead of the more complex
      // alternative.
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  } satisfies Linter.Config,
];
