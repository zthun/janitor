import { IZLinter } from '../common/linter.interface';

/**
 * Represents a silent linter that always succeeds.
 */
export class ZSilentLint implements IZLinter {
  /**
   * Returns a promise that resolves true.
   *
   * @returns A promise that resolves true.
   */
  public lint(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
