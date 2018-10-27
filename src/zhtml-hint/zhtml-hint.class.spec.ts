import { HTMLHint, LintResult, RuleSet } from 'htmlhint';
import { ZHtmlHint } from './zhtml-hint.class';

jest.mock('htmlhint');

describe('ZHtmlHint', () => {
  let content: string;
  let options: RuleSet;
  let resultA: LintResult;
  let resultB: LintResult;
  let results: LintResult[];
  let logs: string[];

  beforeEach(() => {
    resultA = {} as LintResult;
    resultB = {} as LintResult;
    results = [resultA, resultB];

    content = '<html><head></head><body><div>Some HTML</div></body></html>';
    options = {};

    logs = ['Line One', 'Line Two'];

    HTMLHint.verify = jest.fn(() => results);
    HTMLHint.format = jest.fn(() => logs);
  });

  function createTestTarget() {
    return new ZHtmlHint();
  }

  it('returns a resolved promise if there are no hint messages.', async () => {
    // Arrange
    const target = createTestTarget();
    HTMLHint.verify = jest.fn(() => []);
    // Act
    // Assert
    await expect(target.lint(content, options)).resolves.toBeTruthy();
  });

  it('returns a rejected promise with the logs if there are hint messages.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint(content, options)).rejects.toEqual(logs);
  });

});
