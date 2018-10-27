import * as fs from 'fs';
import * as G from 'glob';
import { IZConfigReader } from '../zlint-config/zconfig-reader.interface';
import { IZContentLinter } from './zcontent-linter.interface';
import { ZFileLint } from './zfile-lint.class';

jest.mock('glob');
jest.mock('fs');

describe('ZJsonLint', () => {
  let files: string[];
  let config: string;
  let options: any;
  let contentLint: IZContentLinter;
  let configReader: IZConfigReader;
  let logger: Console;

  beforeEach(() => {
    config = 'config.json';

    options = {
      key: 'value'
    };

    logger = {} as Console;
    logger.error = jest.fn();
    logger.log = jest.fn();

    configReader = {} as any;
    configReader.read = jest.fn(() => Promise.resolve(options));

    contentLint = {} as any;
    contentLint.lint = jest.fn(() => Promise.resolve(true));

    files = [
      '/files/log-a.json',
      '/files/lob-b.json',
      '/files/log-c.json'
    ];

    (G.sync as any) = jest.fn(() => files);
    (fs.readFile as any) = jest.fn((file, op, cb) => cb(null, 'File content')); 
  });

  function createTestTarget() {
    return new ZFileLint(contentLint, configReader, logger, 'generic');
  }

  describe('Without config', () => {
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
      contentLint.lint = jest.fn(() => Promise.reject('failed'));
      // Act
      const actual = await target.lint(files);
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('With config', () => {
    it('returns true if all files pass.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('reads the config and passes it to the content linter.', async () => {
      // Arrange
      const targget = createTestTarget();
      // Act
      await targget.lint(files, config);
      // Assert
      expect(contentLint.lint).toHaveBeenCalledWith(expect.anything(), options);
    });

    it('returns false if the config cannot be read.', async () => {
      // Arrange
      const target = createTestTarget();
      (configReader.read as any) = jest.fn(() => Promise.reject('Cannot read file'));
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
