/* eslint-disable require-jsdoc */
import { lint, LintResult, LinterResult } from 'stylelint';
import { ZStyleLint } from './style-lint.class';

jest.mock('stylelint');

describe('ZStyleLint', () => {
  let logger: Console;
  let lintResult: LinterResult;
  let content: string[];
  let config: string;

  function createTestTarget() {
    return new ZStyleLint(logger);
  }

  beforeEach(() => {
    logger = {} as any;
    logger.log = jest.fn();

    lintResult = {
      errored: false,
      output: '',
      results: []
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
      expect(lint).toHaveBeenCalledWith({ files: content, configFile: expected });
    });

    it('should run with the default configuration options if no config is specified.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(content, null);
      // Assert
      expect(lint).toHaveBeenCalledWith({ files: content });
    });
  });

  describe('Success', () => {
    it('should not log if there are not lint errors.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(content, config);
      // Assert
      expect(logger.log).toHaveBeenCalledWith('');
    });

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
    let rule: LintResult;

    beforeEach(() => {
      rule = {
        source: 'file-ruleA.less',
        errored: true,
        ignored: false,
        warnings: [
          {
            line: 6,
            column: 5,
            rule: 'rule-empty-line-before',
            severity: 'error',
            text: 'Expected empty line before rule'
          }
        ],
        deprecations: [],
        invalidOptionWarnings: []
      };

      lintResult.errored = true;
      lintResult.results = [rule];

      (lint as jest.Mock).mockResolvedValue(lintResult);
    });

    it('should log if the linter errors.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(content, config);
      // Assert
      expect(logger.log).toHaveBeenCalled();
    });

    it('should return false if there are lint failures.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.lint(content, config);
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
