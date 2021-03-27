import { IZConfigParser } from './config-parser.interface';

/**
 * Parses a json config file.
 */
export class ZConfigJsonParser implements IZConfigParser {
  /**
   * Parses the content.
   *
   * @param content The content to parse.
   *
   * @returns A promise that resolves the parsed content.
   */
  public async parse(content: string): Promise<any> {
    return JSON.parse(content);
  }
}
