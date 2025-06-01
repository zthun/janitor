import { defineConfig } from "vitest/config";
// Since this is local, the vitest vscode extension won't work properly with a node_modules path, even
// if paths is available.  So for this special case, we need the relative path.
import { ZVitestConfigBuilder } from "./packages/janitor-build-config/src/vitest/vitest-config-builder.mjs";

const config = new ZVitestConfigBuilder(__dirname).coverage("istanbul").build();
export default defineConfig(config);
