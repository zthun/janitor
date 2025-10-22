import { defineConfig } from "vite";
import { ZViteConfigBuilder } from "./src/vite/vite-config-builder.mjs";
import { ZViteLibraryBuilder } from "./src/vite/vite-library-builder.mjs";
import { ZViteTestBuilder } from "./src/vite/vite-test-builder.mjs";

const library = new ZViteLibraryBuilder()
  .entry("vite", "./src/vite/index.mts")
  .entry("typedoc", "./src/typedoc/index.mts")
  .build();

const test = new ZViteTestBuilder().node().build();

const config = new ZViteConfigBuilder().library(library).test(test).build();

export default defineConfig(config);
