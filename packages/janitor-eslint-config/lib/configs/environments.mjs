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

export const environments = {
  browser: [...environment(globals.browser)],
  node: [...environment(globals.node), ...environment(globals.nodeBuiltin)],
};
