import { defineConfig } from "eslint/config";
import { configs, parser } from "typescript-eslint";

import { ExtTs, ExtTsx, files, filesTest } from "../files/files.mjs";

// The default typescript linter recommended shared configs are
// absolutely terrible as they weave their way into every single
// file, even if the extensions make no sense.  So we are going
// to be more selective about which files we actually will apply
// these rules to.  We have to flatten all this mess out.
// Seriously, do better Microsoft.
const { base, eslintRecommended, recommendedTypeChecked } = configs;
const name = "typescript-eslint/recommended-type-checked";
const recommended = recommendedTypeChecked.find((x) => x.name === name) || {};
const { rules } = recommended;

export const typescript = defineConfig([
  {
    ...base,
    files: files(...ExtTs, ...ExtTsx),
  },
  {
    ...eslintRecommended,
    files: files(...ExtTs, ...ExtTsx),
  },
  {
    ...recommended,
    languageOptions: {
      parser,
      parserOptions: {
        projectService: true,
      },
      sourceType: "module",
    },
    files: files(...ExtTs, ...ExtTsx),
    rules: {
      ...rules,
      // We want to be able to use a single build system for most things.
      // Ideally, we can use vite to build all project types so we don't
      // have 4 different build systems across different projects.  Thus
      // we need to make sure that swc, esbuild, and tsc are supported.
      // Forcing type imports ensures this.
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      // There are times when any and legacy namespaces makes sense.
      // If you use any kind of decorator library, you will almost
      // be required to use any at some point.  Forcing a non use of them
      // means you're spending a bunch of time play type gymnastics and to
      // hell with that.
      "@typescript-eslint/no-namespace": "off",

      // JavaScript is any by default; The sentiment here is understood
      // to prefer unknown over any but there are times where any
      // helps, especially if we don't have a typescript api for
      // a 3rd party dependency.  If something is declared as any,
      // let's treat it as it is meant to be used.  May revisit this
      // decision later on, but for now, any is allowed.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      // Would be fine, but there's a bug in this where you have a function with
      // access arguments.  Those constructors are often empty - so we want to let
      // a part of this one through.
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": [
        "error",
        { allow: ["constructors"] },
      ],

      // A lot of 3rd party libraries still don't support esm
      // and trying to force this right now just isn't feasible.
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",

      // I want aliasing support.
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-empty-interface": "off",

      // You will need unsafe declaration merging if you are doing anything
      // with decorators as what often happens is that TypeScript cannot infer
      // the output type of a decorator. So this has to be on to deal with
      // TypeScripts shortcoming in this department.  See
      // https://github.com/microsoft/TypeScript/issues/4881 for more information.
      "@typescript-eslint/no-unsafe-declaration-merging": "off",

      // I can technically agree with this, but where this comes in
      // handy is unit testing and I value that, so I want support
      // to make the assumption that I know what I'm doing when
      // I make a non-null assertion.
      "@typescript-eslint/no-non-null-assertion": "off",

      // This is actually fine, but this is broken in typescript eslint 8.14.x.
      // See https://github.com/typescript-eslint/typescript-eslint/issues/10353
      // for the bug.
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: false,
        },
      ],
    },
  },
  {
    files: filesTest(...ExtTs, ...ExtTsx),
    rules: {
      // This is fine in non tests, but in tests, it prevents the
      // use of toHaveBeenCalled matchers, so it has to be turned off.
      "@typescript-eslint/unbound-method": "off",
    },
  },
]);
