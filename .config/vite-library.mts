import { createRequire } from "node:module";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import external from "vite-plugin-external";

export function defineLibrary(dir: string) {
  const $require = createRequire(import.meta.url);
  const pkg = $require(resolve(dir, "package.json"));

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
      external({
        nodeBuiltins: true,
        externalizeDeps: [
          ...Object.keys(pkg.dependencies || {}),
          ...Object.keys(pkg.devDependencies || {}),
        ],
      }),
      dts({ tsconfigPath: `${dir}/tsconfig.prod.json` }),
    ],
  });
}
