import type { Plugin } from "vite";

import { project } from "./project.mjs";

/**
 * A project for the DOM is a frontend application built with
 * basic web components, html, and css.
 *
 * Frontend projects with frameworks will automatically have this plugin.
 *
 * This will set the testing environment to happy-dom.
 *
 * @returns
 *      A list of plugins that setup a vite build as a project for
 *      a frontend.
 */
export function projectDom(): Plugin[] {
  return [
    ...project(),
    {
      name: "janitor:project-dom",
      config: () => {
        return {
          test: {
            environment: "happy-dom",
            pool: "vmThreads",
            environmentOptions: {
              happyDOM: {
                settings: {
                  // This is to shut up happy-dom yelling about not being able
                  // to download some injected css files.
                  handleDisabledFileLoadingAsSuccess: true,
                },
              },
            },
          },
        };
      },
    },
  ];
}
