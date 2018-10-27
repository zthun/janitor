import chalk from 'chalk';
import * as G from 'glob';
import { IZLinter } from '../zlint/zlinter.interface';
import { IZFileLinter } from './zfile-linter.interface';

/**
 * Represnets an object that can lint files one at a time.
 */
export class ZFileLint implements IZLinter {
  private _globOptions: G.IOptions;

  /**
   * Initializes a new instance of this object.
   * 
   * @param filelint The linter for an individual file.
   * @param logger The logger to use.
   * @param type The file type.
   */
  public constructor(private filelint: IZFileLinter, private logger: Console, private type: string) {
    this._globOptions = {
      dot: true
    };
  }

  /**
   * Lints the collection of json files.
   * 
   * @param src The file list of blobs to lint.
   */
  public async lint(src: string[]): Promise<boolean> {
    let result = true;
    let allFiles = [];

    for (const pattern of src) {
      allFiles = allFiles.concat(G.sync(pattern, this._globOptions));
    }

    if (allFiles.length === 0) {
      return result;
    }

    this.logger.log(chalk.green.italic(`Checking syntax for ${allFiles.length} ${this.type} files.`));

    for (const file of allFiles) {
      try {
        await this.filelint.lint(file);
      } catch (err) {
        result = false;
        this._format(file, err);
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
    const fileFormat = `Errors in ${file}.`;
    this.logger.error(chalk.red.underline(fileFormat));
    this.logger.error(chalk.red(err));
  }
}
