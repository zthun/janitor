import chalk from 'chalk';
import { cosmiconfig } from 'cosmiconfig';
import { resolve } from 'path';
import { IZLintArgs } from './lint-args.interface';
import { IZLintOptions } from './lint-options.interface';
import { IZLinter } from './linter.interface';
import { ZSilentLinter } from './silent-linter.class';

/**
 * Represents the main entry point object for the application.
 */
export class ZLint {
  /**
   * The default eslint config.
   */
  public static readonly DefaultEsLintConfig = resolve(__dirname, '../../lint/.eslintrc');
  /**
   * The default sass lint config.
   */
  public static readonly DefaultSassLintConfig = resolve(__dirname, '../../lint/.sass-lint.yml');
  /**
   * The default html hint config.
   */
  public static readonly DefaultHtmlHintConfig = resolve(__dirname, '../../lint/.htmlhintrc');
  /**
   * The default tslint config.
   */
  public static readonly DefaultTsLintConfig = resolve(__dirname, '../../lint/tslint.json');
  /**
   * The default stylelint config.
   */
  public static readonly DefaultStyleLintConfig = resolve(__dirname, '../../lint/.stylelintrc.json');
  /**
   * The linter for js files.
   */
  public esLint: IZLinter = new ZSilentLinter();
  /**
   * The linter for style files.
   */
  public styleLint: IZLinter = new ZSilentLinter();
  /**
   * The linter for scss files.
   */
  public sassLint: IZLinter = new ZSilentLinter();
  /**
   * The linter for html files.
   */
  public htmlHint: IZLinter = new ZSilentLinter();
  /**
   * The linter for ts files.
   */
  public tsLint: IZLinter = new ZSilentLinter();
  /**
   * The linter for json files.
   */
  public jsonLint: IZLinter = new ZSilentLinter();
  /**
   * The linter for yaml files.
   */
  public yamlLint: IZLinter = new ZSilentLinter();

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
  public async parse(args: IZLintArgs): Promise<IZLintOptions> {
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
  public async lint(options: IZLintOptions): Promise<number> {
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

    if (options.esFiles) {
      this.logger.log(chalk.magenta.underline(`Linting javascript files from ${options.esFiles.length} globs.`));
      current = await this.esLint.lint(options.esFiles, options.esConfig || ZLint.DefaultEsLintConfig);
      result = result && current;
    }

    if (options.tsFiles) {
      this.logger.log(chalk.magenta.underline(`Linting typescript files from ${options.tsFiles.length} globs.`));
      current = await this.tsLint.lint(options.tsFiles, options.tsConfig || ZLint.DefaultTsLintConfig);
      result = result && current;
    }

    if (options.sassFiles) {
      this.logger.log(chalk.magenta.underline(`Linting sass files from ${options.sassFiles.length} globs.`));
      current = await this.sassLint.lint(options.sassFiles, options.sassConfig || ZLint.DefaultSassLintConfig);
      result = result && current;
    }

    if (options.styleFiles) {
      this.logger.log(chalk.magenta.underline(`Linting style files from ${options.styleFiles.length} globs.`));
      current = await this.styleLint.lint(options.styleFiles, options.styleConfig || ZLint.DefaultStyleLintConfig);
      result = result && current;
    }

    if (options.htmlFiles) {
      this.logger.log(chalk.magenta.underline(`Linting html files from ${options.htmlFiles.length} globs.`));
      current = await this.htmlHint.lint(options.htmlFiles, options.htmlConfig || ZLint.DefaultHtmlHintConfig);
      result = result && current;
    }

    return result ? 0 : 1;
  }

  /**
   * Runs the application.
   *
   * @return A promise that returns 0 if all linting was successful, and 1 if any of the linting failed.
   */
  public async run(args: IZLintArgs): Promise<number> {
    try {
      const options = await this.parse(args);
      return this.lint(options);
    } catch (err) {
      this.logger.error(err);
      return 1;
    }
  }
}
