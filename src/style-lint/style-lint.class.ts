import chalk from 'chalk';
import { formatters, lint, LinterOptions } from 'stylelint';
import { IZLinter } from '../lint/linter.interface';

export class ZStyleLint implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger The logger to log the output to.
   */
  public constructor(private readonly _logger: Console) {}

  public async lint(content: string[], config: string): Promise<boolean> {
    this._logger.log(chalk.green.italic(`Using config file from ${config}`));

    const options: Partial<LinterOptions> = {
      configFile: config,
      files: content
    };

    const result = await lint(options);

    if (result.errored) {
      const output = formatters.verbose(result.results);
      this._logger.log(output);
      return false;
    }

    this._logger.log('');
    return true;
  }

  /*
  public async lint(content: string, contentPath: string, options: any, optionsPath: string): Promise<any> {
    const lintOptions: Partial<LinterOptions> = {
      config: options,
      code: content,
      formatter: 'verbose'
    };

    const data = await lint(lintOptions);

    if (data.errored) {
      return Promise.reject(data.output);
    }

    return data.output;
  }
  */
}
