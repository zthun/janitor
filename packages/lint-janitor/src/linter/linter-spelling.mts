import chalk from 'chalk';
import { CSpellApplicationOptions, CSpellReporter, Issue, lint } from 'cspell';
import noop from 'lodash/noop.js';
import { IZLinter } from './linter.mjs';
import { $resolve } from '../config/config-resolve.mjs';

/**
 * Represents an object that can be used to perform cspell on files.
 */
export class ZLinterSpelling implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger -
   *        The logger to output to.
   */
  public constructor(private readonly _logger: Console) {}

  /**
   * Runs the lint given the specified config and source files.
   *
   * @param src -
   *        The list of files globs to lint.
   * @param config -
   *        The optional lint config file.
   * @param exclude -
   *        The list of file globs to exclude.
   *
   * @returns
   *        A promise that resolves to true if the
   *        lint is fully successful, and false if the lint
   *        has errors.
   */
  public async lint(src: string[], config?: string, exclude?: string[]): Promise<boolean> {
    const options: CSpellApplicationOptions = { exclude };

    if (config) {
      options.config = $resolve(config, { paths: [process.cwd()] });
    }

    const info = noop;
    const debug = noop;
    const error = noop;
    const progress = noop;
    const result = noop;

    const issue = (issue: Issue) => {
      const position = `${issue.row}:${issue.col}`;
      this._logger.log(`${chalk.green(issue.uri)}:${chalk.yellow(position)} - Unknown word (${chalk.red(issue.text)})`);
    };

    const emitters: CSpellReporter = { info, debug, error, progress, issue, result };
    const runResult = await lint(src, options, emitters);

    if (runResult.errors > 0 || runResult.issues > 0) {
      return false;
    }

    this._logger.log();
    return true;
  }
}
