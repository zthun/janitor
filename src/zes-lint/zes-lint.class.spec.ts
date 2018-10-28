import { CLIEngine } from 'eslint';
import { resolve } from 'path';
import { IZEsLintEngineFactory } from './zes-lint-engine-factory.interface';
import { ZEsLint } from './zes-lint.class';

describe('ZEsLint', () => {
  let files: string[];
  let config: string;
  let successA: CLIEngine.LintResult;
  let successB: CLIEngine.LintResult;
  let failedA: CLIEngine.LintResult;
  let successReport: CLIEngine.LintReport;
  let failedReport: CLIEngine.LintReport;
  let formatter: () => void;
  let engine: CLIEngine;
  let factory: IZEsLintEngineFactory;
  let logger: Console;

  function createTestTarget() {
    return new ZEsLint(factory, logger);
  }

  beforeEach(() => {
    config = resolve(__dirname, '../../lint/.eslintrc');
    files = ['src/**/*.js'];
    successA = {
      filePath: 'src/index.js',
      messages: [],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0
    };

    successB = {
      filePath: 'src/app/app.js',
      messages: [],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0
    };

    failedA = {
      filePath: 'src/app/error.js',
      messages: [{
        column: 33,
        line: 10,
        ruleId: 'eqeqeq',
        message: 'Always use ===',
        nodeType: 'branch',
        severity: 2,
        source: 'file'
      }],
      errorCount: 1,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0
    };

    successReport = {
      results: [successA, successB],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0
    };

    failedReport = {
      results: [successA, failedA],
      errorCount: 1,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0
    };

    formatter = jest.fn();

    engine = new CLIEngine({});
    jest.spyOn(engine, 'executeOnFiles').mockImplementation(() => successReport);
    jest.spyOn(engine, 'getFormatter').mockImplementation(() => formatter);

    logger = {} as any;
    logger.log = jest.fn();

    factory = {} as any;
    factory.create = jest.fn(() => engine);
  });

  describe('Configuration', () => {
    it('uses the supplied configuration.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(files, config);
      // Assert
      expect(factory.create).toHaveBeenCalledWith(expect.objectContaining({ configFile: config }));
    });
  });

  describe('Linting', () => {
    it('returns false if an IO exception occurs.', async () => {
      // Arrange
      const target = createTestTarget();
      (engine.executeOnFiles as any).mockImplementation(() => { throw new Error('Cannot open file.'); });
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('returns false if the error count is not 0.', async () => {
      // Arrange
      const target = createTestTarget();
      jest.spyOn(engine, 'executeOnFiles').mockImplementation(() => failedReport);
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
      expect(formatter).toHaveBeenCalled();
    });
  });
});
