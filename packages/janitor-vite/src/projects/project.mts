import swc from "unplugin-swc";
import type { Plugin } from "vite";

/**
 * The base plugin for all project types.
 *
 * This will be included with every project.  The default build engine for all projects
 * is swc.  While esbuild and oxc outperform swc, swc has the closest and most accurate
 * implementation of the latest ECMAScript features which gives us one unified build engine.
 *
 * A vite build should only include one project type and as many extensions as it wants.
 *
 * @returns
 *        A list of plugins that all project types will provide.
 */
export function project(): Plugin[] {
  return [
    swc.vite({
      jsc: {
        transform: {
          react: {
            runtime: "automatic",
          },
        },
      },
    }),
    {
      name: "janitor:project",
      config: () => {
        return {
          ocx: false,
          resolve: {
            tsconfigPaths: true,
          },
          build: {
            chunkSizeWarningLimit: 8000,
            minify: true,
            sourcemap: false,
            rolldownOptions: {
              checks: {
                pluginTimings: false,
              },
            },
          },
          test: {
            globals: true,
            testTimeout: 20000,
            maxConcurrency: 10,
          },
        };
      },
    },
  ];
}
