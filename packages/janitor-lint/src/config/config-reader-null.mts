import type { IZConfigReader } from "./config-reader.mjs";

/**
 * Represents a config reader that returns the empty options.
 */
export class ZConfigReaderNull implements IZConfigReader<null> {
  /**
   * Returns a null resolved promise.
   *
   * @returns
   *        A promise that resolves to null.
   */
  public read() {
    return Promise.resolve(null);
  }
}
