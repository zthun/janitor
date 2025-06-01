import {
  ZViteConfigBuilder,
  ZViteLibraryBuilder,
} from "@zthun/janitor-build-config/vite";
import { defineConfig } from "vite";

const library = new ZViteLibraryBuilder()
  .entry("eslint", "./src/es/eslint.mts")
  .entry("htmlhint", "./src/html/htmlhint.mts")
  .entry("markdownlint", "./src/markdown/markdownlint.mts")
  .entry("prettier", "./src/pretty/prettier.mts")
  .entry("stylelint", "./src/style/stylelint.mts")
  .entry("stylelint-less", "./src/style/stylelint-less.mts")
  .entry("stylelint-sass", "./src/style/stylelint-sass.mts")
  .entry("index", "./src/index.ts")
  .build();

const config = new ZViteConfigBuilder(__dirname).library(library).build();
export default defineConfig(config);
