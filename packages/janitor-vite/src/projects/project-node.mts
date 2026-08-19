import { resolve } from "node:path";

import type { Plugin } from "vite";

import { resolveCwd } from "../path/resolve-cwd.mjs";
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
    {
      name: "janitor:project-node",
      config: (current) => {
        const cwd = resolveCwd(current);

        return {
          build: {
            lib: {
              entry: resolve(cwd, "./src/main.mts"),
              formats: ["es"],
            },
          },
        };
      },
    },
  ];
}
