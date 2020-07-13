import chalk from 'chalk';
import { IZLinter } from '../lint/linter.interface';

/**
 * Represents a linter that checks sass files.
 */
export class ZSassLint implements IZLinter {
  /**
   * The sasslinter.  Constructed from require('sass-lint')
   */
  public sasslint: any;

  /**
   * Initializes a new instance of this object.
   *
   * @param logger The logger to output the lint results to.
   */
  public constructor(private readonly logger: Console) {
    this.sasslint = require('sass-lint');
  }

  /**
   * Runs the linter on the file set.
   *
   * @param files The files to lint.
   * @param config The config file to lint with.
   *
   * @return A promise that resolves to true if the lint is successful, false if there are errors.
   */
  public async lint(files: string[], config: string): Promise<boolean> {
    this.logger.log(chalk.green.italic(`Using config file from ${config}`));
    const sassOptions = { config };
    let results = [];
    files.map((file) => this.sasslint.lintFiles(file, sassOptions, config)).forEach((res) => (results = results.concat(res)));
    const result = this.sasslint.format(results, { options: sassOptions });
    this.logger.log(result);
    return this.sasslint.errorCount(results).count === 0;
  }
}
