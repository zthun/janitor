import { resolve } from 'path';
import { IZLinter } from '../zlint/zlinter.interface';

/**
 * Represents a linter that checks sass files.
 */
export class ZSassLint implements IZLinter {
  /**
   * Initializes a new instance of this object.
   * 
   * @param sasslint The sass lint application.  Constructed from require('sass-lint')
   * @param logger The logger to output the lint results to.
   */
  public constructor(private readonly sasslint: any, private readonly logger: Console) { }

  /**
   * Runs the linter on the file set.
   * 
   * @param files The files to lint.
   * @param config The config file to lint with.
   * 
   * @return A promise that resolves to true if the lint is successful, false if there are errors.
   */
  public async lint(files: string[], config?: string): Promise<boolean> {
    const configFile = config ? resolve(config) : resolve(__dirname, '../../lint/.sass-lint.yml');
    const sassOptions = { configFile };
    let results = [];
    files.map((file) => this.sasslint.lintFiles(file, sassOptions, configFile)).forEach((res) => results = results.concat(res));
    const result = this.sasslint.format(results, {options: sassOptions});
    this.logger.log(result);
    return this.sasslint.errorCount(results).count === 0;
  }
}
