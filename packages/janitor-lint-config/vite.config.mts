import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  build: {
    lib: {
      entry: {
        eslint: "./src/es/eslint.mts",
        htmlhint: "./src/html/htmlhint.mts",
        markdownlint: "./src/markdown/markdownlint.mts",
        prettier: "./src/pretty/prettier.mts",
        stylelint: "./src/style/stylelint.mts",
        "stylelint-less": "./src/style/stylelint-less.mts",
        "stylelint-sass": "./src/style/stylelint-sass.mts",
        index: "./src/index.ts",
      },
      formats: ["es", "cjs"],
    },
    minify: false,
    sourcemap: true,
  },
  plugins: [externalizeDeps(), dts({ tsconfigPath: `./tsconfig.prod.json` })],
});
