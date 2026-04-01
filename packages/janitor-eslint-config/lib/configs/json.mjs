import _json from "@eslint/json";
import { defineConfig } from "eslint/config";

import { ExtJson, files } from "../files/files.mjs";

export const json = defineConfig([
  {
    ..._json.configs.recommended,
    files: files(...ExtJson),
  },
  {
    files: files("json"),
    language: "json/json",
  },
  {
    files: files("jsonc"),
    language: "json/jsonc",
  },
  {
    files: files("json5"),
    language: "json/json5",
  },
]);
