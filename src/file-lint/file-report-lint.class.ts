import chalk from 'chalk';
import { IOptions, sync } from 'glob';
import { IZLinter } from '../common/linter.interface';

/**
 * Represents an object that will report on file globs, but will
 * pass the actual linting job to another linter.
 */
export class ZFileReportLint implements IZLinter {
  private _globOptions: IOptions = { dot: true };

  /**
   * Initializes a new instance of this object.
   *
   * @param _child The child linter to pass the operation off to.
   * @param logger The logger to use.
   * @param type The file type.
   */
  public constructor(private readonly _child: IZLinter, private logger: Console, private type: string) {}

  /**
   * Lints the collection of json files.
   *
   * @param src The file list of blobs to lint.
   * @param config The optional path to the config file.
   */
  public async lint(src: string[], config?: string): Promise<boolean> {
    this.logger.log(chalk.green.italic(`Using config file from ${config}`));
    let allFiles: string[] = [];

    for (const pattern of src) {
      allFiles = allFiles.concat(sync(pattern, this._globOptions));
    }

    if (allFiles.length === 0) {
      return true;
    }

    this.logger.log(chalk.green.italic(`Checking syntax for ${allFiles.length} ${this.type} files.`));

    return this._child.lint(src, config);
  }
}
