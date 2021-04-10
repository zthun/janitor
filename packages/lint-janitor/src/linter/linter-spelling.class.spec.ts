/* eslint-disable require-jsdoc */
import { Emitters, Issue, lint, RunResult } from 'cspell';
import { ZLinterSpelling } from './linter-spelling.class';

jest.mock('cspell');

describe('ZLinterSpelling', () => {
  let logger: Console;
  let lintResult: RunResult;
  let content: string[];
  let config: string;

  function createTestTarget() {
    return new ZLinterSpelling(logger);
  }

  beforeEach(() => {
    logger = {} as any;
    logger.log = jest.fn();

    lintResult = {
      errors: 0,
      files: 5,
      filesWithIssues: new Set<string>(),
      issues: 0
    };

    content = ['fileA.less', 'fileB.css'];
    config = '@zthun/stylelint-config';

    (lint as jest.Mock).mockClear();
    (lint as jest.Mock).mockResolvedValue(lintResult);
  });

  describe('Config', () => {
    it('should run the the required options if they are specified.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = require.resolve(config);
      // Act
      await target.lint(content, config);
      // Assert
      expect(lint).toHaveBeenCalledWith(content, { config: expected }, expect.anything());
    });

    it('should run with the default configuration options if no config is specified.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(content, null);
      // Assert
      expect(lint).toHaveBeenCalledWith(content, {}, expect.anything());
    });
  });

  describe('Success', () => {
    it('should return true if there are no lint failures.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.lint(content, config);
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Failure.', () => {
    let issue: Issue;

    beforeEach(() => {
      issue = {
        text: 'foo',
        doc: null,
        line: null,
        offset: 5,
        context: null,
        row: 10,
        col: 5,
        uri: '/path/to/file/with/issue'
      };

      (lint as jest.Mock).mockImplementation((_, __, e: Emitters) => {
        e.issue(issue);
        return Promise.resolve(lintResult);
      });
    });

    async function assertLintFailure(issues: number, errors: number) {
      // Arrange
      lintResult.issues = issues;
      lintResult.errors = errors;
      const target = createTestTarget();
      // Act
      const actual = await target.lint(content, config);
      // Assert
      expect(actual).toBeFalsy();
    }

    it('should log if the linter errors.', async () => {
      // Arrange
      lintResult.issues = 1;
      const target = createTestTarget();
      // Act
      await target.lint(content, config);
      // Assert
      expect(logger.log).toHaveBeenCalledWith(expect.stringContaining(issue.uri));
    });

    it('should return false if there are lint issues.', async () => {
      assertLintFailure(1, 0);
    });

    it('should return false if there are lint errors.', async () => {
      assertLintFailure(0, 1);
    });
  });
});
