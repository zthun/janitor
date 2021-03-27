/**
 * Represents an object that can read a config file.
 */
export interface IZConfigReader {
  /**
   * Reads the config file and returns the contents as an object.
   *
   * @param config The config file to read.
   *
   * @return A promise that returns the content of the config file.
   */
  read(config: string): Promise<any>;
}
