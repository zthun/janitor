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
