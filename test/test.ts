/**
 * This is a valid class.
 */
export class ValidClass {
  /**
   * Gets or sets whether this class is valid.
   */
  public isValid: boolean;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this.isValid = true;
  }

  /**
   * Toggles the valid flag.
   *
   * @returns The valid flag.
   */
  public toggle(): boolean {
    this.isValid = !this.isValid;
    return this.isValid;
  }
}
