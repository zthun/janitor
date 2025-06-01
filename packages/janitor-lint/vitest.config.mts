import { defineConfig } from "vitest/config";
import { ZViteConfigBuilder } from "../janitor-build-config/src/vite/vite-config-builder.mjs";

const config = new ZViteConfigBuilder(__dirname).test().build();
export default defineConfig(config);
