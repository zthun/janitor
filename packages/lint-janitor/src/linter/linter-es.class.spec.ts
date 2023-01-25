import { ESLint } from 'eslint';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZLinterEs } from './linter-es.class';

describe('ZLinterEs', () => {
  let files: string[];
  let config: string;
  let successA: ESLint.LintResult;
  let successB: ESLint.LintResult;
  let failedA: ESLint.LintResult;
  let successReport: ESLint.LintResult[];
  let failedReport: ESLint.LintResult[];
  let engine: ESLint;
  let formatter: ESLint.Formatter;
  let logger: Console;

  function createTestTarget() {
    const target = new ZLinterEs(logger);
    target.engineFactory = () => engine;
    return target;
  }

  beforeEach(async () => {
    config = '@zthun/lint-janitor-config/eslint';
    files = ['src/**/*.js'];
    successA = {
      filePath: 'src/index.js',
      messages: [],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      fatalErrorCount: 0,
      usedDeprecatedRules: [],
      suppressedMessages: []
    };

    successB = {
      filePath: 'src/app/app.js',
      messages: [],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      fatalErrorCount: 0,
      usedDeprecatedRules: [],
      suppressedMessages: []
    };

    failedA = {
      filePath: 'src/app/error.js',
      messages: [
        {
          column: 33,
          line: 10,
          ruleId: 'equals',
          message: 'Always use ===',
          nodeType: 'branch',
          severity: 2,
          source: 'file'
        }
      ],
      errorCount: 1,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      fatalErrorCount: 0,
      usedDeprecatedRules: [],
      suppressedMessages: []
    };

    successReport = [successA, successB];

    failedReport = [successA, failedA];

    engine = new ESLint({});
    vi.spyOn(engine, 'lintFiles').mockResolvedValue(successReport);

    logger = {} as any;
    logger.log = vi.fn();

    formatter = await engine.loadFormatter();
    vi.spyOn(engine, 'loadFormatter').mockResolvedValue(formatter);
    vi.spyOn(formatter, 'format');
  });

  describe('Config', () => {
    it('should run the the required options if they are specified.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = require.resolve(config);
      vi.spyOn(target, 'engineFactory');
      // Act
      await target.lint(files, config);
      // Assert
      expect(target.engineFactory).toHaveBeenCalledWith({ useEslintrc: true, overrideConfigFile: expected });
    });

    it('should run with the default configuration options if no config is specified.', async () => {
      // Arrange
      const target = createTestTarget();
      vi.spyOn(target, 'engineFactory');
      // Act
      await target.lint(files, null);
      // Assert
      expect(target.engineFactory).toHaveBeenCalledWith({ useEslintrc: true });
    });
  });

  describe('Linting', () => {
    it('constructs a default engine.', () => {
      // Arrange
      const target = new ZLinterEs(logger);
      // Act
      const actual = target.engineFactory({});
      // Assert
      expect(actual).toBeTruthy();
    });

    it('returns false if an IO exception occurs.', async () => {
      // Arrange
      const target = createTestTarget();
      vi.spyOn(engine, 'lintFiles').mockRejectedValue(new Error('Cannot open file'));
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('returns false if the error count is not 0.', async () => {
      // Arrange
      const target = createTestTarget();
      vi.spyOn(engine, 'lintFiles').mockResolvedValue(failedReport);
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('returns true if the error count is 0.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('displays the formatted output.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(files, config);
      // Assert
      expect(formatter.format).toHaveBeenCalled();
    });
  });
});
