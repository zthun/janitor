import type { Linter } from "eslint";
import ts from "typescript-eslint";

// The default typescript linter recommended rules operate on js files
// as well, which is something we don't actually want.  JS files should
// only need the javascript rules, not the typescript rules.  You
// really shouldn't expect js, mjs, jsx, and cjs to follow typescript
// standards.
const files = ["**/*.ts", "**/*.mts", "**/*.tsx", "**/*.cts"];
const { recommended, recommendedTypeCheckedOnly } = ts.configs;
const target = "typescript-eslint/recommended-type-checked-only";
const recommendedTypeChecked = recommendedTypeCheckedOnly.find(
  (x) => x.name === target,
)?.rules;

export const typescript: Linter.Config[] = [
  ...recommended,
  {
    files,
    rules: {
      // TypeScript overtakes these.
      "no-empty-function": "off",
    },
  },
  {
    files,
    rules: {
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
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",

      // Would be fine, but there's a bug in this where you have a function with
      // access arguments.  Those constructors are often empty - so we want to let
      // a part of this one through.
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
    files,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      ...recommendedTypeChecked,
    },
  },
  {
    files: ["**/*.{spec,test}.{ts,mts,tsx}"],
    rules: {
      // This rule is great for normal use, but it prevents
      // toHaveBeenCalled style invocations, so for test files
      // we are turning this one off.
      "@typescript-eslint/unbound-method": "off",
    },
  },
];
