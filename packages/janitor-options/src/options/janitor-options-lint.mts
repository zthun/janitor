/**
 * Represents options for linting in the zthunworks janitor system.
 */
export interface IZJanitorOptionsLint {
  /**
   * The path to the config file for eslint.
   */
  esConfig?: string;
  /**
   * The path to the config file for htmlhint.
   */
  htmlConfig?: string;
  /**
   * The path to the config file for markdownlint.
   */
  markdownConfig?: string;
  /**
   * The path to the config file for prettier.
   */
  prettyConfig?: string;
  /**
   * The path to the config file for cspell.
   */
  spellingConfig?: string;
  /**
   * The path to the config file for stylelint.
   */
  styleConfig?: string;

  /**
   * The file globs to lint with eslint.
   */
  esFiles?: string[];
  /**
   * The file globs to lint with htmlhint.
   */
  htmlFiles?: string[];
  /**
   * The file globs to lint with json.
   */
  jsonFiles?: string[];
  /**
   * The file globs to lint with markdownlint.
   */
  markdownFiles?: string[];
  /**
   * The file globs to lint with prettier.
   */
  prettyFiles?: string[];
  /**
   * The file globs to lint with cspell.
   */
  spellingFiles?: string[];
  /**
   * The file globs to lint with stylelint.
   */
  styleFiles?: string[];
  /**
   * The file globs to lint with yaml.
   */
  yamlFiles?: string[];

  /**
   * The files globs to exclude from linting with htmlhint.
   */
  htmlFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with json.
   */
  jsonFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with markdownlint.
   */
  markdownFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with prettier.
   */
  prettyFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with cspell.
   */
  spellingFilesExclude?: string[];
  /**
   * The files to exclude from linting with stylelint.
   */
  styleFilesExclude?: string[];
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
   * Sets the path to the config file for htmlhint.
   *
   * @param htmlConfig -
   *        The path to the config file for htmlhint.
   *
   * @returns
   *        This object.
   */
  public htmlConfig(htmlConfig: string): ZJanitorOptionsLintBuilder {
    this.lint.htmlConfig = htmlConfig;
    return this;
  }

  /**
   * Sets the path to the config file for markdownlint.
   *
   * @param markdownConfig -
   *        The path to the config file for markdownlint.
   *
   * @returns
   *        This object.
   */
  public markdownConfig(markdownConfig: string): ZJanitorOptionsLintBuilder {
    this.lint.markdownConfig = markdownConfig;
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
   * Sets the path to the config file for stylelint.
   *
   * @param styleConfig -
   *        The path to the config file for stylelint.
   *
   * @returns
   *        This object.
   */
  public styleConfig(styleConfig: string): ZJanitorOptionsLintBuilder {
    this.lint.styleConfig = styleConfig;
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
   * Adds a list of globs to the list of files to lint with htmlhint.
   *
   * @param file -
   *        The file globs to lint with htmlhint.
   *
   * @returns
   *        This object.
   */
  public htmlFile(file: string | string[] = []) {
    const files = this.lint.htmlFiles ?? [];
    this.lint.htmlFiles = files.concat(file);
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
   * Adds a list of globs to the list of files to lint with markdownlint.
   *
   * @param file -
   *        The globs to lint with markdownlint.
   *
   * @returns
   *        This object.
   */
  public markdownFile(file: string | string[] = []) {
    const files = this.lint.markdownFiles ?? [];
    this.lint.markdownFiles = files.concat(file);
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
   * Adds a list of globs to the list of files to lint with stylelint.
   *
   * @param file -
   *        The file globs to lint with stylelint.
   *
   * @returns
   *        This object.
   */
  public styleFile(file: string | string[] = []) {
    const files = this.lint.styleFiles ?? [];
    this.lint.styleFiles = files.concat(file);
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
   * Adds a list of globs to the list of files to exclude from linting with htmlhint.
   *
   * @param files -
   *        The file globs to exclude from linting with htmlhint.
   *
   * @returns
   *        This object.
   */
  public htmlExclude(files: string | string[] = []) {
    const excludes = this.lint.htmlFilesExclude ?? [];
    this.lint.htmlFilesExclude = excludes.concat(files);
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
   * Adds a list of globs to the list of files to exclude from linting with markdownlint.
   *
   * @param file -
   *        The globs to exclude from linting with markdownlint.
   *
   * @returns
   *        This object.
   */
  public markdownExclude(file: string | string[] = []) {
    const excludes = this.lint.markdownFilesExclude ?? [];
    this.lint.markdownFilesExclude = excludes.concat(file);
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
   * Adds a list of globs to the list of files to exclude from linting with stylelint.
   *
   * @param file -
   *        The globs to exclude from linting with stylelint.
   *
   * @returns
   *        This object.
   */
  public styleExclude(file: string | string[] = []) {
    const excludes = this.lint.styleFilesExclude ?? [];
    this.lint.styleFilesExclude = excludes.concat(file);
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
    return this.htmlExclude(file)
      .jsonExclude(file)
      .markdownExclude(file)
      .prettyExclude(file)
      .spellingExclude(file)
      .styleExclude(file)
      .yamlExclude(file);
  }

  /**
   * Generates the spelling files based on the other files that have been set.
   *
   * @returns
   *        This object.
   */
  public generateSpellingFiles() {
    return this.spellingFile(this.lint.esFiles)
      .spellingFile(this.lint.htmlFiles)
      .spellingFile(this.lint.jsonFiles)
      .spellingFile(this.lint.markdownFiles)
      .spellingFile(this.lint.styleFiles)
      .spellingFile(this.lint.yamlFiles);
  }

  /**
   * Generates the pretty files based on the other files that have been set.
   *
   * @returns
   *        This object.
   */
  public generatePrettyFiles() {
    return this.prettyFile(this.lint.esFiles)
      .prettyFile(this.lint.htmlFiles)
      .prettyFile(this.lint.jsonFiles)
      .prettyFile(this.lint.markdownFiles)
      .prettyFile(this.lint.styleFiles)
      .prettyFile(this.lint.yamlFiles);
  }

  /**
   * Adds conventional es files.
   *
   * @returns
   *        This object
   */
  public commonEsFiles() {
    const extensions = "js,cjs,mjs,ts,mts,jsx,tsx";

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
   * Adds conventional css files.
   *
   * @returns
   *        This object.
   */
  public commonCssFiles() {
    return this.styleFile(`src/**/*.css`)
      .styleFile(`packages/**/*.css`)
      .styleFile("styles/**/*.css");
  }

  /**
   * Adds conventional sass files.
   *
   * @returns
   *        This object.
   */
  public commonSassFiles() {
    return this.styleFile(`src/**/*.{sass,scss}`)
      .styleFile(`packages/**/src/**/*.{sass,scss}`)
      .styleFile("styles/**/*.{sass,scss}");
  }

  /**
   * Adds conventional less files.
   *
   * @returns
   *        This object.
   */
  public commonLessFiles() {
    return this.styleFile(`src/**/*.less`)
      .styleFile("packages/**/src/**/*.less")
      .styleFile("styles/**/*.less");
  }

  /**
   * Adds conventional less files.
   *
   * @returns
   *        This object.
   */
  public commonHtmlFiles() {
    const extensions = "html,htm";
    return this.htmlFile(`src/**/*.{${extensions}}`)
      .htmlFile(`packages/**/src/**/*.{${extensions}}`)
      .htmlFile(`src/*.{${extensions}}`)
      .htmlFile(`packages/*/*.{${extensions}}`);
  }

  /**
   * Adds conventional markdown files.
   *
   * @returns
   *        This object.
   */
  public commonMarkdownFiles() {
    return this.markdownFile(`*.md`)
      .markdownFile(`src/**/*.md`)
      .markdownFile(`packages/**/*.md`);
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
