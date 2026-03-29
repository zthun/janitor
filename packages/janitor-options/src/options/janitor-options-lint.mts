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
   * The path to the config file for cspell.
   */
  spellingConfig?: string;

  /**
   * The file globs to lint with eslint.
   */
  esFiles?: string[];
  /**
   * The file globs to lint with json.
   */
  jsonFiles?: string[];
  /**
   * The file globs to lint with prettier.
   */
  prettyFiles?: string[];
  /**
   * The file globs to lint with cspell.
   */
  spellingFiles?: string[];
  /**
   * The file globs to lint with yaml.
   */
  yamlFiles?: string[];

  /**
   * The files globs to exclude from linting with json.
   */
  jsonFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with prettier.
   */
  prettyFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with cspell.
   */
  spellingFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with yaml.
   */
  yamlFilesExclude?: string[];
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
   * Sets the path to the config file for cspell.
   *
   * @param spellingConfig -
   *        The path to the config file for cspell.
   *
   * @returns
   *        This object.
   */
  public spellingConfig(spellingConfig: string): ZJanitorOptionsLintBuilder {
    this.lint.spellingConfig = spellingConfig;
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
    const files = this.lint.esFiles ?? [];
    this.lint.esFiles = files.concat(file);
    return this;
  }

  /**
   * Adds a list of globs to the list of files to lint with json.
   *
   * @param file -
   *        The file globs to lint with json.
   *
   * @returns
   *        This object.
   */
  public jsonFile(file: string | string[] = []) {
    const files = this.lint.jsonFiles ?? [];
    this.lint.jsonFiles = files.concat(file);
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
    const files = this.lint.prettyFiles ?? [];
    this.lint.prettyFiles = files.concat(file);
    return this;
  }

  /**
   * Adds a list of globs to the list of files to lint with cspell.
   *
   * @param file -
   *        The file globs to lint with cspell.
   *
   * @returns
   *        This object.
   */
  public spellingFile(file: string | string[] = []) {
    const files = this.lint.spellingFiles ?? [];
    this.lint.spellingFiles = files.concat(file);
    return this;
  }

  /**
   * Adds a list of globs to the list of files to lint with yaml.
   *
   * @param file -
   *        The file globs to lint with yaml.
   *
   * @returns
   *        This object.
   */
  public yamlFile(file: string | string[] = []) {
    const files = this.lint.yamlFiles ?? [];
    this.lint.yamlFiles = files.concat(file);
    return this;
  }

  /**
   * Adds a list of globs to the list of files to exclude from linting with json.
   *
   * @param file -
   *        The globs to exclude from linting with json.
   *
   * @returns
   *        This object.
   */
  public jsonExclude(file: string | string[] = []) {
    const excludes = this.lint.jsonFilesExclude ?? [];
    this.lint.jsonFilesExclude = excludes.concat(file);
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
    const excludes = this.lint.prettyFilesExclude ?? [];
    this.lint.prettyFilesExclude = excludes.concat(file);
    return this;
  }

  /**
   * Adds a list of globs to the list of files to exclude from linting with cspell.
   *
   * @param file -
   *        The globs to exclude from linting with cspell.
   *
   * @returns
   *        This object.
   */
  public spellingExclude(file: string | string[] = []) {
    const excludes = this.lint.spellingFilesExclude ?? [];
    this.lint.spellingFilesExclude = excludes.concat(file);
    return this;
  }

  /**
   * Adds a single file glob to the list of files to exclude from linting with yaml.
   *
   * @param file -
   *        The file glob to exclude from linting with yaml.
   *
   * @returns
   *        This object.
   */
  public yamlExclude(file: string | string[] = []) {
    const excludes = this.lint.yamlFilesExclude ?? [];
    this.lint.yamlFilesExclude = excludes.concat(file);
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
    return this.jsonExclude(file)
      .prettyExclude(file)
      .spellingExclude(file)
      .yamlExclude(file);
  }

  private getOtherFiles() {
    const extensions = "md";
    return [`*.{${extensions}`, `**/*.{${extensions}`];
  }

  /**
   * Generates the spelling files based on the other files that have been set.
   *
   * @returns
   *        This object.
   */
  public generateSpellingFiles() {
    return this.spellingFile(this.lint.esFiles)
      .spellingFile(this.lint.jsonFiles)
      .spellingFile(this.lint.yamlFiles)
      .spellingFile(this.getOtherFiles());
  }

  /**
   * Generates the pretty files based on the other files that have been set.
   *
   * @returns
   *        This object.
   */
  public generatePrettyFiles() {
    return this.prettyFile(this.lint.esFiles)
      .prettyFile(this.lint.jsonFiles)
      .prettyFile(this.lint.yamlFiles)
      .prettyFile(this.getOtherFiles());
  }

  /**
   * Adds conventional es files.
   *
   * @returns
   *        This object
   */
  public commonEsFiles() {
    const extensions = "js,cjs,mjs,ts,mts,jsx,tsx,css,html,htm";

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
   * Add conventional json files.
   *
   * @returns
   *        This object.
   */
  public commonJsonFiles() {
    return this.jsonFile("*.json")
      .jsonFile("src/**/*.json")
      .jsonFile("packages/**/*.json")
      .jsonFile(".config/*.json");
  }

  /**
   * Adds conventional yaml files.
   *
   * @returns
   *        This object.
   */
  public commonYamlFiles() {
    const extensions = "yml,yaml";
    return this.yamlFile(`*.{${extensions}}`)
      .yamlFile(`src/**/*.{${extensions}}`)
      .yamlFile(`packages/**/*.{${extensions}}`)
      .yamlFile(`.config/*.{${extensions}}`)
      .yamlFile(`.circleci/*.{${extensions}}`);
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
