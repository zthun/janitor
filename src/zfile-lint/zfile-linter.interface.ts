/**
 * Represents a linter that can be used to lint a single file via path.
 */
export interface IZFileLinter {
  /**
   * Lints the individual file.
   * 
   * @param file The file to lint.
   * 
   * @return A promise that resolves anything if the lint succeeds, and a rejected promise if the lint fails.
   */
  lint(file: string): Promise<any>;
}
