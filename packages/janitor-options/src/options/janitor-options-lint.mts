/**
 * Represents options for linting in the zthunworks janitor system.
 */
export interface IZJanitorOptionsLint {
  /**
   * The path to the config file for eslint.
   */
  esConfig?: string;
  /**
   * The path to the config file for prettier.
   */
  prettyConfig?: string;

  /**
   * The file globs to lint with eslint.
   */
  esFiles?: string[];
  /**
   * The file globs to lint with prettier.
   */
  prettyFiles?: string[];

  /**
   * The files globs to exclude from linting with prettier.
   */
  prettyFilesExclude?: string[];
}

/**
 * A builder for creating linting options for the zthunworks janitor system.
 */
export class ZJanitorOptionsLintBuilder {
  private lint: IZJanitorOptionsLint = {};

  /**
   * Sets the path to the config file for eslint.
   *
   * @param esConfig -
   *        The path to the config file for eslint.
   *
   * @returns
   *        This object.
   */
  public esConfig(esConfig: string): ZJanitorOptionsLintBuilder {
    this.lint.esConfig = esConfig;
    return this;
  }

  /**
   * Sets the path to the config file for prettier.
   *
   * @param prettyConfig -
   *        The path to the config file for prettier.
   *
   * @returns
   *        This object.
   */
  public prettyConfig(prettyConfig: string): ZJanitorOptionsLintBuilder {
    this.lint.prettyConfig = prettyConfig;
    return this;
  }

  /**
   * Adds a list of globs to the list of files to lint with eslint.
   *
   * @param file -
   *        The file globs to lint with eslint.
   *
   * @returns
   *        This object.
   */
  public esFile(file: string | string[] = []) {
    const files = this.lint.esFiles || [];
    this.lint.esFiles = files.concat(file);
    return this;
  }

  /**
   * Adds a list of globs to the list of files to lint with prettier.
   *
   * @param file -
   *        The globs to lint with prettier.
   *
   * @returns
   *        This object.
   */
  public prettyFile(file: string | string[] = []) {
    const files = this.lint.prettyFiles || [];
    this.lint.prettyFiles = files.concat(file);
    return this;
  }

  /**
   * Adds a list of globs to the list of files to exclude from linting with prettier.
   *
   * @param file -
   *        The globs to exclude from linting with prettier.
   *
   * @returns
   *        This object.
   */
  public prettyExclude(file: string | string[] = []) {
    const excludes = this.lint.prettyFilesExclude || [];
    this.lint.prettyFilesExclude = excludes.concat(file);
    return this;
  }

  /**
   * Adds a file to all exclusion lists.
   *
   * @param file -
   *        The file to exclude from all linting.
   *
   * @returns
   *        This object.
   */
  public excludeAll(file: string | string[] = []) {
    return this.prettyExclude(file);
  }

  /**
   * Generates the pretty files based on the other files that have been set.
   *
   * @returns
   *        This object.
   */
  public generatePrettyFiles() {
    return this.prettyFile(this.lint.esFiles);
  }

  /**
   * Adds conventional es files.
   *
   * @returns
   *        This object
   */
  public commonEsFiles() {
    const extensions =
      "js,cjs,mjs,ts,mts,jsx,tsx,css,html,htm,md,json,jsonc,yml,yaml";

    return this.esFile(`*.{${extensions}}`)
      .esFile(`src/**/*.{${extensions}}`)
      .esFile(`features/**/*.{${extensions}}`)
      .esFile(`packages/**/src/**/*.{${extensions}}`)
      .esFile(`packages/**/features/**/*.{${extensions}}`)
      .esFile(`packages/*/vite.config.{${extensions}}`)
      .esFile(`packages/*/vitest.config.{${extensions}}`)
      .esFile(`.config/*.{${extensions}}`);
  }

  /**
   * Adds conventional exclude files.
   *
   * @returns
   *        This object.
   */
  public commonExcludes() {
    return this.excludeAll("**/CHANGELOG.md")
      .excludeAll("**/dist/**")
      .excludeAll("**/node_modules/**")
      .excludeAll("package-lock.json")
      .excludeAll("yarn.lock")
      .excludeAll("lerna.json")
      .excludeAll("**/cspell.json");
  }

  /**
   * Returns the built linting options object.
   *
   * @returns
   *        A clone of the current linting options object.
   */
  public build() {
    return structuredClone(this.lint);
  }
}
