/**
 * Represents an object that can be used to discover a config file.
 */
export interface IZConfigDiscovery {
  /**
   * Searches for a configuration file.
   *
   * @returns The path to the discovered configuration file or null if no such configuration can be found.
   */
  search(): Promise<string>;
}
