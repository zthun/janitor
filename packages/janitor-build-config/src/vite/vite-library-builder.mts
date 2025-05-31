import { cloneDeep } from "lodash-es";
import { LibraryOptions } from "vite";

export class ZViteLibraryBuilder {
  private library: LibraryOptions = {
    entry: {},
    formats: ["es", "cjs"],
  };

  public entry(name: string, path: string) {
    this.library.entry = {
      ...(this.library.entry as Record<string, string>),
      [name]: path,
    };
    return this;
  }

  public build() {
    return cloneDeep(this.library);
  }
}
