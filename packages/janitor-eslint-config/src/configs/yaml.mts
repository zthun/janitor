import { defineConfig } from "eslint/config";
import { configs } from "eslint-plugin-yml";

export const yaml = defineConfig([configs.recommended]);
