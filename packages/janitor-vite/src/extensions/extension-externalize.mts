import type { PathLike } from "node:fs";
import { resolve } from "node:path";

import type { Plugin, UserConfig } from "vite";

import { getAllNodeBuiltins } from "../helpful/get-all-node-builtins.mjs";
import { getAllPackageDependencies } from "../helpful/get-all-package-dependencies.mjs";
import { resolveCwd } from "../helpful/resolve-cwd.mjs";

/**
 * Options for externalizing dependencies.
 */
export interface ExternalizeOptions {
  /**
   * The path to the package json file that contains dependencies
   * to externalize or false to only externalize node builtins.
   *
   * If this is undefined, then the package.json in the current
   * working directory will be used.
   */
  packageJson?: PathLike | false;
}

/**
 * An externalize extension tells a project to not bundle the dependencies together.  
 *
 * This is mostly used for libraries and if you use extensionLibrary(), or projectNode()
 * you do not need to include this extension as it will be included for you already.
 *
 * @param options -
 *        Optional options for how to externalize dependency values.
 *
 * @returns
 *        A list of plugins that will stop vite from bundling packages
 *        from the node_modules directory and node builtins.
 */
export const extensionExternalize = (
  options: ExternalizeOptions = {},
): Plugin[] => {
  return [
    {
      name: "janitor:extension-externalize",
      config: (current) => {
        const cwd = resolveCwd(current);
        const fallback = resolve(cwd, "package.json");
        const { packageJson = fallback } = options;
        const externalDeps = new Set<RegExp>(getAllNodeBuiltins());

        if (packageJson !== false) {
          getAllPackageDependencies(packageJson).forEach((p) =>
            externalDeps.add(p),
          );
        }

        const depMatchers = Array.from(externalDeps);

        return {
          build: {
            rolldownOptions: {
              external: (source) => {
                return depMatchers.some((depMatcher) =>
                  depMatcher.test(source),
                );
              },
            },
          },
        } satisfies UserConfig;
      },
    },
  ];
};
