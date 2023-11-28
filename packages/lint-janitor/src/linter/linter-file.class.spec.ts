import { PathOrFileDescriptor, readFile } from 'fs';
import { sync } from 'glob';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IZConfigReader } from '../config/config-reader.mjs';
import { IZContentLinter } from '../content/content-linter.mjs';
import { ZLinterFile } from './linter-file.mjs';

vi.mock('glob', () => ({
  sync: vi.fn()
}));

vi.mock('fs', () => ({
  readFile: vi.fn()
}));

function readFileMock(_: PathOrFileDescriptor, __: BufferEncoding, cb: any): void {
  cb(null, 'FileContent');
}

type ReadFile = typeof readFileMock;

describe('ZLinterFile', () => {
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
    logger.error = vi.fn();
    logger.log = vi.fn();

    configReader = {} as any;
    configReader.read = vi.fn(() => Promise.resolve(options));

    contentLint = {} as any;
    contentLint.lint = vi.fn(() => Promise.resolve(true));

    files = ['/files/log-a.json', '/files/lob-b.json', '/files/log-c.json'];

    vi.mocked(sync).mockImplementation(() => files);
    vi.mocked<ReadFile>(readFile).mockImplementation(readFileMock);
  });

  function createTestTarget() {
    return new ZLinterFile(contentLint, configReader, logger, 'generic');
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
      vi.mocked<ReadFile>(readFile).mockImplementation((p, o, cb) => cb('Cannot read', null));
      // Act
      const actual = await target.lint(files);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('returns false if any file fail the lint.', async () => {
      // Arrange
      const target = createTestTarget();
      contentLint.lint = vi.fn(() => Promise.reject('failed'));
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
      (configReader.read as any) = vi.fn(() => Promise.reject('Cannot read file'));
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

      (contentLint.lint as any) = vi.fn(() => Promise.reject(cfg.errors));
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
