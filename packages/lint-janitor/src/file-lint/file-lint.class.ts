import chalk from 'chalk';
import { readFile } from 'fs';
import { IOptions, sync } from 'glob';
import { resolve } from 'path';
import { promisify } from 'util';
import { IZConfigReader } from '../config/config-reader.interface';
import { IZLinter } from '../linter/linter.interface';
import { IZContentLinter } from '../content/content-linter.interface';

/**
 * Represents an object that can lint files one at a time.
 */
export class ZFileLint implements IZLinter {
  private _globOptions: IOptions = { dot: true };

  /**
   * Initializes a new instance of this object.
   *
   * @param _contentLint The linter for an individual file.
   * @param _configReader The config reader.
   * @param _logger The logger to use.
   * @param _type The file type.
   */
  public constructor(private readonly _contentLint: IZContentLinter, private readonly _configReader: IZConfigReader, private readonly _logger: Console, private readonly _type: string) {}

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

    try {
      options = await this._configReader.read(config);
    } catch (err) {
      this._logger.error(chalk.red(err));
      return false;
    }

    this._logger.log(chalk.green.italic(`Checking syntax for ${allFiles.length} ${this._type} files.`));
    this._logger.log();

    for (const file of allFiles) {
      const fullFilePath = resolve(file);
      try {
        const content = await readFileAsync(fullFilePath, 'utf-8');
        await this._contentLint.lint(content, fullFilePath, options, config);
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
   * @param err The error that occurred.Ø
   */
  private _format(file: string, err: any) {
    const fileFormat = `Errors in ${file}`;
    this._logger.error(chalk.green.underline(fileFormat));

    if (Array.isArray(err)) {
      err.forEach((log) => this._logger.error(chalk.red(log)));
    } else {
      this._logger.error(chalk.red(err));
    }
  }
}
