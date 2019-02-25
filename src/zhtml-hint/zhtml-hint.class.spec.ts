import * as hint from 'htmlhint';
import { ZHtmlHint } from './zhtml-hint.class';

describe('ZHtmlHint', () => {
  let contentPath: string;
  let content: string;
  let options: hint.RuleSet;
  let resultA: hint.LintResult;
  let resultB: hint.LintResult;
  let results: hint.LintResult[];
  let logs: string[];

  beforeEach(() => {
    resultA = {} as hint.LintResult;
    resultB = {} as hint.LintResult;
    results = [resultA, resultB];

    contentPath = '/dev/test.html';
    content = '<html><head></head><body><div>Some HTML</div></body></html>';
    options = {};

    logs = ['Line One', 'Line Two'];

    jest.spyOn((hint as any).default, 'verify').mockImplementation(() => results);
    jest.spyOn((hint as any).default, 'format').mockImplementation(() => logs);
  });

  function createTestTarget() {
    const target = new ZHtmlHint();
    return target;
  }

  it('returns a resolved promise if there are no hint messages.', async () => {
    // Arrange
    const target = createTestTarget();
    jest.spyOn((hint as any).default, 'verify').mockImplementation(() => []);
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options)).resolves.toBeTruthy();
  });

  it('returns a rejected promise with the logs if there are hint messages.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options)).rejects.toEqual(logs);
  });
});
