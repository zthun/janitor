import { IZConfigExtender } from './config-extender.interface';

/**
 * Represents the standard extender.
 *
 * This extender works the same as how eslint extends their
 * configuration.  You can pass a key that acts as the extends key which holds paths
 * to the extendable files/modules. Note that this class, unlike eslint, does not assume any naming
 * conventions and ONLY shared configurations are supported.  You must pass the full path of the
 * configs when extending, and plugin based syntax is not recognized.
 *
 * It is always better to just use the extension methods of the actual
 * applications if those are available, but this can be used as a fallback or an
 * extension of behavior for child linters that do not support extendable configs.
 */
export class ZConfigExtender implements IZConfigExtender {
  /**
   * Initializes a new instance of this object.
   *
   * @param key The key to extend.
   */
  public constructor(public key = 'extends') {}

  /**
   * Extends the configuration value.
   *
   * This is similar to how eslint works.  This will do an
   * asynchronous require on each configuration under the key in the
   * config.  If the key in the config is falsy, then the config is returned.
   *
   * The actual key in the config is deleted.
   *
   * @param config The config to extend.
   *
   * @returns A promise that resolves the extended configuration.
   */
  public async extend(config: any): Promise<any> {
    if (!Object.hasOwnProperty.call(config, this.key)) {
      return config;
    }

    const extensions = config[this.key];
    const modules = Array.isArray(extensions) ? extensions : [extensions];
    const resolved = await Promise.all(modules.map((m) => this._read(m)));
    let updated = resolved.reduce((last, current) => Object.assign({}, last, current), {});
    updated = Object.assign({}, updated, config);
    delete updated[this.key];
    return updated;
  }

  /**
   * Reads a module recursively.
   *
   * @param module The module to read.
   *
   * @returns A promise that resolves the extended inner module.
   */
  private _read(module: string) {
    return Promise.resolve(true)
      .then(() => require(module))
      .then((data) => this.extend(data));
  }
}
