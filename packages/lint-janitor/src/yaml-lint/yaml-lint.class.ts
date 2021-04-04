import { load } from 'js-yaml';
import { IZContentLinter } from '../content/content-linter.interface';

/**
 * Represents a linter for yml files.
 */
export class ZYamlLint implements IZContentLinter {
  /**
   * Lints yml files.
   *
   * @param contents Yaml formatted string.
   *
   * @returns A promise that resolves if successful, or rejects if failed.
   */
  public async lint(contents: string): Promise<any> {
    return load(contents);
  }
}
