/* eslint-disable require-jsdoc */
import chalk from 'chalk';
import { CSpellApplicationOptions, Emitters, Issue, lint } from 'cspell';
import { noop } from 'lodash';
import { IZLinter } from '../linter/linter.interface';

/**
 * Represents an object that can be used to perform cspell on files.
 */
export class ZSpellLint implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger The logger to output to.
   */
  public constructor(private readonly _logger: Console) {}

  /**
   * Runs the lint given the specified config and source files.
   *
   * @param src The list of files globs to lint.
   * @param config The optional lint config file.
   *
   * @returns A promise that resolves to true if the lint is fully successful, and false if the lint
   *         has errors.
   */
  public async lint(src: string[], config: string): Promise<boolean> {
    const options: CSpellApplicationOptions = {};

    if (config) {
      options.config = require.resolve(config, { paths: [process.cwd()] });
    }

    const info = noop;
    const debug = noop;
    const error = noop;
    const progress = noop;

    const issue = (issue: Issue) => {
      const position = `${issue.row}:${issue.col}`;
      this._logger.log(`${chalk.green(issue.uri)}:${chalk.yellow(position)} - Unknown word (${chalk.red(issue.text)})`);
    };

    const emitters: Emitters = { info, debug, error, progress, issue };
    const result = await lint(src, options, emitters);

    if (result.errors > 0) {
      return false;
    }

    this._logger.log();
    return true;
  }
}
