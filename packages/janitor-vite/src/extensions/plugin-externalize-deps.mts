import type { PathLike } from "node:fs";
import { existsSync, readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { resolve } from "node:path";

import type { Plugin, UserConfig } from "vite";

import { resolveCwd } from "../path/resolve-cwd.mjs";

// Original source code from
// https://github.com/davidmyersdev/vite-plugin-externalize-deps/blob/main/src/index.ts
// It takes to long to get this plugin updated, so I just copied the source code into
// here.  I don't think the original plugin is maintained much anymore.  I've greatly
// reduced the options from this to be just a basic check for stuff in your
// package.json and node builtins.

export interface ExternalizeOptions {
  packageJson?: PathLike;
}

const context = "janitor:plugin-externalize-deps";

export const externalizeDeps = (options: ExternalizeOptions = {}): Plugin => {
  return {
    name: context,
    config: (current) => {
      const cwd = resolveCwd(current);
      const fallback = resolve(cwd, "package.json");
      const { packageJson = fallback } = options;
      const externalDeps = new Set<RegExp>();

      if (!existsSync(packageJson)) {
        const msg = `[${context}] Could not find package.json at ${String(packageJson)}.`;
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
              return depMatchers.some((depMatcher) => depMatcher.test(source));
            },
          },
        },
      } satisfies UserConfig;
    },
  };
};
