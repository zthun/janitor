import { imports } from "./imports";
import { javascript } from "./javascript";
import { prettier } from "./prettier";
import { typescript } from "./typescript";

export const recommended = [
  ...javascript,
  ...typescript,
  ...imports,
  ...prettier,
];
