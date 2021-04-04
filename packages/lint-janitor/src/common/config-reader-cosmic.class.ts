import { cosmiconfig } from 'cosmiconfig';
import { IZConfigDiscovery } from './config-discovery.interface';
import { IZConfigExtender } from './config-extender.interface';
import { IZConfigReader } from './config-reader.interface';

/**
 * Represents a reader that uses the cosmiconfig standard for files.
 */
export class ZConfigReaderCosmic implements IZConfigReader, IZConfigDiscovery {
  /**
   * Initializes a new instance of this object.
   *
   * @param name The name of the application to load.
   * @param extends The extender for
   */
  public constructor(public name: string, public extender: IZConfigExtender) {}

  /**
   * Runs a search for the appropriate configuration file.
   *
   * The extension keyword is deleted from the config.
   *
   * @returns A promise that resolves with the expanded configuration.
   */
  public async search() {
    const explorer = cosmiconfig(this.name);
    const actual = await explorer.search();
    return actual?.filepath;
  }

  /**
   * Reads the config file.
   *
   * @param config The optional configuration file.  If this is null then the cosmiconfig path is searched on the name.
   *
   * @returns A promise that resolves the json object that represents the config.
   */
  public async read(config: string): Promise<any> {
    const configLoad = config ? Promise.resolve(config) : this.search();
    const configFile = await configLoad;

    if (!configFile) {
      return Promise.reject(new Error('Could not find a valid configuration.'));
    }

    const path = require.resolve(configFile, { paths: [process.cwd()] });
    const buffer = await cosmiconfig(this.name).load(path);
    return await this.extender.extend(buffer.config);
  }
}
