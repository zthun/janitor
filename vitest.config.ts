import { defineConfig } from "vite";
// Since this is local, the vitest vscode extension won't work properly with a node_modules path, even
// if paths is available.  So for this special case, we need the relative path.
import { ZViteConfigBuilder } from "./packages/janitor-build-config/src/vite/vite-config-builder.mjs";

const config = new ZViteConfigBuilder().test().build();
export default defineConfig(config);
