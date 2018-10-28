import { ILinterOptions, Linter } from 'tslint';
import { IZTsLinterFactory } from './zts-linter-factory.interface';

/**
 * Represents an object that can construct a Linter object.
 */
export class ZTsLinterFactory implements IZTsLinterFactory {
  private _lintOptions: ILinterOptions;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._lintOptions = {
      fix: false,
    };
  }

  /**
   * Creates the standard linter object.
   * 
   * @param options The options to the linter.
   * 
   * @return The ts linter.
   */
  public create(): Linter {
    return new Linter(this._lintOptions);
  }
}
