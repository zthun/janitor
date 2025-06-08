import { cloneDeep } from "lodash-es";
import type { LibraryOptions } from "vite";

/**
 * A builder for Vite library configurations.
 */
export class ZViteLibraryBuilder {
  private library: LibraryOptions = {
    entry: {},
    formats: ["es", "cjs"],
  };

  /**
   * Adds an entry point to the library.
   *
   * @param name -
   *        The name of the entry point.
   * @param path -
   *        The path to the entry point file.
   *
   * @returns
   *        This object.
   */
  public entry(name: string, path: string) {
    this.library.entry = {
      ...(this.library.entry as Record<string, string>),
      [name]: path,
    };
    return this;
  }

  /**
   * A shorthand for adding an entry point
   * named "index" that points to "src/index.ts"
   *
   * @returns
   *        This object.
   */
  public index() {
    return this.entry("index", "./src/index.mts");
  }

  /**
   * Returns the built library configuration.
   *
   * @returns
   *        A deep clone of the library configuration.
   */
  public build() {
    return cloneDeep(this.library);
  }
}
