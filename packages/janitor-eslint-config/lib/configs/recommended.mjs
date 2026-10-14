import { defineConfig } from "eslint/config";

import { html } from "./html.mjs";
import { ignores } from "./ignores.mjs";
import { javascript } from "./javascript.mjs";
import { json } from "./json.mjs";
import { markdown } from "./markdown.mjs";
import { prettier } from "./prettier.mjs";
import { spelling } from "./spelling.mjs";
import { styles } from "./styles.mjs";
import { test } from "./test.mjs";
import { typescript } from "./typescript.mjs";
import { yaml } from "./yaml.mjs";

/**
 * A composite plugin list that adds all recommended plugins.
 *
 * This adds the following:
 *
 * 1. {@link ignores}
 * 1. {@link javascript}
 * 1. {@link typescript}
 * 1. {@link markdown}
 * 1. {@link json}
 * 1. {@link yaml}
 * 1. {@link styles}
 * 1. {@link html}
 * 1. {@link test}
 * 1. {@link spelling}
 * 1. {@link prettier}
 */
export const recommended = defineConfig([
  ...ignores,
  ...javascript,
  ...typescript,
  ...markdown,
  ...json,
  ...yaml,
  ...styles,
  ...html,
  ...test,
  ...spelling,
  ...prettier,
]);
