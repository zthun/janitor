import { defineConfig } from "vite";
import { ZViteConfigBuilder } from "./src/vite/vite-config-builder.mjs";
import { ZViteLibraryBuilder } from "./src/vite/vite-library-builder.mjs";

const library = new ZViteLibraryBuilder()
  .entry("vite", "./src/vite/index.ts")
  .entry("typedoc", "./src/typedoc/index.ts")
  .build();

const config = new ZViteConfigBuilder().library(library).build();

export default defineConfig(config);
