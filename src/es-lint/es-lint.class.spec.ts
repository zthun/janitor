/* eslint-disable require-jsdoc */
import { ESLint } from 'eslint';
import { resolve } from 'path';
import { ZEsLint } from './es-lint.class';

describe('ZEsLint', () => {
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
    const target = new ZEsLint(logger);
    target.engineFactory = () => engine;
    return target;
  }

  beforeEach(async () => {
    config = resolve(__dirname, '../../lint/.eslintrc');
    files = ['src/**/*.js'];
    successA = {
      filePath: 'src/index.js',
      messages: [],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      usedDeprecatedRules: []
    };

    successB = {
      filePath: 'src/app/app.js',
      messages: [],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      usedDeprecatedRules: []
    };

    failedA = {
      filePath: 'src/app/error.js',
      messages: [
        {
          column: 33,
          line: 10,
          ruleId: 'eqeqeq',
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
      usedDeprecatedRules: []
    };

    successReport = [successA, successB];

    failedReport = [successA, failedA];

    engine = new ESLint({});
    jest.spyOn(engine, 'lintFiles').mockResolvedValue(successReport);

    logger = {} as any;
    logger.log = jest.fn();

    formatter = await engine.loadFormatter();
    jest.spyOn(engine, 'loadFormatter').mockResolvedValue(formatter);
    jest.spyOn(formatter, 'format');
  });

  describe('Linting', () => {
    it('constructs a default engine.', () => {
      // Arrange
      const target = new ZEsLint(logger);
      // Act
      const actual = target.engineFactory({});
      // Assert
      expect(actual).toBeTruthy();
    });

    it('returns false if an IO exception occurs.', async () => {
      // Arrange
      const target = createTestTarget();
      jest.spyOn(engine, 'lintFiles').mockRejectedValue(new Error('Cannot open file'));
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('returns false if the error count is not 0.', async () => {
      // Arrange
      const target = createTestTarget();
      jest.spyOn(engine, 'lintFiles').mockResolvedValue(failedReport);
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
