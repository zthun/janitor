import { formatters, lint, LinterOptions } from 'stylelint';
import { IZLinter } from '../common/linter.interface';

/**
 * Represents a linter for stylelint.
 */
export class ZStyleLint implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger The logger to log the output to.
   */
  public constructor(private readonly _logger: Console) {}

  /**
   * Runs the file globs through the stylelint application.
   *
   * @param content The list of globs to lint.
   * @param config The linter config file.
   *
   * @returns A promise that, when resolved, returns true if there are no lint errors, or
   *          false if errors are present.
   */
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

    this._logger.log('');
    return true;
  }
}
