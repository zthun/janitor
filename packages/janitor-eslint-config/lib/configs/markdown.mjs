import md from "@eslint/markdown";
import { defineConfig } from "eslint/config";

/**
 * Adds markdown linting to your project.
 */
export const markdown = defineConfig(...md.configs.recommended);
