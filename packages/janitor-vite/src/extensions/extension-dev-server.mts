import type { Plugin } from "vite";

/**
 * Options for the dev server.
 *
 * The expectation for almost every repository in this instance
 * is that it is running the backend and frontend in a docker
 * compose environment, so it assumes it will be running in a docker
 * network.  
 *
 * If this isn't true, then these options will be useful.
 */
export interface ExtensionDevServerOptions {
  /**
   * The port to run on.  
   *
   * @default 5173
   */
  port?: number;

  /**
   * The binding host.
   *
   * @default "0.0.0.0"
   */
  host?: string;
}

/**
 * Adds a dev server to your vite build.
 *
 * This is usually paired with a dom based project and
 * is only used for debugging.  AllowedHosts in this plugin
 * is set to true to allow for local manipulation of the
 * OS host file to simulate true domains.
 *
 * @returns
 *        A list of plugins that add the dev server option.
 */
export function extensionDevServer(
  options: ExtensionDevServerOptions = {},
): Plugin[] {
  const { port = 5173, host = "0.0.0.0" } = options;

  return [
    {
      name: "janitor:extension-dev-server",
      config: () => {
        return {
          server: {
            allowedHosts: true,
            strictPort: true,
            host,
            port,
          },
        };
      },
    },
  ];
}
