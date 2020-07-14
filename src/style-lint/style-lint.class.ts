import { formatters, lint, LinterOptions, LintResult } from 'stylelint';
import { IZLinter } from '../lint/linter.interface';

export class ZStyleLint implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger The logger to log the output to.
   */
  public constructor(private readonly _logger: Console) {}

  public async lint(content: string[], config: string): Promise<boolean> {
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
