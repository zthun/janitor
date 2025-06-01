import { ZVitestConfigBuilder } from "@zthun/janitor-build-config/vitest";
import { defineConfig } from "vitest/config";

const config = new ZVitestConfigBuilder(__dirname).typescript().node().build();
export default defineConfig(config);
