import { cloneDeep } from "lodash-es";
import type { EntryPointStrategy, TypeDocOptions } from "typedoc";

/**
 * A builder for TypeDoc configurations.
 */
export class ZTypedocConfigBuilder {
  public static readonly OutputDist = "./dist";
  public static readonly EntryPointIndex = "./src/index.ts";

  private typedoc: TypeDocOptions = {};

  /**
   * Sets the output directory for the documentation.
   *
   * @param path -
   *        The output directory path.
   * @returns
   *        This object.
   */
  public out(path: string) {
    this.typedoc.out = path;
    return this;
  }

  /**
   * Sets the output directory to "./dist".
   *
   * @returns
   *        This object.
   */
  public dist = this.out.bind(this, ZTypedocConfigBuilder.OutputDist);

  /**
   * Adds a list of entry point glob to the existing entry points.
   *
   * @param glob -
   *        The entry point glob pattern.
   *
   * @returns
   *        This object.
   */
  public entry(glob: string | string) {
    const entry = this.typedoc.entryPoints || [];
    this.typedoc.entryPoints = entry.concat(glob);
    return this;
  }

  /**
   * Adds an entry point for './src/index.ts'.
   *
   * @returns
   *        This object.
   */
  public index = this.entry.bind(this, ZTypedocConfigBuilder.EntryPointIndex);

  /**
   * Sets the entry point strategy.
   *
   * See {@link https://typedoc.org/api/enums/EntryPointStrategy.html | EntryPointStrategy}
   * for more details.
   *
   * @param strategy -
   *        The entry point strategy to use.
   *
   * @returns
   *        This object.
   */
  public entryPointStrategy(strategy: EntryPointStrategy) {
    this.typedoc.entryPointStrategy = strategy;
    return this;
  }

  /**
   * Sets the entry point strategy to "resolve".
   *
   * @returns
   *        This object.
   */
  public resolve = this.entryPointStrategy.bind(this, "resolve");

  /**
   * Sets the entry point strategy to "packages".
   *
   * @returns
   *        This object.
   */
  public packages = this.entryPointStrategy.bind(this, "packages");

  /**
   * Sets the excludeNotDocumented flag.
   *
   * @returns
   *        This object.
   */
  public excludeNotDocumented() {
    this.typedoc.excludeNotDocumented = true;
    return this;
  }

  /**
   * Sets the categorizeByGroup flag.
   *
   * @returns
   *        This object.
   */
  public categorizeByGroup() {
    this.typedoc.categorizeByGroup = true;
    return this;
  }

  /**
   * Sets the name of the project.
   *
   * @param name -
   *        The name of the project.
   *
   * @returns
   *        This object.
   */
  public name(name: string) {
    this.typedoc.name = name;
    return this;
  }

  /**
   * Sets the favicon for the project.
   *
   * @param path -
   *        The path to the favicon file.
   *
   * @returns
   *        This object.
   */
  public favicon(path: string) {
    this.typedoc.favicon = path;
    return this;
  }

  /**
   * Adds a single exclude glob to the existing excludes.
   *
   * @param glob -
   *        The exclude glob pattern.
   *
   * @returns
   *        This object.
   */
  public exclude(glob: string | string[]) {
    const excludes = this.typedoc.exclude || [];
    this.typedoc.exclude = excludes.concat(glob);
    return this;
  }

  /**
   * Sets the typedoc configuration to be used for an individual project.
   *
   * An individual project typedoc does not output any documentation by itself,
   * but is part of a larger project that does.
   *
   * @returns
   *        This object.
   */
  public project() {
    return this.resolve().dist();
  }

  /**
   * Sets the typedoc configuration to be used a web project that outputs
   * final documentation for a monorepo of packages.
   *
   * Normally, your monorepo will have a single web or doc project that outputs
   * the typescript for every package in the monorepo.  Use this configuration
   * for that project.
   *
   * @returns
   *        This object.
   */
  public web() {
    return this.packages()
      .excludeNotDocumented()
      .categorizeByGroup()
      .dist()
      .exclude("./");
  }

  /**
   * Builds the final typedoc configuration object.
   *
   * @returns
   *        The final typedoc configuration object.
   */
  public build() {
    return cloneDeep(this.typedoc);
  }
}
