import { basename, dirname } from 'path';
import { Configuration, Linter } from 'tslint';
import { IZContentLinter } from '../zfile-lint/zcontent-linter.interface';

/**
 * Represnets an object that can lint ts files.
 */
export class ZTsLint implements IZContentLinter {
  /**
   * The linter to use.
   */
  public linter: Linter;

  /**
   * Initializes a new instance of this object.
   *
   * @param linterFactory The linter factory to construct the ts linter.
   */
  public constructor() {
    this.linter = new Linter({
      fix: false,
    });
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
    this.linter.lint(basename(contentPath), content, config);
    const results = this.linter.getResult();

    if (results.errorCount > 0 || results.warningCount > 0) {
      return Promise.reject(results.output);
    }

    return Promise.resolve('Lint free.');
  }

}
