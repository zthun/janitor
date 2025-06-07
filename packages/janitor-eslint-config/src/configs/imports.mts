import type { Linter } from "eslint";
import _import from "eslint-plugin-import";

export const imports: Linter.Config[] = [
  _import.flatConfigs.recommended,
  {
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
    },
  } satisfies Linter.Config,
];
