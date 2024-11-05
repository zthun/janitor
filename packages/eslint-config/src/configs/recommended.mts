import { imports } from "./imports.mjs";
import { javascript } from "./javascript.mjs";
import { prettier } from "./prettier.mjs";
import { typescript } from "./typescript.mjs";

export const recommended = [
  ...javascript,
  ...typescript,
  ...imports,
  ...prettier,
];
