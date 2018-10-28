import { Linter, LintResult } from 'tslint';
import { RawConfigFile } from 'tslint/lib/configuration';
import { ZTsLint } from './zts-lint.class';
import { IZTsLinterFactory } from './zts-linter-factory.interface';

describe('ZTsLint', () => {
  let result: LintResult;
  let content: string;
  let options: RawConfigFile;
  let linter: Linter;
  let linterFactory: IZTsLinterFactory;

  function createTestTarget() {
    return new ZTsLint(linterFactory);
  }

  beforeEach(() => {
    content = 'function getNull() { return null; }';

    result = {
      errorCount: 0,
      warningCount: 0,
      output: 'Some output'
    } as LintResult;

    options = {
      extends: 'tslint:recommended'      
    };

    linter = {} as Linter;
    linter.lint = jest.fn();
    linter.getResult = jest.fn(() => result);

    linterFactory = {} as any;
    linterFactory.create = jest.fn(() => linter);
  });

  it('returns a resolved promise if the linting is successful.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint(content, options)).resolves.toBeTruthy();
  });

  it('returns a rejected promise if there are warnings.', async () => {
    // Arrange
    const target = createTestTarget();
    result.warningCount = 5;
    // Act
    // Assert
    await expect(target.lint(content, options)).rejects.toEqual(result.output);
  });

  it('returns a rejected promise if there are errors.', async () => {
    // Arrange
    const target = createTestTarget();
    result.errorCount = 4;
    // Act
    // Assert
    await expect(target.lint(content, options)).rejects.toEqual(result.output);
  });
});
