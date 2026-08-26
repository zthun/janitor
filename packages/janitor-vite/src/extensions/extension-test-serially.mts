import type { Plugin } from "vite";

/**
 * An extension plugin that makes vitest run serially, without parallelism.
 *
 * Normally, you don't want this and your test performance will
 * be negatively impacted; however, if your tests use shared resources
 * and only allow one access point to those resources at a time, use this extension
 * for your library/project to run tests one at a time.
 *
 * @returns
 *        A plugin set that makes vitest run all tests serially instead of in
 *        parallel.
 */
export function extensionTestSerially(): Plugin[] {
  return [
    {
      name: "janitor:extension-test-serially",
      config: () => {
        return {
          test: {
            fileParallelism: false,
            maxConcurrency: 1,
            isolate: true,
          },
        };
      },
    },
  ];
}
