import { safeLoad } from 'js-yaml';
import { IZFileContentLinter } from '../zfile-lint/zfile-content-linter.interface';

/**
 * Represents a linter for yml files.
 */
export class ZYamlLint implements IZFileContentLinter {
  /**
   * Lints yml files.
   * 
   * @param contents Yaml formatted string.
   * 
   * @return A promise that resolves if successful, or rejects if failed.
   */
  public async lint(contents: string): Promise<any> {
    return await safeLoad(contents);
  }
}
