import chalk from 'chalk';
import { IOptions, sync } from 'glob';
import { IZLinter } from './linter.interface';

/**
 * Represents an object that will report on file globs, but will
 * pass the actual linting job to another linter.
 */
export class ZLinterReport implements IZLinter {
  private readonly _globOptions: IOptions = { dot: true };

  /**
   * Initializes a new instance of this object.
   *
   * @param _child The child linter to pass the operation off to.
   * @param _logger The logger to use.
   * @param _type The file type.
   */
  public constructor(private readonly _child: IZLinter, private readonly _logger: Console, private readonly _type: string) {}

  /**
   * Lints the collection of json files.
   *
   * @param src The file list of blobs to lint.
   * @param config The optional path to the config file.
   */
  public async lint(src: string[], config?: string): Promise<boolean> {
    let allFiles: string[] = [];

    for (const pattern of src) {
      allFiles = allFiles.concat(sync(pattern, this._globOptions));
    }

    if (allFiles.length === 0) {
      return true;
    }

    this._logger.log(chalk.green.italic(`Checking syntax for ${allFiles.length} ${this._type} files.`));
    return this._child.lint(src, config);
  }
}
