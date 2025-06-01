import { cloneDeep } from "lodash-es";
import { resolve } from "node:path";
import swc from "unplugin-swc";
import { LibraryOptions, UserConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsConfigPaths from "vite-tsconfig-paths";
import { InlineConfig as TestConfig } from "vitest/node.js";
import { ZViteLibraryBuilder } from "./vite-library-builder.mjs";
import { ZViteTestBuilder } from "./vite-test-builder.mjs";

/**
 * A config builder for the vite build system.
 *
 * This is helpful when building different types
 * of projects and keeping a standard.
 */
export class ZViteConfigBuilder {
  private config: UserConfig;

  /**
   * Initializes a new instance of this object.
   *
   * @param dirname -
   *        The directory that is housing the vite.config
   *        file.  Pass __dirname to this.
   */
  public constructor(private _dirname: string) {
    this.config = {
      build: {
        minify: true,
        sourcemap: false,
      },
      plugins: [swc.vite(), tsConfigPaths()],
    };
  }

  /**
   * Sets vite into library mode.
   *
   * @param options -
   *        The options for the library.  You can set this to
   *        nothing to use the default library which looks for
   *        an entry point at the source directory called index.ts
   *
   * @see {@link ZViteLibraryBuilder} for more information.
   *
   * @returns
   *        This object.
   */
  public library(
    options: LibraryOptions = new ZViteLibraryBuilder()
      .index(this._dirname)
      .build(),
  ) {
    this.config.build.lib = options;

    // There is almost no value to minifying a library unless you
    // are bundling it for importing via html.
    // Thus, just turn off the minify and enable the source map
    // This makes it much easier for other devs to debug problems
    this.config.build.minify = false;
    this.config.build.sourcemap = true;

    // When using a library, we also want to make sure we externalize the
    // dependencies automatically -> it blows my mind why vite doesn't
    // do this out of the box.  I guess there's some reason or some
    // use case to bundle all the dependencies; I just don't see it.
    this.config.plugins = [
      ...this.config.plugins,
      externalizeDeps(),
      dtsPlugin({
        compilerOptions: {
          // Always turn off paths when building for production.  You want to make
          // sure that your build is building in the correct order and that your
          // actual paths are correct.
          paths: {},
          // We don't want to include unit test files either.
          exclude: [resolve(this._dirname, "src/**/*.{spec,test}.{mts,ts}")],
        },
      }),
    ];

    return this;
  }

  /**
   * Constructs the config to act as if it's compiling a node application.
   */
  public cli() {
    // A cli works similar to a library.  Vite isn't the best when it comes
    // to building complex node apps, but for simple cli tools and non
    // framework based servers, you can do it.
    this.config.build.target = "NodeNext";
    this.config.build.outDir = "dist";
    this.config.build.minify = false;
    this.config.build.lib = {
      entry: "src/main.ts",
      formats: ["es"],
      fileName: "main",
    };

    this.config.plugins = [...this.config.plugins, externalizeDeps({})];

    return this;
  }

  /**
   * Constructs the config to be for testing.
   */
  public test(
    options: TestConfig = new ZViteTestBuilder().node().istanbul().build(),
  ) {
    this.config.test = options;
    return this;
  }

  /**
   * Returns the currently built config.
   *
   * @returns
   *        The currently built config.
   */
  public build() {
    return cloneDeep(this.config);
  }
}
