import type { Plugin } from "vite";

import { projectNode } from "./project-node.mjs";

/**
 * Currently the same as {@link projectNode}.
 *
 * @returns
 *        A list of plugins that turn your project into an app that
 *        runs a NestJS backend.
 */
export function projectNestJs(): Plugin[] {
  return [
    ...projectNode(),
    {
      name: "janitor:project-nestjs",
    },
  ];
}
