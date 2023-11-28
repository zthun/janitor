import chalk from 'chalk';
import { ZConfigExtender } from '../config/config-extender.mjs';
import { ZConfigReaderCosmic } from '../config/config-reader-cosmic.mjs';
import { ZConfigReaderNull } from '../config/config-reader-null.mjs';
import { ZConfigReaderPrettier } from '../config/config-reader-prettier.mjs';
import { IZConfigReader } from '../config/config-reader.mjs';
import { ZContentLinterHtml } from '../content/content-linter-html.mjs';
import { ZContentLinterJson } from '../content/content-linter-json.mjs';
import { ZContentLinterPretty } from '../content/content-linter-pretty.mjs';
import { ZContentLinterYaml } from '../content/content-linter-yaml.mjs';
import { ZLinterEs } from '../linter/linter-es.mjs';
import { ZLinterFile } from '../linter/linter-file.mjs';
import { ZLinterMarkdown } from '../linter/linter-markdown.mjs';
import { ZLinterReport } from '../linter/linter-report.mjs';
import { ZLinterSpelling } from '../linter/linter-spelling.mjs';
import { ZLinterStyle } from '../linter/linter-style.mjs';
import { IZLinter } from '../linter/linter.mjs';
import { IZLintJanitorArgs } from './lint-janitor-args.mjs';
import { IZLintJanitorOptions } from './lint-janitor-options.mjs';

/**
 * Represents the main entry point object for the application.
 */
export class ZLintJanitor {
  /**
   * The linter for js files.
   */
  public esLint: IZLinter;

  /**
   * The linter for cspell.  Useful for multiple file types.
   */
  public spellLint: IZLinter;

  /**
   * The linter for prettier formatting checks.
   */
  public prettyLint: IZLinter;

  /**
   * The linter for style files.
   */
  public styleLint: IZLinter;

  /**
   * The linter for html files.
   *
   * Currently, htmlhint has no support for cosmiconfig based paths, so we're going to
   * add them here.
   */
  public htmlHint: IZLinter;

  /**
   * The linter for json files.
   */
  public jsonLint: IZLinter;

  /**
   * The linter for yaml files.
   */
  public yamlLint: IZLinter;

  /**
   * The linter for markdown files.
   *
   * Markdownlint used to have support for cosmiconfig based paths officially, but it seems now
   * they just use .markdownlint.json.  We have to add support for that path, which is not
   * a cosmiconfig path.
   */
  public markdownLint: IZLinter;

  /**
   * The configuration reader.
   */
  public config: IZConfigReader;

  /**
   * Initializes a new instance of this object.
   *
   * @param _logger -
   *        The logger to use when formatting output.
   */
  public constructor(private readonly _logger: Console) {
    this.esLint = new ZLinterReport(new ZLinterEs(this._logger), this._logger, 'es');
    this.spellLint = new ZLinterReport(new ZLinterSpelling(this._logger), this._logger, 'various');
    this.prettyLint = new ZLinterFile(new ZContentLinterPretty(), new ZConfigReaderPrettier(), this._logger, 'pretty');
    this.styleLint = new ZLinterReport(new ZLinterStyle(this._logger), this._logger, 'style');
    this.htmlHint = new ZLinterFile(
      new ZContentLinterHtml(),
      new ZConfigReaderCosmic('htmlhint', new ZConfigExtender()),
      this._logger,
      'html'
    );
    this.jsonLint = new ZLinterFile(new ZContentLinterJson(), new ZConfigReaderNull(), this._logger, 'json');
    this.yamlLint = new ZLinterFile(new ZContentLinterYaml(), new ZConfigReaderNull(), this._logger, 'yaml');
    this.markdownLint = new ZLinterReport(
      new ZLinterMarkdown(
        this._logger,
        new ZConfigReaderCosmic('markdownlint', new ZConfigExtender(), ['.markdownlint.json'])
      ),
      this._logger,
      'markdown'
    );
    this.config = new ZConfigReaderCosmic('lint-janitor', new ZConfigExtender());
  }

  /**
   * Runs the lint given the required options.
   *
   * @param options -
   *        The lint options.
   *
   * @returns
   *        A promise that returns 0 if all linting was successful,
   *        and 1 if any of the linting failed.
   */
  public async lint(options: IZLintJanitorOptions): Promise<number> {
    let current = true;
    let result = true;

    if (options.jsonFiles) {
      this._logger.log(chalk.magenta.underline(`Linting json files from ${options.jsonFiles.length} globs.`));
      current = await this.jsonLint.lint(options.jsonFiles, null, options.jsonFilesExclude);
      result = result && current;
    }

    if (options.yamlFiles) {
      this._logger.log(chalk.magenta.underline(`Linting yaml files from ${options.yamlFiles.length} globs.`));
      current = await this.yamlLint.lint(options.yamlFiles, null, options.yamlFilesExclude);
      result = result && current;
    }

    if (options.markdownFiles) {
      this._logger.log(chalk.magenta.underline(`Linting markdown files from ${options.markdownFiles.length} globs.`));
      current = await this.markdownLint.lint(
        options.markdownFiles,
        options.markdownConfig,
        options.markdownFilesExclude
      );
      result = result && current;
    }

    if (options.esFiles) {
      this._logger.log(chalk.magenta.underline(`Linting ecmaScript files from ${options.esFiles.length} globs.`));
      current = await this.esLint.lint(options.esFiles, options.esConfig, null);
      result = result && current;
    }

    if (options.styleFiles) {
      this._logger.log(chalk.magenta.underline(`Linting style files from ${options.styleFiles.length} globs.`));
      current = await this.styleLint.lint(options.styleFiles, options.styleConfig, null);
      result = result && current;
    }

    if (options.htmlFiles) {
      this._logger.log(chalk.magenta.underline(`Linting html files from ${options.htmlFiles.length} globs.`));
      current = await this.htmlHint.lint(options.htmlFiles, options.htmlConfig, options.htmlFilesExclude);
      result = result && current;
    }

    if (options.spellingFiles) {
      this._logger.log(chalk.magenta.underline(`Checking spelling for ${options.spellingFiles.length} globs.`));
      current = await this.spellLint.lint(options.spellingFiles, options.spellingConfig, options.spellingFilesExclude);
      result = result && current;
    }

    if (options.prettyFiles) {
      this._logger.log(chalk.magenta.underline(`Checking formatting for ${options.prettyFiles.length} globs.`));
      current = await this.prettyLint.lint(options.prettyFiles, options.prettyConfig, options.prettyFilesExclude);
      result = result && current;
    }

    return result ? 0 : 1;
  }

  /**
   * Runs the application.
   *
   * @param args -
   *        The command line arguments.
   *
   * @returns
   *        A promise that returns 0 if all linting was
   *        successful, and 1 if any of the linting failed.
   */
  public async run(args: IZLintJanitorArgs): Promise<number> {
    try {
      const options = await this.config.read(args.config);
      return this.lint(options);
    } catch (err) {
      this._logger.error(err);
      return 1;
    }
  }
}
