import { basename, dirname } from 'path';
import { Configuration, ILinterOptions, Linter } from 'tslint';
import { IZContentLinter } from '../file-lint/content-linter.interface';

/**
 * Represnets an object that can lint ts files.
 */
export class ZTsLint implements IZContentLinter {
  /**
   * The linter to use.
   */
  public linterFactory: (options: ILinterOptions) => Linter;

  /**
   * Initializes a new instance of this object.
   *
   * @param linterFactory The linter factory to construct the ts linter.
   */
  public constructor() {
    this.linterFactory = (options: ILinterOptions) => new Linter(options);
  }

  /**
   * Lints a tsfile content.
   *
   * @param content The content to lint.
   * @param options The linter options.
   *
   * @return A promise that resolves if the linting is clean, and rejects if there are linting errors.
   */
  public lint(content: string, contentPath: string, options: Configuration.RawConfigFile, optionsPath: string): Promise<any> {
    const config = Configuration.parseConfigFile(options, dirname(optionsPath), require);
    const linter = this.linterFactory({
      fix: false
    });
    linter.lint(basename(contentPath), content, config);
    const results = linter.getResult();

    if (results.errorCount > 0 || results.warningCount > 0) {
      return Promise.reject(results.output);
    }

    return Promise.resolve('Lint free.');
  }
}
