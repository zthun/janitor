import * as fs from 'fs';
import * as G from 'glob';
import { IZContentLinter } from './zcontent-linter.interface';
import { ZFileLint } from './zfile-lint.class';

jest.mock('glob');
jest.mock('fs');

describe('ZJsonLint', () => {
  let files: string[];
  let contentlint: IZContentLinter;
  let logger: Console;

  beforeEach(() => {
    logger = {} as Console;
    logger.error = jest.fn();
    logger.log = jest.fn();

    contentlint = {} as any;
    contentlint.lint = jest.fn(() => Promise.resolve(true));

    files = [
      '/files/log-a.json',
      '/files/lob-b.json',
      '/files/log-c.json'
    ];

    (G.sync as any) = jest.fn(() => files);
    (fs.readFile as any) = jest.fn((file, op, cb) => cb(null, 'File content')); 
  });

  function createTestTarget() {
    return new ZFileLint(contentlint, logger, 'generic');
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

  it('returns false if any file cannot be read.', async () => {
    // Arrange
    const target = createTestTarget();
    (fs.readFile as any) = jest.fn((p, o, cb) => cb('Cannot read', null));
    // Act
    const actual = await target.lint(files);
    // Assert
    expect(actual).toBeFalsy();
  });

  it('returns false if any file fail the lint.', async () => {
    // Arrange
    const target = createTestTarget();
    contentlint.lint = jest.fn(() => Promise.reject('failed'));
    // Act
    const actual = await target.lint(files);
    // Assert
    expect(actual).toBeFalsy();
  });
});
