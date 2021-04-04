import { ESLint } from 'eslint';
import { every } from 'lodash';
import { IZLinter } from './linter.interface';

/**
 * Represents an object that can be used to perform eslint on javascript files.
 */
export class ZLinterEs implements IZLinter {
  /**
   * The factory that constructs a CLIEngine object.
   *
   * @param options The engine options.
   *
   * @returns The engine that can be used to perform eslint.
   */
  public engineFactory: (options: ESLint.Options) => ESLint = (options) => new ESLint(options);

  /**
   * Initializes a new instance of this object.
   *
   * @param factory The factory object to construct the engine.
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
    const esOptions: ESLint.Options = {
      useEslintrc: true
    };

    if (config) {
      esOptions.overrideConfigFile = require.resolve(config, { paths: [process.cwd()] });
    }

    const engine = this.engineFactory(esOptions);
    const formatter = await engine.loadFormatter();
    let report: ESLint.LintResult[];

    try {
      report = await engine.lintFiles(src);
    } catch (err) {
      this._logger.log(err);
      return false;
    }

    const output = formatter.format(report);
    this._logger.log(output);
    return every(report, (r) => r.errorCount === 0);
  }
}
