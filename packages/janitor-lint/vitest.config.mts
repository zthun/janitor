import { defineConfig } from "vitest/config";
import { ZViteConfigBuilder } from "../janitor-build-config/src/vite/vite-config-builder.mjs";

const config = new ZViteConfigBuilder().test().build();
export default defineConfig(config);
