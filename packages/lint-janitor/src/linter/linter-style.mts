import stylelint from 'stylelint';
import { IZLinter } from './linter.mjs';
import { $resolve } from '../config/config-resolve.mjs';

/**
 * Represents a linter for stylelint.
 */
export class ZLinterStyle implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger -
   *        The logger to log the output to.
   */
  public constructor(private readonly _logger: Console) {}

  /**
   * Runs the file globs through the stylelint application.
   *
   * @param content -
   *        The list of globs to lint.
   * @param config -
   *        The linter config file.
   *
   * @returns
   *        A promise that, when resolved, returns true
   *        if there are no lint errors, or
   *        false if errors are present.
   */
  public async lint(content: string[], config: string): Promise<boolean> {
    const options: Partial<stylelint.LinterOptions> = {
      files: content
    };

    if (config) {
      options.configFile = $resolve(config, { paths: [process.cwd()] });
    }

    const result = await stylelint.lint(options);
    const verbose = await stylelint.formatters.verbose;

    if (result.errored) {
      const output = verbose(result.results, result);
      this._logger.log(output);
      return false;
    }

    this._logger.log('');
    return true;
  }
}
