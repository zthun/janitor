import { IZContentLinter } from '../content/content-linter.interface';

/**
 * Represents the linter for json files.
 */
export class ZJsonLint implements IZContentLinter {
  /**
   * Lints the collection of json files.
   *
   * @param contents The json file contents.
   */
  public async lint(contents: string): Promise<any> {
    return JSON.parse(contents);
  }
}
