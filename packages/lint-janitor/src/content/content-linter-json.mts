import { IZContentLinter } from './content-linter.mjs';

/**
 * Represents the linter for json files.
 */
export class ZContentLinterJson implements IZContentLinter {
  /**
   * Lints the collection of json files.
   *
   * @param contents -
   *        The json file contents.
   */
  public async lint(contents: string): Promise<any> {
    return JSON.parse(contents);
  }
}
