import { IZConfigReader } from './config-reader.interface';

/**
 * Represents a config reader that returns the empty options.
 */
export class ZConfigReaderNull implements IZConfigReader {
  /**
   * Returns a null resolved promise.
   *
   * @returns
   *        A promise that resolves to null.
   */
  public async read(): Promise<any> {
    return null;
  }
}
