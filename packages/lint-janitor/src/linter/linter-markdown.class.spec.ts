import { sync } from 'glob';
import markdownlint, { LintError } from 'markdownlint';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IZConfigReader } from '../config/config-reader.interface';
import { ZLinterMarkdown } from './linter-markdown.class';

vi.mock('markdownlint', () => ({
  default: vi.fn()
}));

vi.mock('glob', () => ({
  sync: vi.fn()
}));

describe('ZLinterMarkdown', () => {
  let logger: Console;
  let config: string;
  let changelog: string;
  let readme: string;
  let files: string[];
  let results: { [key: string]: LintError[] };
  let reader: IZConfigReader;

  function createTestTarget() {
    return new ZLinterMarkdown(logger, reader);
  }

  beforeEach(() => {
    changelog = 'CHANGELOG.md';
    readme = 'README.md';
    config = '@zthun/markdownlint-config';
    files = ['*.md'];

    results = {};
    results[changelog] = [];
    results[readme] = [];

    logger = {} as any;
    logger.error = vi.fn();
    logger.log = vi.fn();

    reader = {} as any;
    reader.read = vi.fn(() => Promise.resolve({}));

    vi.mocked(sync).mockReturnValue([changelog, readme]);
    vi.mocked(markdownlint).mockImplementation((i, cb) => cb(null, results));
  });

  describe('Success', () => {
    it('should return true if no lint errors are present.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Errors', () => {
    let error: LintError;

    beforeEach(() => {
      error = {
        lineNumber: 2,
        ruleNames: ['line-length'],
        ruleDescription: 'Line Length',
        ruleInformation: 'Nope',
        errorDetail: 'Line length too much',
        errorContext: '',
        errorRange: [],
        fixInfo: null
      };
    });

    it('should return false if the config cannot be read.', async () => {
      // Arrange
      const target = createTestTarget();
      reader.read = vi.fn(() => Promise.reject('Failed'));
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('should return false if there are lint errors.', async () => {
      // Arrange
      const target = createTestTarget();
      results[readme] = [error];
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
