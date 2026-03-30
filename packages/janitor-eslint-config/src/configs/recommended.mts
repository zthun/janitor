import { javascript } from "./javascript.mjs";
import { prettier } from "./prettier.mjs";
import { test } from "./test.mjs";
import { typescript } from "./typescript.mjs";

export const recommended = [...javascript, ...typescript, ...test, ...prettier];
