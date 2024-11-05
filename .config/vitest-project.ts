import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export function defineTest(name: string) {
  return defineConfig({
    plugins: [tsConfigPaths()],
    test: {
      name,
      testTimeout: 30000,
    },
  });
}
