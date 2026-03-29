import type { Options } from "prettier";
import { check, getFileInfo } from "prettier";

import type { IZContentLinter } from "./content-linter.mjs";

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
  public async lint(
    content: string,
    contentPath: string,
    options?: Options,
  ): Promise<unknown> {
    const file = await getFileInfo(contentPath);
    const finalOptions = Object.assign(
      {},
      { parser: file.inferredParser },
      options,
    );
    const formatted = await check(content, finalOptions);

    if (!formatted) {
      throw new Error(`${contentPath} is not formatted.`);
    }

    return `${contentPath} is properly formatted.`;
  }
}
