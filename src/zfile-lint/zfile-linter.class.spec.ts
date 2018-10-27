import * as fs from 'fs';
import { IZFileContentLinter } from './zfile-content-linter.interface';
import { ZFileLinter } from './zfile-linter.class';

jest.mock('fs');

describe('ZJsonLint', () => {
  let file: string;
  let fileContentsLinter: IZFileContentLinter;
  let fileContents: string;

  beforeEach(() => {
    file = './file/abc.txt';
    fileContents = 'File contents';

    fileContentsLinter = {} as any;
    fileContentsLinter.lint = jest.fn(() => Promise.resolve(true));

    (fs.readFile as any) = jest.fn((path, op, cb) => cb(null, fileContents));
  });

  function createTestTarget() {
    return new ZFileLinter(fileContentsLinter);
  }

  it('returns a resolved promise if the linting succeeds.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(target.lint(file)).resolves.toBeTruthy();
  });

  it('returns a rejected promise if the file read fails.', () => {
    // Arrange
    const target = createTestTarget();
    (fs.readFile as any) = jest.fn((path, op, cb) => cb('Cannot read file', null));
    // Act
    // Assert
    expect(target.lint(file)).rejects.toBeTruthy();
  });

  it('returns a rejected promise if the lint fails.', async () => {
    // Arrange
    const target = createTestTarget();
    (fileContentsLinter.lint as any) = jest.fn(() => Promise.reject('lint failed'));
    // Act
    // Assert
    expect(target.lint(file)).rejects.toBeTruthy();
  });
});
