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
   * Sets all file globs to lint with eslint.
   *
   * @param files -
   *        The file globs to lint with eslint.
   *
   * @returns
   *        This object.
   */
  public esFiles(files: string[]) {
    this.lint.esFiles = files;
    return this;
  }

  /**
   * Adds a single file to the list of files to lint with eslint.
   *
   * @param file -
   *        The file to lint with eslint.
   *
   * @returns
   *        This object.
   */
  public esFile(file: string) {
    const files = this.lint.esFiles ?? [];
    return this.esFiles(files.concat(file));
  }

  /**
   * Sets all file globs to lint with htmlhint.
   *
   * @param files -
   *        The file globs to lint with htmlhint.
   *
   * @returns
   *        This object.
   */
  public htmlFiles(files: string[]) {
    this.lint.htmlFiles = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to lint with htmlhint.
   *
   * @param file -
   *        The file glob to lint with htmlhint.
   *
   * @returns
   *        This object.
   */
  public htmlFile(file: string) {
    const files = this.lint.htmlFiles ?? [];
    return this.htmlFiles(files.concat(file));
  }

  /**
   * Sets all file globs to lint with json.
   *
   * @param files -
   *        The file globs to lint with json.
   *
   * @returns
   *        This object.
   */
  public jsonFiles(files: string[]) {
    this.lint.jsonFiles = files;
    return this;
  }

  /**
   * Adds a single file to the list of files to lint with json.
   *
   * @param file -
   *        The file to lint with json.
   *
   * @returns
   *        This object.
   */
  public jsonFile(file: string) {
    const files = this.lint.jsonFiles ?? [];
    return this.jsonFiles(files.concat(file));
  }

  /**
   * Sets all file globs to lint with markdownlint.
   *
   * @param files -
   *        The file globs to lint with markdownlint.
   *
   * @returns
   *        This object.
   */
  public markdownFiles(files: string[]) {
    this.lint.markdownFiles = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to lint with markdownlint.
   *
   * @param file -
   *        The file glob to lint with markdownlint.
   *
   * @returns
   *        This object.
   */
  public markdownFile(file: string) {
    const files = this.lint.markdownFiles ?? [];
    return this.markdownFiles(files.concat(file));
  }

  /**
   * Sets all file globs to lint with prettier.
   *
   * @param files -
   *        The file globs to lint with prettier.
   *
   * @returns
   *        This object.
   */
  public prettyFiles(files: string[]) {
    this.lint.prettyFiles = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to lint with prettier.
   *
   * @param file -
   *        The file glob to lint with prettier.
   *
   * @returns
   *        This object.
   */
  public prettyFile(file: string) {
    const files = this.lint.prettyFiles ?? [];
    return this.prettyFiles(files.concat(file));
  }

  /**
   * Sets all file globs to lint with cspell.
   *
   * @param files -
   *        The file globs to lint with cspell.
   *
   * @returns
   *        This object.
   */
  public spellingFiles(files: string[]) {
    this.lint.spellingFiles = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to lint with cspell.
   *
   * @param file -
   *        The file glob to lint with cspell.
   *
   * @returns
   *        This object.
   */
  public spellingFile(file: string) {
    const files = this.lint.spellingFiles ?? [];
    return this.spellingFiles(files.concat(file));
  }

  /**
   * Sets the files to lint with stylelint.
   *
   * @param files -
   *        The files to lint with stylelint.
   *
   * @returns
   *        This object.
   */
  public styleFiles(files: string[]) {
    this.lint.styleFiles = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to lint with stylelint.
   *
   * @param file -
   *        The file glob to lint with stylelint.
   *
   * @returns
   *        This object.
   */
  public styleFile(file: string) {
    const files = this.lint.styleFiles ?? [];
    return this.styleFiles(files.concat(file));
  }

  /**
   * Sets the files to lint with yaml.
   *
   * @param files -
   *        The files to lint with yaml.
   *
   * @returns
   *        This object.
   */
  public yamlFiles(files: string[]) {
    this.lint.yamlFiles = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to lint with yaml.
   *
   * @param file -
   *        The file glob to lint with yaml.
   *
   * @returns
   *        This object.
   */
  public yamlFile(file: string) {
    const files = this.lint.yamlFiles ?? [];
    return this.yamlFiles(files.concat(file));
  }

  /**
   * Sets the files to exclude from linting with htmlhint.
   *
   * @param files -
   *        The files to exclude from linting with htmlhint.
   *
   * @returns
   *        This object.
   */
  public htmlFilesExclude(files: string[]) {
    this.lint.htmlFilesExclude = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to exclude from linting with htmlhint.
   *
   * @param files -
   *        The file glob to exclude from linting with htmlhint.
   *
   * @returns
   *        This object.
   */
  public htmlExclude(files: string) {
    const excludes = this.lint.htmlFilesExclude ?? [];
    return this.htmlFilesExclude(excludes.concat(files));
  }

  /**
   * Sets the files to exclude from linting with json.
   *
   * @param files -
   *        The files to exclude from linting with json.
   *
   * @returns
   *        This object.
   */
  public jsonFilesExclude(files: string[]) {
    this.lint.jsonFilesExclude = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to exclude from linting with json.
   *
   * @param file -
   *        The file glob to exclude from linting with json.
   *
   * @returns
   *        This object.
   */
  public jsonExclude(file: string) {
    const excludes = this.lint.jsonFilesExclude ?? [];
    return this.jsonFilesExclude(excludes.concat(file));
  }

  /**
   * Sets the files to exclude from linting with markdownlint.
   *
   * @param files -
   *        The files to exclude from linting with markdownlint.
   *
   * @returns
   *        This object.
   */
  public markdownFilesExclude(files: string[]) {
    this.lint.markdownFilesExclude = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to exclude from linting with markdownlint.
   *
   * @param file -
   *        The file glob to exclude from linting with markdownlint.
   *
   * @returns
   *        This object.
   */
  public markdownExclude(file: string) {
    const excludes = this.lint.markdownFilesExclude ?? [];
    return this.markdownFilesExclude(excludes.concat(file));
  }

  /**
   * Sets the files to exclude from linting with prettier.
   *
   * @param files -
   *        The files to exclude from linting with prettier.
   *
   * @returns
   *        This object.
   */
  public prettyFilesExclude(files: string[]) {
    this.lint.prettyFilesExclude = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to exclude from linting with prettier.
   *
   * @param file -
   *        The file glob to exclude from linting with prettier.
   *
   * @returns
   *        This object.
   */
  public prettyExclude(file: string) {
    const excludes = this.lint.prettyFilesExclude ?? [];
    return this.prettyFilesExclude(excludes.concat(file));
  }

  /**
   * Sets the files to exclude from linting with cspell.
   *
   * @param files -
   *        The files to exclude from linting with cspell.
   *
   * @returns
   *        This object.
   */
  public spellingFilesExclude(files: string[]) {
    this.lint.spellingFilesExclude = files;
    return this;
  }

  /**
   * Adds a single file glob to the list of files to exclude from linting with cspell.
   *
   * @param file -
   *        The file glob to exclude from linting with cspell.
   *
   * @returns
   *        This object.
   */
  public spellingExclude(file: string) {
    const excludes = this.lint.spellingFilesExclude ?? [];
    return this.spellingFilesExclude(excludes.concat(file));
  }

  /**
   * Sets the files to exclude from linting with yaml.
   *
   * @param files -
   *        The files to exclude from linting with yaml.
   *
   * @returns
   *        This object.
   */
  public yamlFilesExclude(files: string[]) {
    this.lint.yamlFilesExclude = files;
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
  public yamlExclude(file: string) {
    const excludes = this.lint.yamlFilesExclude ?? [];
    return this.yamlFilesExclude(excludes.concat(file));
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
  public excludeAll(file: string) {
    return this.htmlExclude(file)
      .jsonExclude(file)
      .markdownExclude(file)
      .prettyExclude(file)
      .spellingExclude(file)
      .yamlExclude(file);
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
