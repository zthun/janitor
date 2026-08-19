import type { PathLike } from "node:fs";
import { existsSync, readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { resolve } from "node:path";

import type { Plugin, UserConfig } from "vite";

import { resolveCwd } from "../helpful/resolve-cwd.mjs";

/**
 * Options for externalizing dependencies.
 *
 * You should never really need to use these.  These mostly
 * help with testing.
 */
export interface ExternalizeOptions {
  /**
   * The path to the package json file that contains dependencies
   * to externalize.
   */
  packageJson?: PathLike;
}

/**
 * An externalize extension tells a project to not bundle the dependencies together.  
 *
 * This is mostly used for libraries and if you use extensionLibrary(), you do not
 * need to include this extension as it will be included for you already.
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
  const name = "janitor:extension-externalize";

  return [
    {
      name,
      config: (current) => {
        const cwd = resolveCwd(current);
        const fallback = resolve(cwd, "package.json");
        const { packageJson = fallback } = options;
        const externalDeps = new Set<RegExp>();

        if (!existsSync(packageJson)) {
          const msg = `[${name}] Could not find package.json at ${String(packageJson)}.`;
          throw new Error(msg);
        }

        const contents = readFileSync(packageJson).toString();
        const {
          dependencies = [],
          devDependencies = [],
          optionalDependencies = [],
          peerDependencies = [],
        } = JSON.parse(contents) as Record<string, Record<string, string>>;

        const push = externalDeps.add.bind(externalDeps);

        Object.keys(dependencies)
          .concat(Object.keys(devDependencies))
          .concat(Object.keys(optionalDependencies))
          .concat(Object.keys(peerDependencies))
          .map((dep) => new RegExp(`^${dep}(?:/.+)?$`))
          .forEach(push);

        builtinModules
          .map((module) => new RegExp(`^(?:node:)?${module}$`))
          .forEach(push);

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
