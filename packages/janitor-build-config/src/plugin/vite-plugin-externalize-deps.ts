import { existsSync, readFileSync, type PathLike } from "node:fs";
import { builtinModules } from "node:module";
import { resolve } from "node:path";
import type { Plugin } from "vite";

// Original source code from
// https://github.com/davidmyersdev/vite-plugin-externalize-deps/blob/main/src/index.ts
// It takes to long to get this plugin updated, so I just copied the source code into
// here.  I don't think this plugin is maintained much anymore.  I've greatly reduced the
// options from this to be just a basic check for stuff in your package.json and node
// builtins.

export interface ExternalizeOptions {
  packageJson?: PathLike;
}

export const externalizeDeps = (options: ExternalizeOptions = {}): Plugin => {
  const { packageJson = resolve(process.cwd(), "package.json") } = options;

  return {
    name: "vite-plugin-externalize-deps",
    config: () => {
      const externalDeps = new Set<RegExp>();

      if (!existsSync(packageJson)) {
        const context = "janitor-build-config:externalizeDeps";
        const msg = `[${context}] Could not find package.json at ${packageJson}.`;
        throw new Error(msg);
      }

      const contents = readFileSync(packageJson).toString();
      const {
        dependencies = [],
        devDependencies = [],
        optionalDependencies = [],
        peerDependencies = [],
      } = JSON.parse(contents);

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
          rollupOptions: {
            external: (source) => {
              return depMatchers.some((depMatcher) => depMatcher.test(source));
            },
          },
        },
      };
    },
  };
};
