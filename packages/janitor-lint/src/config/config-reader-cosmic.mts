import { cosmiconfig } from "cosmiconfig";

import type { IZConfigDiscovery } from "./config-discovery.mjs";
import type { IZConfigReader } from "./config-reader.mjs";
import { $resolve } from "./config-resolve.mjs";

/**
 * Represents a reader that uses the cosmiconfig standard for files.
 */
export class ZConfigReaderCosmic implements IZConfigReader, IZConfigDiscovery {
  /**
   * Initializes a new instance of this object.
   *
   * @param name -
   *        The name of the application to load.
   */
  public constructor(public name: string) {}

  /**
   * Runs a search for the appropriate configuration file.
   *
   * The extension keyword is deleted from the config.
   *
   * @returns
   *        A promise that resolves with the expanded configuration.
   */
  public async search() {
    const explorer = cosmiconfig(this.name, { searchStrategy: "project" });

    // The first step is the standard cosmiconfig
    // search to see if any of these paths exists.
    // These are highest priority.
    const searched = await explorer.search();
    return searched?.filepath;
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
  public async read(config?: string): Promise<any> {
    const configLoad = config ? Promise.resolve(config) : this.search();
    const configFile = await configLoad;

    if (!configFile) {
      return {};
    }

    const path = $resolve(configFile, { paths: [process.cwd()] });
    const buffer = await cosmiconfig(this.name).load(path);
    return buffer!.config;
  }
}
