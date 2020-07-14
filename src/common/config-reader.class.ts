import { readFile } from 'fs';
import { promisify } from 'util';
import { IZConfigParser } from './config-parser.interface';
import { IZConfigReader } from './config-reader.interface';

/**
 * Represents the standard config reader.
 */
export class ZConfigReader implements IZConfigReader {
  /**
   * Initializes a new instance of this object.
   *
   * @param parser The config content parser.
   */
  public constructor(private parser: IZConfigParser) {}

  /**
   * Reads the config file.
   *
   * @param config The config file to read.
   *
   * @return A promise that resolves the json object that represents the config.
   */
  public async read(config: string): Promise<any> {
    const readFileAsync = promisify(readFile);
    const content = await readFileAsync(config, 'utf-8');
    return await this.parser.parse(content);
  }
}
