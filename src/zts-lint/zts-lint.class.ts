import { Linter } from 'tslint';
import { IConfigurationFile, parseConfigFile, RawConfigFile } from 'tslint/lib/configuration';
import { IZContentLinter } from '../zfile-lint/zcontent-linter.interface';
import { IZTsLinterFactory } from './zts-linter-factory.interface';

/**
 * Represnets an object that can lint ts files.
 */
export class ZTsLint implements IZContentLinter {
  /**
   * Initializes a new instance of this object.
   * 
   * @param linterFactory The linter factory to construct the ts linter.
   */
  public constructor(private linterFactory: IZTsLinterFactory) { }

  /**
   * Lints a tsfile content.
   * 
   * @param content The content to lint.
   * @param options The linter options.
   * 
   * @return A promise that resolves if the linting is clean, and rejects if there are linting errors.
   */
  public lint(content: string, options: RawConfigFile): Promise<any> {
    const linter = this.linterFactory.create();

    const config = parseConfigFile(options);
    linter.lint('', content, config);
    const results = linter.getResult();

    if (results.errorCount > 0 || results.warningCount > 0) {
      return Promise.reject(results.output);
    }

    return Promise.resolve('Lint free.');
  }

}
