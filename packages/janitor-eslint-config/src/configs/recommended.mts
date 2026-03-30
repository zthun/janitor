import { defineConfig } from "eslint/config";

import { ignores } from "./ignores.mjs";
import { javascript } from "./javascript.mjs";
import { json } from "./json.mjs";
import { markdown } from "./markdown.mjs";
import { prettier } from "./prettier.mjs";
import { test } from "./test.mjs";
import { typescript } from "./typescript.mjs";

export const recommended = defineConfig([
  ...ignores,
  ...javascript,
  ...typescript,
  ...markdown,
  ...json,
  ...test,
  ...prettier,
]);
