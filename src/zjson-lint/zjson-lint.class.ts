import { IZFileContentLinter } from '../zfile-lint/zfile-content-linter.interface';

/**
 * Represents the linter for json files.
 */
export class ZJsonLint implements IZFileContentLinter {
  /**
   * Lints the collection of json files.
   * 
   * @param contents The json file contents.
   */
  public async lint(contents: string): Promise<any> {
    JSON.parse(contents);
    return Promise.resolve(true);
  }
}
