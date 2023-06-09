import chalk from 'chalk';
import { GlobOptionsWithFileTypesFalse, sync } from 'glob';
import { uniq } from 'lodash';
import { IZLinter } from './linter.interface';

/**
 * Represents an object that will report on file globs, but will
 * pass the actual linting job to another linter.
 */
export class ZLinterReport implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _child -
   *        The child linter to pass the operation off to.
   * @param _logger -
   *        The logger to use.
   * @param _type -
   *        The file type.
   */
  public constructor(
    private readonly _child: IZLinter,
    private readonly _logger: Console,
    private readonly _type: string
  ) {}

  /**
   * Lints the collection of json files.
   *
   * @param src -
   *        The file list of blobs to lint.
   * @param config -
   *        The optional path to the config file.
   * @param exclude -
   *        The list of globs to exclude.
   */
  public async lint(src: string[], config?: string, exclude?: string[]): Promise<boolean> {
    const globOptions: GlobOptionsWithFileTypesFalse = { dot: true, ignore: exclude };

    let files: string[] = [];
    src.forEach((pattern) => (files = files.concat(sync(pattern, globOptions))));
    files = uniq(files);

    if (files.length === 0) {
      this._logger.log(chalk.yellow.italic('No globs matched any files.'));
      return true;
    }

    this._logger.log(chalk.green.italic(`Checking syntax for ${files.length} ${this._type} files.`));
    return this._child.lint(src, config, exclude);
  }
}
