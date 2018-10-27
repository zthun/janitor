/**
 * Represents an object that can be used to lint file contents.
 */
export interface IZContentLinter {
  /**
   * Lints file content.
   * 
   * @param content The content to lint.
   * @param options The options for the linter.
   * 
   * @return A resolved promise if the lint is successful, a rejected promise if not.
   */
  lint(content: string, options?: any): Promise<any>;
}
