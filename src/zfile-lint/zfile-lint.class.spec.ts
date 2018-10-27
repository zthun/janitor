import * as G from 'glob';
import { ZFileLint } from './zfile-lint.class';
import { IZFileLinter } from './zfile-linter.interface';

jest.mock('glob');
jest.mock('fs');

describe('ZJsonLint', () => {
  let files: string[];
  let filelint: IZFileLinter;
  let logger: Console;

  beforeEach(() => {
    logger = {} as Console;
    logger.error = jest.fn();
    logger.log = jest.fn();

    filelint = {} as any;
    filelint.lint = jest.fn(() => Promise.resolve(true));

    files = [
      '/files/log-a.json',
      '/files/lob-b.json',
      '/files/log-c.json'
    ];
    (G.sync as any) = jest.fn(() => files);
  });

  function createTestTarget() {
    return new ZFileLint(filelint, logger, 'generic');
  }

  it('returns true if there are no files.', async () => {
    // Arrange
    const target = createTestTarget();
    files = [];
    // Act
    const actual = await target.lint(files);
    // Assert
    expect(actual).toBeTruthy();
  });

  it('returns true if all files pass.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.lint(files);
    // Assert
    expect(actual).toBeTruthy();
  });

  it('returns false if any file fail the lint.', async () => {
    // Arrange
    const target = createTestTarget();
    filelint.lint = jest.fn(() => Promise.reject('failed'));
    // Act
    const actual = await target.lint(files);
    // Assert
    expect(actual).toBeFalsy();
  });
});
