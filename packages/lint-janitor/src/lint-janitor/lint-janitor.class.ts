import chalk from 'chalk';
import { ZFileReportLint } from '../file-lint/file-report-lint.class';
import { ZConfigCosmicReader } from '../common/config-cosmic-reader.class';
import { ZConfigExtender } from '../common/config-extender.class';
import { ZConfigNullReader } from '../common/config-null-reader.class';
import { IZConfigReader } from '../common/config-reader.interface';
import { IZLinter } from '../common/linter.interface';
import { ZEsLint } from '../es-lint/es-lint.class';
import { ZFileLint } from '../file-lint/file-lint.class';
import { ZHtmlHint } from '../html-hint/html-hint.class';
import { ZJsonLint } from '../json-lint/json-lint.class';
import { ZMarkdownLint } from '../markdown-lint/markdown-lint.class';
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
  public esLint: IZLinter = new ZFileReportLint(new ZEsLint(this.logger), this.logger, 'ecmaScript');

  /**
   * The linter for style files.
   */
  public styleLint: IZLinter = new ZFileReportLint(new ZStyleLint(this.logger), this.logger, 'style');

  /**
   * The linter for html files.
   */
  public htmlHint: IZLinter = new ZFileLint(new ZHtmlHint(), new ZConfigCosmicReader('htmlhint', new ZConfigExtender()), this.logger, 'html');

  /**
   * The linter for json files.
   */
  public jsonLint: IZLinter = new ZFileLint(new ZJsonLint(), new ZConfigNullReader(), this.logger, 'json');

  /**
   * The linter for yaml files.
   */
  public yamlLint: IZLinter = new ZFileLint(new ZYamlLint(), new ZConfigNullReader(), this.logger, 'yaml');

  /**
   * The linter for markdown files.
   */
  public markdownLint: IZLinter = new ZFileReportLint(new ZMarkdownLint(this.logger, new ZConfigCosmicReader('markdownlint', new ZConfigExtender())), this.logger, 'markdown');

  /**
   * The configuration reader.
   */
  public config: IZConfigReader = new ZConfigCosmicReader('lint-janitor', new ZConfigExtender());

  /**
   * Initializes a new instance of this object.
   *
   * @param logger The logger to use when formatting output.
   */
  public constructor(private logger: Console) {}

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
      this.logger.log(chalk.magenta.underline(`Linting json files from ${options.jsonFiles.length} globs.`));
      current = await this.jsonLint.lint(options.jsonFiles);
      result = result && current;
    }

    if (options.yamlFiles) {
      this.logger.log(chalk.magenta.underline(`Linting yaml files from ${options.yamlFiles.length} globs.`));
      current = await this.yamlLint.lint(options.yamlFiles);
      result = result && current;
    }

    if (options.markdownFiles) {
      this.logger.log(chalk.magenta.underline(`Linting markdown files from ${options.markdownFiles.length} globs.`));
      current = await this.markdownLint.lint(options.markdownFiles, options.markdownConfig || null);
      result = result && current;
    }

    if (options.esFiles) {
      this.logger.log(chalk.magenta.underline(`Linting ecmaScript files from ${options.esFiles.length} globs.`));
      current = await this.esLint.lint(options.esFiles, options.esConfig || null);
      result = result && current;
    }

    if (options.styleFiles) {
      this.logger.log(chalk.magenta.underline(`Linting style files from ${options.styleFiles.length} globs.`));
      current = await this.styleLint.lint(options.styleFiles, options.styleConfig || null);
      result = result && current;
    }

    if (options.htmlFiles) {
      this.logger.log(chalk.magenta.underline(`Linting html files from ${options.htmlFiles.length} globs.`));
      current = await this.htmlHint.lint(options.htmlFiles, options.htmlConfig || null);
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
      this.logger.error(err);
      return 1;
    }
  }
}
