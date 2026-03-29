import { imports } from "./imports.mjs";
import { javascript } from "./javascript.mjs";
import { prettier } from "./prettier.mjs";
import { styles } from "./styles.mjs";
import { test } from "./test.mjs";
import { typescript } from "./typescript.mjs";

export const recommended = [
  ...javascript,
  ...typescript,
  ...imports,
  ...styles,
  ...test,
  ...prettier,
];
