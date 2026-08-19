import "vitest/config";

import type { Plugin } from "vite";

import { resolveCwd } from "../path/resolve-cwd.mjs";

/**
 * A special project type for the root vite config or vitest config where
 * the repository is a monorepo of packages that use more than one config entry
 * for each package.
 *
 * This should only be set in a monorepo where the root just specifies which
 * packages the monorepo outputs.  It sets up vitest to look for vite.config
 * files under each package.
 *
 * @returns
 *        The list of plugins to use for the root monorepo.
 */
export function projectMonorepo(): Plugin[] {
  return [
    {
      name: "janitor:project-monorepo",
      config: (current) => {
        const cwd = resolveCwd(current);

        return {
          test: {
            projects: [
              `${cwd}/packages/*/{vite,vitest}.config.{js,cjs,mjs,ts,mts}`,
            ],
          },
        };
      },
    },
  ];
}
