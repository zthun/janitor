import { load } from "js-yaml";
import type { IZContentLinter } from "./content-linter.mjs";

/**
 * Represents a linter for yml files.
 */
export class ZContentLinterYaml implements IZContentLinter {
  /**
   * Lints yml files.
   *
   * @param contents -
   *        Yaml formatted string.
   *
   * @returns
   *        A promise that resolves if successful, or rejects if failed.
   */
  public async lint(contents: string): Promise<unknown> {
    await Promise.resolve();
    return load(contents);
  }
}
