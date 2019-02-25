/**
 * Represents an object that can be used to parse config data.
 */
export interface IZConfigParser {
  /**
   * Parses the content and converts it to an object.
   *
   * @param content The content to parse.
   *
   * @return A promise that resolves the config object.
   */
  parse(content: string): Promise<any>;
}
