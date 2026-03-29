import {
  ZViteConfigBuilder,
  ZViteLibraryBuilder,
} from "@zthun/janitor-build-config/vite";
import { defineConfig } from "vite";

const library = new ZViteLibraryBuilder()
  .entry("eslint", "./src/es/eslint.mts")
  .entry("prettier", "./src/pretty/prettier.mts")
  .index()
  .build();

const config = new ZViteConfigBuilder().library(library).build();
export default defineConfig(config);
