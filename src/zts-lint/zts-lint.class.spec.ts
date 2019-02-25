import { Linter, LintResult } from 'tslint';
import { RawConfigFile } from 'tslint/lib/configuration';
import { ZTsLint } from './zts-lint.class';

describe('ZTsLint', () => {
  let result: LintResult;
  let content: string;
  let contentPath: string;
  let options: RawConfigFile;
  let optionsPath: string;
  let linter: Linter;

  function createTestTarget() {
    const target = new ZTsLint();
    target.linter = linter;
    return target;
  }

  beforeEach(() => {
    contentPath = '/dev/test.ts';
    content = 'function getNull() { return null; }';

    result = {
      errorCount: 0,
      warningCount: 0,
      output: 'Some output'
    } as LintResult;

    optionsPath = '/dev/tslint.json';
    options = {
      extends: 'tslint:recommended'
    };

    linter = {} as Linter;
    linter.lint = jest.fn();
    linter.getResult = jest.fn(() => result);
  });

  it('returns a resolved promise if the linting is successful.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options, optionsPath)).resolves.toBeTruthy();
  });

  it('returns a rejected promise if there are warnings.', async () => {
    // Arrange
    const target = createTestTarget();
    result.warningCount = 5;
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options, optionsPath)).rejects.toEqual(result.output);
  });

  it('returns a rejected promise if there are errors.', async () => {
    // Arrange
    const target = createTestTarget();
    result.errorCount = 4;
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options, optionsPath)).rejects.toEqual(result.output);
  });
});
