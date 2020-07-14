import { IZLinter } from './linter.interface';

/**
 * Represents a silent linter that always succeeds.
 */
export class ZSilentLinter implements IZLinter {
  /**
   * Returns a promise that resolves true.
   *
   * @return A promise that resolves true.
   */
  public lint(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
