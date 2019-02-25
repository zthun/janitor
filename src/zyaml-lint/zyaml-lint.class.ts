import { safeLoad } from 'js-yaml';
import { IZContentLinter } from '../zfile-lint/zcontent-linter.interface';

/**
 * Represents a linter for yml files.
 */
export class ZYamlLint implements IZContentLinter {
  /**
   * Lints yml files.
   *
   * @param contents Yaml formatted string.
   *
   * @return A promise that resolves if successful, or rejects if failed.
   */
  public async lint(contents: string): Promise<any> {
    return safeLoad(contents);
  }
}
