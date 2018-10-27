import * as fs from 'fs';
import * as G from 'glob';
import { ZJsonLint } from './zjsonlint.class';

jest.mock('glob');
jest.mock('fs');

describe('ZJsonLint', () => {
  let files: string[];
  let fileJson: any;
  let fileContents: string;
  let fileContentsBad: string;
  let logger: Console;

  beforeEach(() => {
    logger = {} as Console;
    logger.error = jest.fn();
    logger.log = jest.fn();

    fileJson = {
      keyA: 'key-a',
      keyB: 'key-b'
    };

    fileContents = JSON.stringify(fileJson);
    fileContentsBad = 'This is not valid json';

    files = [
      '/files/log-a.json',
      '/files/lob-b.json',
      '/files/log-c.json'
    ];

    (fs.readFile as any) = jest.fn((path, op, cb) => cb(null, fileContents));
    (G.sync as any) = jest.fn(() => files);
  });

  function createTestTarget() {
    return new ZJsonLint(logger);
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

  it('returns false if any file contains bad json.', async () => {
    // Arrange
    const target = createTestTarget();
    (fs.readFile as any) = jest.fn((path, op, cb) => cb(null, 'This is not valid json'));
    // Act
    const actual = await target.lint(files);
    // Assert
    expect(actual).toBeFalsy();
  });
});
