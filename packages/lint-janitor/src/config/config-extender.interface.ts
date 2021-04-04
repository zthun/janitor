/**
 * Represents an object that can be used to build configs using an extends pattern.
 */
export interface IZConfigExtender {
  /**
   * Expands a configuration object.
   *
   * @param config The current configuration object.
   */
  extend(config: any): Promise<string>;
}
