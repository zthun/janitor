module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
  ],
  plugins: ["@typescript-eslint", "import", "tsdoc"],
  rules: {
    // We want to support == null so we get a good check for undefined
    // or null
    eqeqeq: ["error", "smart"],

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
    "@typescript-eslint/no-empty-interface": "off",

    // I can technically agree with this, but where this comes in
    // handy is unit testing and I value that more than I value
    // a linter telling me what to do.
    "@typescript-eslint/no-non-null-assertion": "off",

    // Either I'm reading this wrong or this rule is just straight up
    // broken when combined with TypeScript.  It requires the types
    // use import type from { module } even when Typescript is
    // supporting a direct import.
    "import/named": "off",

    // This one is not needed - TypeScript does this for us.
    "import/no-unresolved": "off",
  },
};
