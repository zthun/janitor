import { defineConfig } from "eslint/config";
import globals from "globals";

function environment(environment) {
  return defineConfig({
    languageOptions: {
      globals: {
        ...environment,
      },
    },
  });
}

/**
 * Configurations for different environments.
 */
export const environments = {
  /**
   * Adds support for browser globals.
   */
  browser: [...environment(globals.browser)],
  /**
   * Adds support for node globals and node built in apis.
   */
  node: [...environment(globals.node), ...environment(globals.nodeBuiltin)],
};
