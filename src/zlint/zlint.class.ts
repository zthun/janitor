import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { ZEsLint } from '../zeslint/zeslint.class';
import { ZSassLint } from '../zsasslint/zsasslint.class';
import { IZLintArgs } from './zlint-args.interface';
import { IZLintOptions } from './zlint-options.interface';
import { IZLinter } from './zlinter.interface';

/**
 * Represents the main entry point object for the application.
 */
export class ZLint {
  /**
   * The default config file.
   */
  public static readonly DefaultConfig = resolve('./zlint.json');
  /**
   * The encoding of the config file.
   */
  public static readonly ConfigEncoding = 'utf8';
  /**
   * The linter for js files.
   */
  public eslint: IZLinter;
  /**
   * The linter for scss files.
   */
  public sasslint: IZLinter;
  /**
   * The linter for html files.
   */
  public htmlhint: IZLinter;
  /**
   * The linter for ts files.
   */
  public tslint: IZLinter;
  /**
   * The linter for json files.
   */
  public jsonlint: IZLinter;
  /**
   * The linter for yaml files.
   */
  public yamllint: IZLinter;

  /**
   * Initializes a new instance of this object.
   * 
   * @param logger The logger to use when formatting output.
   */
  public constructor(private logger: Console) {
    this.eslint = new ZEsLint(require('eslint'), this.logger);
    this.sasslint = new ZSassLint(require('sass-lint'), this.logger);
    // this.htmlhint = new ZHtmlHint(require('htmlhint'), this.logger);
    // this.tslint = new ZTsLint(require('tslint'), this.logger);
    // this.jsonlint = new ZJsonLint(require('jsonlint'), this.logger);
    // this.yamllint = new ZYamlLint(require('yaml-lint'), this.logger); 
  }

  /**
   * Parses the command line and returns the options for zlint.
   * 
   * @return A promise that resolves the command line options.
   */
  public async parse(args: IZLintArgs): Promise<IZLintOptions> {
    const configFile = args.config || ZLint.DefaultConfig;
    this.logger.log(`Using config file:  ${configFile}`);
    const pread = promisify(readFile);
    const buffer = await pread(configFile, ZLint.ConfigEncoding);
    return JSON.parse(buffer) as IZLintOptions;
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

    if (options.esFiles) {
      this.logger.log(`Linting javascript files from ${options.esFiles.length} globs.`);
      current = await this.eslint.lint(options.esFiles, options.esConfig);
      result = result && current;
    }

    if (options.tsFiles) {
      this.logger.log(`Linting typescript files from ${options.tsFiles.length} globs.`);
      current = await this.tslint.lint(options.tsFiles, options.tsConfig);
      result = result && current;
    }

    if (options.sassFiles) {
      this.logger.log(`Linting sass files from ${options.sassFiles.length} globs.`);
      current = await this.sasslint.lint(options.sassFiles, options.sassConfig);
      result = result && current;
    }

    if (options.htmlFiles) {
      this.logger.log(`Linting html files from ${options.htmlFiles.length} globs.`);
      current = await this.htmlhint.lint(options.htmlFiles, options.htmlConfig);
      result = result && current;
    }
  
    if (options.jsonFiles) {
      this.logger.log(`Linting json files from ${options.jsonFiles.length} globs.`);
      current = await this.jsonlint.lint(options.jsonFiles);
      result = result && current;
    }
  
    if (options.yamlFiles) {
      this.logger.log(`Linting yaml files from ${options.yamlFiles.length} globs.`);
      current = await this.yamllint.lint(options.yamlFiles);
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
