import { CLIEngine } from 'eslint';
import { IZLinter } from '../common/linter.interface';

/**
 * Represents an object that can be used to perform eslint on javascript files.
 */
export class ZEsLint implements IZLinter {
  /**
   * The factory that constructs a CLIEngine object.
   */
  public engineFactory: (options: CLIEngine.Options) => CLIEngine = (options) => new CLIEngine(options);

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
   * @param config The lint config file.
   *
   * @return A promise that resolves to true if the lint is fully successful, and false if the lint
   *         has errors.
   */
  public async lint(src: string[], config: string): Promise<boolean> {
    const esOptions = {
      configFile: config,
      useEslintrc: true
    };

    const engine = this.engineFactory(esOptions);
    const formatter = engine.getFormatter(null);
    let report: CLIEngine.LintReport;

    try {
      report = engine.executeOnFiles(src);
    } catch (err) {
      this._logger.log(err);
      return false;
    }

    const results = CLIEngine.getErrorResults(report.results);
    const output = formatter(results);
    this._logger.log(output);
    return report.errorCount === 0;
  }
}
