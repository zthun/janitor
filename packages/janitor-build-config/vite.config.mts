import { defineConfig } from "vite";
import { ZViteConfigBuilder } from "./src/vite/vite-config-builder.mjs";
import { ZViteLibraryBuilder } from "./src/vite/vite-library-builder.mjs";

const library = new ZViteLibraryBuilder()
  .entry("vite", "./src/vite/index.ts")
  .build();

const config = new ZViteConfigBuilder(__dirname).library(library).build();

export default defineConfig(config);
