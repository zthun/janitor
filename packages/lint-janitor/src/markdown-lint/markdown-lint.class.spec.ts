/* eslint-disable require-jsdoc */
import { ZMarkdownLint } from './markdown-lint.class';
import { IZConfigReader } from '../common/config-reader.interface';
import markdownlint, { LintError } from 'markdownlint';
import { sync } from 'glob';

jest.mock('markdownlint');
jest.mock('glob');

describe('ZMarkdownLint', () => {
  let logger: Console;
  let config: string;
  let changelog: string;
  let readme: string;
  let files: string[];
  let results: { [key: string]: LintError[] };
  let reader: IZConfigReader;

  function createTestTarget() {
    return new ZMarkdownLint(logger, reader);
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
    logger.error = jest.fn();
    logger.log = jest.fn();

    reader = {} as any;
    reader.read = jest.fn(() => Promise.resolve({}));

    ((sync as unknown) as jest.Mock).mockReturnValue([changelog, readme]);
    ((markdownlint as unknown) as jest.Mock).mockImplementation((i, cb) => cb(null, results));
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
      reader.read = jest.fn(() => Promise.reject('Failed'));
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
