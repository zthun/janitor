import cspell from "@cspell/eslint-plugin/recommended";
import { defineConfig } from "eslint/config";

/**
 * Adds linting for spelling.
 *
 * This assumes you have a cspell.json dictionary in your
 * root or .config folder.
 */
export const spelling = defineConfig([cspell]);
