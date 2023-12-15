import { Options, resolveConfig, ResolveConfigOptions } from 'prettier';
import { IZConfigReader } from './config-reader.mjs';
import { $resolve } from './config-resolve.mjs';
import { resolve } from 'path';

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
    const configFile = config ? $resolve(config, { paths: [cwd] }) : null;
    const ops: ResolveConfigOptions = { config: configFile };
    // This function seems to have a slight issue in that it needs one directory deeper than
    // the directory you want to start the search in.  The documentation on this isn't exactly correct,
    // and it was this change, https://github.com/prettier/prettier/pull/15363/files#diff-6569a6bfe16237da3c47f035a6f3325a79e958507cf866a1bd703ae9210129b3,
    // that broke it.
    const options = await resolveConfig(resolve(process.cwd(), 'some-prettier-config'), ops);

    if (!options) {
      return Promise.reject(new Error('Could not find a valid configuration.'));
    }

    return options;
  }
}
