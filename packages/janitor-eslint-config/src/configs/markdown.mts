import md from "@eslint/markdown";
import { defineConfig } from "eslint/config";

export const markdown = defineConfig(...md.configs.recommended);
