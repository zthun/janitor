import { defineConfig } from "eslint/config";
import { configs } from "eslint-plugin-yml";

/**
 * Adds support to lint yaml files.
 */
export const yaml = defineConfig([configs.recommended]);
