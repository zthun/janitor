import { check, getFileInfo, Options } from 'prettier';
import { IZContentLinter } from './content-linter.interface';

/**
 * Represents an object that can be used to perform prettier checks on files.
 */
export class ZContentLinterPretty implements IZContentLinter {
  /**
   * Lints the content.
   *
   * @param content -
   *        The content to check.
   * @param contentPath -
   *        The path of the content data.
   * @param options -
   *        The htmlhint options.
   *
   * @returns
   *        A promise that resolves if the content is lint free, and rejects if it has lint errors.
   */
  public async lint(content: string, contentPath: string, options?: Options): Promise<any> {
    const file = await getFileInfo(contentPath);
    const finalOptions = Object.assign({}, { parser: file.inferredParser }, options);
    const formatted = check(content, finalOptions);

    if (!formatted) {
      return Promise.reject(`${contentPath} is not formatted.`);
    }

    return Promise.resolve(`${contentPath} is properly formatted.`);
  }
}
