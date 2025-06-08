import { castArray, cloneDeep } from "lodash-es";
import swc from "unplugin-swc";
import type {
  LibraryOptions,
  PluginOption,
  ServerOptions,
  UserConfig,
} from "vite";
import { checker } from "vite-plugin-checker";
import dtsPlugin from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsConfigPaths from "vite-tsconfig-paths";
import type { InlineConfig as TestConfig } from "vitest/node.js";
import { ZViteLibraryBuilder } from "./vite-library-builder.mjs";
import { ZViteTestBuilder } from "./vite-test-builder.mjs";

/**
 * A config builder for the vite build system.
 *
 * This is helpful when building different types
 * of projects and keeping a standard.
 *
 * @example vite.config.ts
 *
 * ```ts
 * // Before Config Builder
 * export default defineConfig({
 *  build: {
 *     lib: {
 *       entry: {
 *         index: "./src/index.ts",
 *       },
 *       formats: ["cjs", "es"],
 *     },
 *   },
 *   minify: false,
 *   sourceMap: true,
 *   plugins: [
 *     swc.vite(),
 *     tsConfigPaths(),
 *     externalizeDeps(),
 *     dtsPlugin({
 *       compilerOptions: {
 *         paths: {},
 *       },
 *     }),
 *   ],
 * });
 * ```
 *
 * ```ts
 * // After config builder
 * const config = new ZViteConfigBuilder().library().build();
 * export default defineConfig(config);
 * ```
 */
export class ZViteConfigBuilder {
  private config: UserConfig;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this.config = {
      build: {
        minify: true,
        sourcemap: false,
      },
      plugins: [swc.vite(), tsConfigPaths()],
    };
  }

  /**
   * Sets whether to minify the build output.
   *
   * @param minify -
   *        The flag as to minify the output.
   *
   * @returns
   *        This object.
   */
  public minify(minify = true) {
    this.config.build = { ...this.config.build, minify };
    return this;
  }

  /**
   * Adds a list of plugins.
   *
   * @param option -
   *        The plugins to add.
   *
   * @returns
   *        This object.
   */
  public plugin(option: PluginOption | PluginOption[] = []) {
    // See constructor - the config plugins are guaranteed to
    // be set.  The swc and paths plugins are automatically added.
    const plugins = this.config.plugins!;
    this.config.plugins = plugins.concat(castArray(option));
    return this;
  }

  /**
   * Sets whether to generate source maps.
   *
   * @param sourcemap -
   *        True to generate a sourcemap, false for faster build.
   *
   * @returns
   *        This object.
   */
  public sourceMap(sourcemap = true) {
    this.config.build = { ...this.config.build, sourcemap };
    return this;
  }

  /**
   * Assigns the server options.
   *
   * @param options -
   *        The server options to assign.
   *
   * @returns
   *        This object.
   */
  public server(options: ServerOptions) {
    this.config.server = cloneDeep(options);
    return this;
  }

  /**
   * Sets vite into library mode.
   *
   * @param lib -
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
    lib: LibraryOptions = new ZViteLibraryBuilder().index().build(),
  ) {
    this.config.build = { ...this.config.build, lib };

    const dts = dtsPlugin({
      compilerOptions: {
        // Always turn off paths when building for production.  You want to make
        // sure that your build is building in the correct order and that your
        // actual paths are correct.
        paths: {},
      },
    });
    const external = externalizeDeps();

    return this.minify(false).sourceMap().plugin(external).plugin(dts);
  }

  /**
   * Constructs the config to act as if it's compiling a node application.
   *
   * This is just an alias to {@link ZViteConfigBuilder.library} with two
   * entry points.
   *
   * 1. The file src/cli.ts is the main entry point of the application.
   * 1. The file, src/index.ts, is the api for importing
   *
   * @returns
   *        This object.
   */
  public cli() {
    // A cli works similar to a library.
    const library = new ZViteLibraryBuilder()
      .entry("index", "src/index.ts")
      .entry("cli", "src/cli.ts")
      .build();
    return this.library(library);
  }

  /**
   * Constructs the config to act as if it's compiling a nest application.
   *
   * This is just an alias to {@link ZViteConfigBuilder.library} with a single
   * entry point.
   *
   * 1. The file, src/main.mts
   *
   * @returns
   *        This object.
   */
  public nest() {
    const library = new ZViteLibraryBuilder()
      .entry("main", "src/main.mts")
      .build();
    return this.library(library);
  }

  /**
   * Constructs the config to act as if it's compiling a web application.
   *
   * @returns
   *        This object.
   */
  public web() {
    return this.minify()
      .sourceMap(false)
      .plugin(checker({ typescript: true }));
  }

  /**
   * An alias to {@link web}
   *
   * @returns
   *        This object.
   */
  public react = this.web;

  /**
   * Constructs the config to be for testing.
   *
   * @param options -
   *        The test config to use.  If this is falsy,
   *        then a test setup using a monorepo with an
   *        istanbul provider in node is used.
   */
  public test(
    options: TestConfig = new ZViteTestBuilder()
      .node()
      .istanbul()
      .monorepo()
      .build(),
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
