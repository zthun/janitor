/**
 * Represents an object that can be used to lint file contents.
 */
export interface IZFileContentLinter {
  /**
   * Lints file content.
   * 
   * @param content The content to lint.
   */
  lint(content: string): Promise<any>;
}
