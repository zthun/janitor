import { readFile } from 'fs';
import { sync } from 'glob';
import { IZConfigReader } from '../common/config-reader.interface';
import { IZContentLinter } from './content-linter.interface';
import { ZFileLint } from './file-lint.class';

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

    files = ['/files/log-a.json', '/files/lob-b.json', '/files/log-c.json'];

    (sync as jest.Mock).mockImplementation(() => files);
    ((readFile as unknown) as jest.Mock).mockImplementation((file, op, cb) => cb(null, 'File content'));
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
      ((readFile as unknown) as jest.Mock).mockImplementation((p, o, cb) => cb('Cannot read', null));
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
      const target = createTestTarget();
      // Act
      await target.lint(files, config);
      // Assert
      expect(contentLint.lint).toHaveBeenCalledWith(expect.anything(), expect.anything(), options, config);
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

  describe('Logging', () => {
    let cfg: any;

    beforeEach(() => {
      cfg = {
        errors: 'File is bad'
      };

      (contentLint.lint as any) = jest.fn(() => Promise.reject(cfg.errors));
    });

    async function assertLogged(logs: string[]) {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(files, config);
      // Assert
      logs.forEach((log) => expect(logger.error).toHaveBeenCalledWith(expect.stringContaining(log)));
    }

    it('logs all errors on separate lines if an array is passed.', async () => {
      cfg.errors = ['Bad line one', 'Bad line two', 'Bad line three'];
      await assertLogged(cfg.errors);
    });

    it('logs the error directly if it is not an array.', async () => {
      await assertLogged([cfg.errors]);
    });
  });
});
