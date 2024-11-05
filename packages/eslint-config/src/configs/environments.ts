import { Linter } from "eslint";
import globals from "globals";

function environment(environment: object): Linter.Config {
  return {
    languageOptions: {
      globals: {
        ...environment,
      },
    },
  };
}

export const environments = {
  browser: [environment(globals.browser)],
  node: [environment(globals.node), environment(globals.nodeBuiltin)],
};
