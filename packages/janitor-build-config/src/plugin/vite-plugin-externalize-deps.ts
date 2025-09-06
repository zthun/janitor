import { existsSync, readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { join } from "node:path";
import type { Plugin } from "vite";

// Original source code from
// https://github.com/davidmyersdev/vite-plugin-externalize-deps/blob/main/src/index.ts
// It takes to long to get this plugin updated, so I just copied the source code into
// here.  I don't think this plugin is maintained much anymore.

interface UserOptions {
  deps: boolean;
  devDeps: boolean;
  except: Array<string | RegExp>;
  include: Array<string | RegExp>;
  nodeBuiltins: boolean;
  optionalDeps: boolean;
  peerDeps: boolean;
  useFile: string;
}

export const externalizeDeps = (options: Partial<UserOptions> = {}): Plugin => {
  const parseFile = (file: string) => {
    return JSON.parse(readFileSync(file).toString());
  };

  const optionsResolved: UserOptions = {
    deps: true,
    devDeps: false,
    except: [],
    include: [],
    nodeBuiltins: true,
    optionalDeps: true,
    peerDeps: true,
    useFile: join(process.cwd(), "package.json"),
    // User options take priority.
    ...options,
  };

  return {
    name: "vite-plugin-externalize-deps",
    config: () => {
      if (!existsSync(optionsResolved.useFile)) {
        throw new Error(
          `[vite-plugin-externalize-deps] The file specified for useFile (${optionsResolved.useFile}) does not exist.`,
        );
      }

      const externalDeps = new Set<RegExp>();
      const {
        dependencies = {},
        devDependencies = {},
        optionalDependencies = {},
        peerDependencies = {},
      } = parseFile(optionsResolved.useFile);

      if (optionsResolved.deps) {
        Object.keys(dependencies).forEach((dep) => {
          const depMatcher = new RegExp(`^${dep}(?:/.+)?$`);

          externalDeps.add(depMatcher);
        });
      }

      if (optionsResolved.devDeps) {
        Object.keys(devDependencies).forEach((dep) => {
          const depMatcher = new RegExp(`^${dep}(?:/.+)?$`);

          externalDeps.add(depMatcher);
        });
      }

      if (optionsResolved.nodeBuiltins) {
        builtinModules.forEach((builtinModule) => {
          const builtinMatcher = new RegExp(`^(?:node:)?${builtinModule}$`);

          externalDeps.add(builtinMatcher);
        });
      }

      if (optionsResolved.optionalDeps) {
        Object.keys(optionalDependencies).forEach((dep) => {
          const depMatcher = new RegExp(`^${dep}(?:/.+)?$`);

          externalDeps.add(depMatcher);
        });
      }

      if (optionsResolved.peerDeps) {
        Object.keys(peerDependencies).forEach((dep) => {
          const depMatcher = new RegExp(`^${dep}(?:/.+)?$`);

          externalDeps.add(depMatcher);
        });
      }

      const depMatchers = Array.from(externalDeps);

      const isException = (id: string) => {
        return optionsResolved.except.some((exception) => {
          if (typeof exception === "string") {
            return exception === id;
          }

          return exception.test(id);
        });
      };

      const isIncluded = (id: string) => {
        return optionsResolved.include.some((included) => {
          if (typeof included === "string") {
            return included === id;
          }

          return included.test(id);
        });
      };

      return {
        build: {
          rollupOptions: {
            external: (source) => {
              if (isException(source)) {
                return false;
              }

              if (isIncluded(source)) {
                return true;
              }

              return depMatchers.some((depMatcher) => depMatcher.test(source));
            },
          },
        },
      };
    },
  };
};
