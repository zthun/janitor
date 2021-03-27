/**
 * Represents an object that can be used to lint file contents.
 */
export interface IZContentLinter {
  /**
   * Lints file content.
   *
   * @param content The content to lint.
   * @param contentPath The path of the content.
   * @param options The options for the linter.
   * @param optionsPath The path of the options configuration.
   *
   * @return A resolved promise if the lint is successful, a rejected promise if not.
   */
  lint(content: string, contentPath: string, options: any, optionsPath: string): Promise<any>;
}
