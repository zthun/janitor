import { readFile } from 'fs';
import { promisify } from 'util';

import { IZFileContentLinter } from './zfile-content-linter.interface';
import { IZFileLinter } from './zfile-linter.interface';

/**
 * Represents an object that can be used to lint the contents of a single file.
 */
export class ZFileLinter implements IZFileLinter {
  /**
   * Initializes a new instance of this object.
   * 
   * @param content The content linter.
   */
  public constructor(private contentlint: IZFileContentLinter) {}

  /**
   * Lints the individual file.
   * 
   * @param file The path to the file to lint.
   * @param encoding The file encoding.
   * 
   * @return A promise that resolves if the linting is successful, and rejects if the linting is not.
   */
  public async lint(file: string): Promise<any> {
    const pread = promisify(readFile);
    const content = await pread(file, 'utf-8');
    return await this.contentlint.lint(content);
  }
}
