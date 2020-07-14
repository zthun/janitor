import chalk from 'chalk';
import { cosmiconfig } from 'cosmiconfig';
import { resolve } from 'path';
import { IZLintJanitorArgs } from './lint-janitor-args.interface';
import { IZLintJanitorOptions } from './lint-janitor-options.interface';
import { IZLinter } from '../common/linter.interface';
import { ZSilentLint } from '../silent-lint/silent-lint.class';

/**
 * Represents the main entry point object for the application.
 */
export class ZLintJanitor {
  /**
   * The default eslint config.
   */
  public static readonly DefaultEsLintConfig = resolve(__dirname, '../../lint/.eslintrc');
  /**
   * The default html hint config.
   */
  public static readonly DefaultHtmlHintConfig = resolve(__dirname, '../../lint/.htmlhintrc');
  /**
   * The default stylelint config.
   */
  public static readonly DefaultStyleLintConfig = resolve(__dirname, '../../lint/.stylelintrc');
  /**
   * The default markdownlint config.
   */
  public static readonly DefaultMarkdownLintConfig = resolve(__dirname, '../../lint/.markdownlintrc');

  /**
   * The linter for js files.
   */
  public esLint: IZLinter = new ZSilentLint();
  /**
   * The linter for style files.
   */
  public styleLint: IZLinter = new ZSilentLint();
  /**
   * The linter for html files.
   */
  public htmlHint: IZLinter = new ZSilentLint();
  /**
   * The linter for json files.
   */
  public jsonLint: IZLinter = new ZSilentLint();
  /**
   * The linter for yaml files.
   */
  public yamlLint: IZLinter = new ZSilentLint();
  /**
   * The linter for markdown files.
   */
  public markdownLint: IZLinter = new ZSilentLint();

  /**
   * Initializes a new instance of this object.
   *
   * @param logger The logger to use when formatting output.
   */
  public constructor(private logger: Console) {}

  /**
   * Parses the command line and returns the options for linters.
   *
   * @return A promise that resolves the command line options.
   */
  public async parse(args: IZLintJanitorArgs): Promise<IZLintJanitorOptions> {
    const explorer = cosmiconfig('lint-janitor');
    const configLoad = args.config ? Promise.resolve({ filepath: args.config }) : explorer.search();
    const configResult = await configLoad;
    const configFile = configResult ? configResult.filepath : null;

    if (!configFile) {
      const msg = 'Could not find a valid configuration.';
      throw new Error(msg);
    }

    this.logger.log(chalk.cyan(`Reading config file:  ${configFile}`));
    const buffer = await explorer.load(configFile);
    return buffer.config;
  }

  /**
   * Runs the lint given the required options.
   *
   * @param options The lint options.
   *
   * @return A promise that returns 0 if all linting was successful, and 1 if any of the linting failed.
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
      current = await this.markdownLint.lint(options.markdownFiles, options.markdownConfig || ZLintJanitor.DefaultMarkdownLintConfig);
      result = result && current;
    }

    if (options.esFiles) {
      this.logger.log(chalk.magenta.underline(`Linting ecmaScript files from ${options.esFiles.length} globs.`));
      current = await this.esLint.lint(options.esFiles, options.esConfig || ZLintJanitor.DefaultEsLintConfig);
      result = result && current;
    }

    if (options.styleFiles) {
      this.logger.log(chalk.magenta.underline(`Linting style files from ${options.styleFiles.length} globs.`));
      current = await this.styleLint.lint(options.styleFiles, options.styleConfig || ZLintJanitor.DefaultStyleLintConfig);
      result = result && current;
    }

    if (options.htmlFiles) {
      this.logger.log(chalk.magenta.underline(`Linting html files from ${options.htmlFiles.length} globs.`));
      current = await this.htmlHint.lint(options.htmlFiles, options.htmlConfig || ZLintJanitor.DefaultHtmlHintConfig);
      result = result && current;
    }

    return result ? 0 : 1;
  }

  /**
   * Runs the application.
   *
   * @return A promise that returns 0 if all linting was successful, and 1 if any of the linting failed.
   */
  public async run(args: IZLintJanitorArgs): Promise<number> {
    try {
      const options = await this.parse(args);
      return this.lint(options);
    } catch (err) {
      this.logger.error(err);
      return 1;
    }
  }
}
