import chalk from 'chalk';
import { CLIEngine } from 'eslint';
import { resolve } from 'path';
import { IZLinter } from '../zlint/zlinter.interface';
import { IZEsLintEngineFactory } from './zes-lint-engine-factory.interface';

/**
 * Represents an object that can be used to perform eslint on javascript files.
 */
export class ZEsLint implements IZLinter {
  /**
   * Gets the default config path.
   */
  public static readonly DefaultConfig = resolve(__dirname, '../../lint/.eslintrc');

  /**
   * Initializes a new instance of this object.
   * 
   * @param factory The factory object to construct the engine.
   * @param logger The logger to output to.
   */
  public constructor(private readonly factory: IZEsLintEngineFactory, private readonly logger: Console) {}

  /**
   * Runs the lint given the specified config and source files.
   * 
   * @param src The list of files globs to lint.
   * @param config The lint config file.
   * 
   * @return A promise that resolves to true if the lint is fully successful, and false if the lint
   *         has errors.
   */
  public async lint(src: string[], config?: string): Promise<boolean> {
    const configFile = config ? resolve(config) : ZEsLint.DefaultConfig;
    this.logger.log(chalk.green.italic(`Using eslint config file from ${configFile}`));
    const useEslintrc = true;

    const esOptions = { 
      configFile,
      useEslintrc
    };
    
    const engine = this.factory.create(esOptions);
    const formatter = engine.getFormatter(null);
    let report: CLIEngine.LintReport;

    try {
      report = engine.executeOnFiles(src);
    } catch (err) {
      this.logger.log(err);
      return false;
    }

    let results = CLIEngine.getErrorResults(report.results);
    const output = formatter(results);
    this.logger.log(output);
    return report.errorCount === 0;
  }
}
