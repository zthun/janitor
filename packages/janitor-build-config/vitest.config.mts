import { defineConfig } from "vitest/config";
import { ZVitestConfigBuilder } from "./src/vitest/vitest-config-builder.mjs";

const config = new ZVitestConfigBuilder(__dirname).typescript().node().build();
export default defineConfig(config);
