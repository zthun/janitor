import { resolve } from "node:path";

import type { Plugin } from "vite";

import { extensionExternalize } from "../extensions/extension-externalize.mjs";
import { resolveCwd } from "../helpful/resolve-cwd.mjs";
import { project } from "./project.mjs";

/**
 * A plugin that marks a project as a node application.
 *
 * Node applications expect an entry point of main.mts under the
 * src directory.
 *
 * @returns
 *        A list of plugins that turn a project into a node base cli
 *        project.
 */
export function projectNode(): Plugin[] {
  return [
    ...project(),
    ...extensionExternalize({ packageJson: false }),
    {
      name: "janitor:project-node",
      config: (current) => {
        const cwd = resolveCwd(current);

        return {
          resolve: {
            conditions: ["module", "node", "development|production"],
            mainFields: ["module", "jsnext:main", "jsnext"],
          },
          build: {
            lib: {
              entry: {
                main: resolve(cwd, "./src/main.mts"),
              },
              formats: ["es"],
            },
          },
        };
      },
    },
  ];
}
