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
   * @param files -
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
      .yamlExclude(file);
  }

  /**
   * Generates the spelling files based on the other files that have been set.
   *
   * @returns
   *        This object.
   */
  public generateSpellingFiles() {
    return this.spellingFile(this.lint.esFiles).spellingFile(
      this.lint.htmlFiles,
    );
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
