/**
 * Represents an object that can lint glob patterns of files.
 */
export interface IZLinter {
  /**
   * Lints all files matched by the specified glob pattern.
   *
   * @param src -
   *        The glob patterns to match and lint.
   * @param config -
   *        The optional config for the linter.
   * @param exclude -
   *        The glob patterns to exclude.
   *
   * @returns
   *        A promise that resolves to true if the
   *        linting is ok, and false if the linting
   *        fails.
   */
  lint(src: string[], config?: string, exclude?: string[]): Promise<boolean>;
}
