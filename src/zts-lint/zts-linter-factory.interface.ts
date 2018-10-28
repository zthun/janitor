import { Linter } from 'tslint';

/**
 * Represents a factory to construct the ts linter.
 */
export interface IZTsLinterFactory {
  /**
   * Creates linter options.
   * 
   * @return The linter used to lint ts files.
   */
  create(): Linter;
}
