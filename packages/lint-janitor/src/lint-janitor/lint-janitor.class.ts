import chalk from 'chalk';
import { ZConfigExtender } from '../config/config-extender.class';
import { ZConfigReaderCosmic } from '../config/config-reader-cosmic.class';
import { ZConfigReaderNull } from '../config/config-reader-null.class';
import { ZConfigReaderPrettier } from '../config/config-reader-prettier.class';
import { IZConfigReader } from '../config/config-reader.interface';
import { ZContentLinterHtml } from '../content/content-linter-html.class';
import { ZContentLinterJson } from '../content/content-linter-json.class';
import { ZFileLint } from '../file-lint/file-lint.class';
import { ZFileReportLint } from '../file-lint/file-report-lint.class';
import { ZLinterEs } from '../linter/linter-es.class';
import { IZLinter } from '../linter/linter.interface';
import { ZMarkdownLint } from '../markdown-lint/markdown-lint.class';
import { ZPrettyLint } from '../pretty-lint/pretty-lint';
import { ZSpellLint } from '../spell-lint/spell-lint.class';
import { ZStyleLint } from '../style-lint/style-lint.class';
import { ZYamlLint } from '../yaml-lint/yaml-lint.class';
import { IZLintJanitorArgs } from './lint-janitor-args.interface';
import { IZLintJanitorOptions } from './lint-janitor-options.interface';

/**
 * Represents the main entry point object for the application.
 */
export class ZLintJanitor {
  /**
   * The linter for js files.
   */
  public esLint: IZLinter = new ZFileReportLint(new ZLinterEs(this._logger), this._logger, 'es');

  /**
   * The linter for cspell.  Useful for multiple file types.
   */
  public spellLint: IZLinter = new ZFileReportLint(new ZSpellLint(this._logger), this._logger, 'various');

  /**
   * The linter for prettier formatting checks.
   */
  public prettyLint: IZLinter = new ZFileLint(new ZPrettyLint(), new ZConfigReaderPrettier(), this._logger, 'pretty');

  /**
   * The linter for style files.
   */
  public styleLint: IZLinter = new ZFileReportLint(new ZStyleLint(this._logger), this._logger, 'style');

  /**
   * The linter for html files.
   */
  public htmlHint: IZLinter = new ZFileLint(new ZContentLinterHtml(), new ZConfigReaderCosmic('htmlhint', new ZConfigExtender()), this._logger, 'html');

  /**
   * The linter for json files.
   */
  public jsonLint: IZLinter = new ZFileLint(new ZContentLinterJson(), new ZConfigReaderNull(), this._logger, 'json');

  /**
   * The linter for yaml files.
   */
  public yamlLint: IZLinter = new ZFileLint(new ZYamlLint(), new ZConfigReaderNull(), this._logger, 'yaml');

  /**
   * The linter for markdown files.
   */
  public markdownLint: IZLinter = new ZFileReportLint(new ZMarkdownLint(this._logger, new ZConfigReaderCosmic('markdownlint', new ZConfigExtender())), this._logger, 'markdown');

  /**
   * The configuration reader.
   */
  public config: IZConfigReader = new ZConfigReaderCosmic('lint-janitor', new ZConfigExtender());

  /**
   * Initializes a new instance of this object.
   *
   * @param _logger The logger to use when formatting output.
   */
  public constructor(private readonly _logger: Console) {}

  /**
   * Runs the lint given the required options.
   *
   * @param options The lint options.
   *
   * @returns A promise that returns 0 if all linting was successful, and 1 if any of the linting failed.
   */
  public async lint(options: IZLintJanitorOptions): Promise<number> {
    let current = true;
    let result = true;

    if (options.jsonFiles) {
      this._logger.log(chalk.magenta.underline(`Linting json files from ${options.jsonFiles.length} globs.`));
      current = await this.jsonLint.lint(options.jsonFiles);
      result = result && current;
    }

    if (options.yamlFiles) {
      this._logger.log(chalk.magenta.underline(`Linting yaml files from ${options.yamlFiles.length} globs.`));
      current = await this.yamlLint.lint(options.yamlFiles);
      result = result && current;
    }

    if (options.markdownFiles) {
      this._logger.log(chalk.magenta.underline(`Linting markdown files from ${options.markdownFiles.length} globs.`));
      current = await this.markdownLint.lint(options.markdownFiles, options.markdownConfig || null);
      result = result && current;
    }

    if (options.esFiles) {
      this._logger.log(chalk.magenta.underline(`Linting ecmaScript files from ${options.esFiles.length} globs.`));
      current = await this.esLint.lint(options.esFiles, options.esConfig || null);
      result = result && current;
    }

    if (options.styleFiles) {
      this._logger.log(chalk.magenta.underline(`Linting style files from ${options.styleFiles.length} globs.`));
      current = await this.styleLint.lint(options.styleFiles, options.styleConfig || null);
      result = result && current;
    }

    if (options.htmlFiles) {
      this._logger.log(chalk.magenta.underline(`Linting html files from ${options.htmlFiles.length} globs.`));
      current = await this.htmlHint.lint(options.htmlFiles, options.htmlConfig || null);
      result = result && current;
    }

    if (options.spellingFiles) {
      this._logger.log(chalk.magenta.underline(`Checking spelling for ${options.spellingFiles.length} globs.`));
      current = await this.spellLint.lint(options.spellingFiles, options.spellingConfig || null);
      result = result && current;
    }

    if (options.prettyFiles) {
      this._logger.log(chalk.magenta.underline(`Checking formatting for ${options.prettyFiles.length} globs.`));
      current = await this.prettyLint.lint(options.prettyFiles, options.prettyConfig || null);
      result = result && current;
    }

    return result ? 0 : 1;
  }

  /**
   * Runs the application.
   *
   * @param args The command line arguments.
   *
   * @returns A promise that returns 0 if all linting was successful, and 1 if any of the linting failed.
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
