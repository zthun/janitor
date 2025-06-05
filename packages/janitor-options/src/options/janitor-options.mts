import { IZJanitorOptionsLint } from "./janitor-options-lint.mjs";

/**
 * Options for the zthunworks janitor system.
 */
export interface IZJanitorOptions {
  /**
   * Linting options for janitor-lint.
   */
  lint?: IZJanitorOptionsLint;
}

/**
 * A builder for creating janitor options.
 */
export class ZJanitorOptionsBuilder {
  private options: IZJanitorOptions = {};

  /**
   * Sets the linting options for the janitor system.
   *
   * @param lint -
   *        The linting options to set.
   *
   * @returns
   *        This object.
   */
  public lint(lint: IZJanitorOptionsLint): ZJanitorOptionsBuilder {
    this.options.lint = lint;
    return this;
  }

  /**
   * Builds the options object.
   *
   * @returns
   *       A clone of the current options object.
   */
  public build(): IZJanitorOptions {
    return structuredClone(this.options);
  }
}
