import stylelint from 'stylelint';
import { ZLinterStyle } from './linter-style.mjs';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { $resolve } from '../config/config-resolve.mjs';

vi.mock('stylelint', () => ({
  default: {
    lint: vi.fn(),
    formatters: {
      verbose: vi.fn()
    }
  }
}));

describe('ZLinterStyle', () => {
  let logger: Console;
  let lintResult: stylelint.LinterResult;
  let content: string[];
  let config: string;

  function createTestTarget() {
    return new ZLinterStyle(logger);
  }

  beforeEach(() => {
    logger = {} as any;
    logger.log = vi.fn();

    lintResult = {
      errored: false,
      output: '',
      cwd: '',
      report: '',
      reportedDisables: null,
      results: [],
      ruleMetadata: {}
    };

    content = ['fileA.less', 'fileB.css'];
    config = '@zthun/stylelint-config';

    vi.mocked(stylelint.lint).mockClear();
    vi.mocked(stylelint.lint).mockResolvedValue(lintResult);
  });

  describe('Config', () => {
    it('should run the the required options if they are specified.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = $resolve(config);
      // Act
      await target.lint(content, config);
      // Assert
      expect(stylelint.lint).toHaveBeenCalledWith({ files: content, configFile: expected });
    });

    it('should run with the default configuration options if no config is specified.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(content, null);
      // Assert
      expect(stylelint.lint).toHaveBeenCalledWith({ files: content });
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
    let rule: stylelint.LintResult;

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
        invalidOptionWarnings: [],
        parseErrors: []
      };

      lintResult.errored = true;
      lintResult.results = [rule];

      vi.mocked(stylelint.lint).mockResolvedValue(lintResult);
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
