import { ESLint } from "eslint";
import { every } from "lodash-es";

import { $resolve } from "../config/config-resolve.mjs";
import type { IZLinter } from "./linter.mjs";

/**
 * Represents an object that can be used to perform eslint on javascript files.
 */
export class ZLinterEs implements IZLinter {
  /**
   * The factory that constructs a CLIEngine object.
   *
   * @param options -
   *        The engine options.
   *
   * @returns
   *        The engine that can be used to perform eslint.
   */
  public engineFactory: (options: ESLint.Options) => ESLint = (options) =>
    new ESLint(options);

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
   *
   * @returns
   *        A promise that resolves to true if the lint is
   *        fully successful, and false if the lint
   *        has errors.
   */
  public async lint(src: string[], config?: string): Promise<boolean> {
    const esOptions: ESLint.Options = {
      errorOnUnmatchedPattern: false,
    };

    if (config) {
      esOptions.overrideConfigFile = $resolve(config, {
        paths: [process.cwd()],
      });
    }

    try {
      const engine = this.engineFactory(esOptions);
      const formatter = await engine.loadFormatter();
      const report = await engine.lintFiles(src);
      const output = formatter.format(report);
      this._logger.log(output);
      return every(report, (r) => r.errorCount === 0);
    } catch (err) {
      this._logger.log(err);
      return false;
    }
  }
}
