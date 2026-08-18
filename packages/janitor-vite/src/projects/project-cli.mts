import type { Plugin } from "vite";

import { projectNode } from "./project-node.mjs";

/**
 * Currently the same as {@link projectNode}.
 *
 * @returns
 *        A list of plugins that turn your project into a cli.
 */
export function projectCli(): Plugin[] {
  return [
    ...projectNode(),
    {
      name: "janitor:project-cli",
    },
  ];
}
