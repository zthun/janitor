import { cosmiconfig } from 'cosmiconfig';
import { resolve } from 'path';
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
   * @param name -
   *        The name of the application to load.
   * @param extends -
   *        The extender to expand upon the read configuration.
   * @param paths -
   *        The additional paths to read if cosmic config does not find a valid config.  Remember that these
   *        are paths, not modules in this case, so you can't load things from the node modules directory
   *        using these values.  These only affect the search for the config file, not the actual
   *        read of the config.
   */
  public constructor(public name: string, public extender: IZConfigExtender, public paths: string[] = []) {}

  /**
   * Runs a search for the appropriate configuration file.
   *
   * The extension keyword is deleted from the config.
   *
   * @returns
   *        A promise that resolves with the expanded configuration.
   */
  public async search() {
    const explorer = cosmiconfig(this.name);

    // The first step is the standard cosmiconfig
    // search to see if any of these paths exists.
    // These are highest priority.
    const searched = await explorer.search();

    if (searched) {
      return searched.filepath;
    }

    // Try our additional paths, if any.
    for (const path of this.paths) {
      const full = resolve(path);
      const result = await explorer.load(full).catch(() => null);

      if (result) {
        return result.filepath;
      }
    }

    return null;
  }

  /**
   * Reads the config file.
   *
   * @param config -
   *        The optional configuration file.  If this is null then the cosmiconfig path is searched on the name.
   *
   * @returns
   *        A promise that resolves the json object that represents the config.
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
