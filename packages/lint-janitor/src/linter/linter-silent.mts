import { IZLinter } from './linter.mjs';

/**
 * Represents a silent linter that always succeeds.
 */
export class ZLinterSilent implements IZLinter {
  /**
   * Initializes a new instance of this object.
   *
   * @param _resolve -
   *        The value to resolve.
   */
  public constructor(private _resolve = true) {}

  /**
   * Returns a promise that resolves the resolved value.
   *
   * @returns
   *        A promise that resolves the resolved value.
   */
  public lint(): Promise<boolean> {
    return Promise.resolve(this._resolve);
  }
}
