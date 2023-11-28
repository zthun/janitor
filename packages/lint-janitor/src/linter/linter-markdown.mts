import chalk from 'chalk';
import { GlobOptionsWithFileTypesFalse, sync } from 'glob';
import { some, values } from 'lodash';
import markdownlint, { Options } from 'markdownlint';
import { promisify } from 'util';
import { IZConfigReader } from '../config/config-reader.mjs';
import { IZLinter } from './linter.mjs';

/**
 * Represents a linter object that checks markdown.
 */
export class ZLinterMarkdown implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger -
   *        The logger to write messages to.
   * @param _reader -
   *        The configuration reader.
   */
  public constructor(
    private readonly _logger: Console,
    private readonly _reader: IZConfigReader
  ) {}

  /**
   * Lints all files matched by the specified glob pattern.
   *
   * @param src -
   *        The glob patterns to match and lint.
   * @param cfg -
   *        The optional config for the linter.
   * @param exclude -
   *        The glob patterns to exclude.
   *
   * @returns A promise that resolves to true if the linting is ok, and false if the linting fails.
   */
  public async lint(src: string[], cfg: string, exclude: string[] = []): Promise<boolean> {
    let config: any;

    try {
      config = await this._reader.read(cfg);
    } catch (err) {
      this._logger.error(chalk.red(err));
      return false;
    }

    const globOptions: GlobOptionsWithFileTypesFalse = { dot: true, ignore: exclude };
    let files: string[] = [];
    src.forEach((pattern) => (files = files.concat(sync(pattern, globOptions))));

    const options: Options = { files, config };
    const markdownLintAsync = promisify(markdownlint);
    const result = await markdownLintAsync(options);
    this._logger.log(`${result.toString().trim()}`);
    return !some(values(result), (val) => val.length > 0);
  }
}
