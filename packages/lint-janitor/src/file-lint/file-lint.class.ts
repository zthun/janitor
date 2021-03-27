import chalk from 'chalk';
import { readFile } from 'fs';
import { IOptions, sync } from 'glob';
import { resolve } from 'path';
import { isArray, promisify } from 'util';
import { IZConfigReader } from '../common/config-reader.interface';
import { IZLinter } from '../common/linter.interface';
import { IZContentLinter } from './content-linter.interface';

/**
 * Represents an object that can lint files one at a time.
 */
export class ZFileLint implements IZLinter {
  private _globOptions: IOptions = { dot: true };

  /**
   * Initializes a new instance of this object.
   *
   * @param contentLint The linter for an individual file.
   * @param configReader The config reader.
   * @param logger The logger to use.
   * @param type The file type.
   */
  public constructor(private contentLint: IZContentLinter, private configReader: IZConfigReader, private logger: Console, private type: string) {}

  /**
   * Lints the collection of json files.
   *
   * @param src The file list of blobs to lint.
   * @param config The optional path to the config file.
   */
  public async lint(src: string[], config?: string): Promise<boolean> {
    const readFileAsync = promisify(readFile);
    let options = {};

    let result = true;
    let allFiles: string[] = [];

    for (const pattern of src) {
      allFiles = allFiles.concat(sync(pattern, this._globOptions));
    }

    if (allFiles.length === 0) {
      return result;
    }

    if (config) {
      try {
        options = await this.configReader.read(config);
        this.logger.log(chalk.green.italic(`Using config file from ${config}`));
      } catch (err) {
        this.logger.error(chalk.red(err));
        return false;
      }
    }

    this.logger.log(chalk.green.italic(`Checking syntax for ${allFiles.length} ${this.type} files.`));
    this.logger.log();

    for (const file of allFiles) {
      const fullFilePath = resolve(file);
      try {
        const content = await readFileAsync(fullFilePath, 'utf-8');
        await this.contentLint.lint(content, fullFilePath, options, config);
      } catch (err) {
        result = false;
        this._format(fullFilePath, err);
      }
    }

    return result;
  }

  /**
   * Formats a file error to the logger.
   *
   * @param file The file that failed to parse.
   * @param err The error that occurred.
   */
  private _format(file: string, err: any) {
    const fileFormat = `Errors in ${file}`;
    this.logger.error(chalk.green.underline(fileFormat));

    if (isArray(err)) {
      err.forEach((log) => this.logger.error(chalk.red(log)));
    } else {
      this.logger.error(chalk.red(err));
    }
  }
}
