import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export function defineLibrary(dir: string) {
  return defineConfig({
    build: {
      lib: {
        entry: `${dir}/src/index.ts`,
        formats: ["es", "cjs"],
        fileName: "index",
      },
      minify: false,
      sourcemap: true,
    },
    plugins: [
      externalizeDeps(),
      dts({ tsconfigPath: `${dir}/tsconfig.prod.json` }),
    ],
  });
}
