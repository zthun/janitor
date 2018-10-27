import chalk from 'chalk';
import { readFile } from 'fs';
import * as G from 'glob';
import { promisify } from 'util';
import { IZLinter } from '../zlint/zlinter.interface';

/**
 * Represents the linter for json files.
 */
export class ZJsonLint implements IZLinter {
  /**
   * Initializes a new instance of this object.
   * 
   * @param logger The logger to use. 
   */
  public constructor(private logger: Console) { }

  /**
   * Lints the collection of json files.
   * 
   * @param src The file list of blobs to lint.
   */
  public async lint(src: string[]): Promise<boolean> {
    const preadFile = promisify(readFile);
    let result = true;
    let allFiles = [];

    for (const pattern of src) {
      allFiles = allFiles.concat(G.sync(pattern));
    }

    if (allFiles.length === 0) {
      return result;
    }

    this.logger.log(chalk.green.italic(`Checking syntax for ${allFiles.length} json files.`));

    for (const file of allFiles) {      
      try {
        const contents = await preadFile(file, 'utf-8');
        JSON.parse(contents);
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
  const fileFormat = `Error in ${file}.`;
  this.logger.error(chalk.red(fileFormat));
  this.logger.error(chalk.red(err));
}

}
