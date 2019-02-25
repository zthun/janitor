import { IZConfigReader } from './zconfig-reader.interface';

/**
 * Represents a config reader that returns the empty options.
 */
export class ZConfigNullReader implements IZConfigReader {
  /**
   * Returns a null resolved promise.
   *
   * @return A promise that resolves to null.
   */
  public async read(): Promise<any> {
    return null;
  }
}
