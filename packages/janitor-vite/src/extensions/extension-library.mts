import { resolve } from "node:path";

import { castArray } from "lodash-es";
import dts from "unplugin-dts/vite";
import type { Plugin } from "vite";

import { resolveCwd } from "../path/resolve-cwd.mjs";
import { extensionExternalize } from "./extension-externalize.mjs";

/**
 * Turns any project into a shared library.
 *
 * A library does not actually run any code, it simply contains shared
 * code that makes up other projects.
 *
 * A library is expected to have an index.mts file under the src directory
 * that is a long list of exports that the library will provide to consumers.
 * Only one barrel export should be used for a library. It's better to have
 * multiple libraries than to complicate a library with subpaths in the
 * exports of package.json.  This keeps the expectations that when you npm
 * library "foo", you can do import { something } from 'foo' and not need to
 * have the brain overload of hunting down available paths from within.
 *
 * When you classify something as a library, source maps are turned on,
 * and none of your code for it will be minified.  This is to help with
 * debugging library code outside of the library development environment.
 * Module libraries in the janitor system are not expected to be deployed
 * to a system by themselves.  They are bundled with the overarching parent
 * application.
 *
 * @returns
 *        The list of plugins that turn any project into a library.
 */
export function extensionLibrary(): Plugin[] {
  return [
    ...extensionExternalize(),
    ...castArray(
      dts({
        compilerOptions: {
          // Always turn off paths when building for production.  You want to make
          // sure that your build is building in the correct order and that your
          // actual paths are correct.
          paths: {},
        },
        // We only want to include output source files, not any config files outside
        // of our source code directory.
        include: ["src/**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
        // Make sure to exclude spec and test files as well, these don't need to
        // be included (and shouldn't be).
        exclude: ["**/*.{spec,test}.{js,mjs,cjs,ts,mts,jsx,tsx}"],
      }),
    ),
    {
      name: "janitor:extension-library",
      config: (current) => {
        const cwd = resolveCwd(current);

        return {
          build: {
            minify: false,
            sourcemap: true,
            lib: {
              entry: {
                index: resolve(cwd, "./src/index.mts"),
              },
              formats: ["es"],
            },
          },
        };
      },
    },
  ];
}
