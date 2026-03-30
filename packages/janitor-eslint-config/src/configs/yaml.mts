import { defineConfig } from "eslint/config";
import { configs } from "eslint-plugin-yml";

import { ExtYaml, files } from "../files/files.mjs";

export const yaml = defineConfig([
  {
    ...configs.recommended,
    files: files(...ExtYaml),
  },
]);
