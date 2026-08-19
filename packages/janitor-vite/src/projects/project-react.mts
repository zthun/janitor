import react from "@vitejs/plugin-react-swc";
import type { Plugin } from "vite";

import { projectDom } from "./project-dom.mjs";

/**
 * A project that builds out a react website.
 *
 * A react website is just a dom project that has the
 * react swc plugin enabled.
 *
 * This should normally be coupled with the server extension
 * for full debugging support.
 *
 * @returns
 *        A list of plugins that builds a react website.
 */
export function projectReact(): Plugin[] {
  return [
    ...projectDom(),
    ...react(),
    {
      name: "janitor:project-react",
      config: () => {
        return {
          oxc: false,
        };
      },
    },
  ];
}
