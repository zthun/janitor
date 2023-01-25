import { Options, resolveConfig, ResolveConfigOptions } from 'prettier';
import { IZConfigReader } from './config-reader.interface';

/**
 * Represents a configuration reader for prettier.
 */
export class ZConfigReaderPrettier implements IZConfigReader {
  /**
   * Reads the configuration file.
   *
   * @param config -
   *        The config module to load.  If this value is falsy,
   *        then prettier will be used to retrieve the configuration.
   *
   * @returns
   *        The options for the config file.
   */
  public async read(config: string): Promise<Options> {
    const cwd = process.cwd();
    const configFile = config ? require.resolve(config, { paths: [cwd] }) : null;
    const ops: ResolveConfigOptions = { config: configFile };
    const options = await resolveConfig(process.cwd(), ops);

    if (!options) {
      return Promise.reject(new Error('Could not find a valid configuration.'));
    }

    return options;
  }
}
