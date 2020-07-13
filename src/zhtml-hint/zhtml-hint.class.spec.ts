import { ZHtmlHint } from './zhtml-hint.class';
import { LintResult, RuleSet, HTMLHint } from 'htmlhint';

describe('ZHtmlHint', () => {
  let contentPath: string;
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

    contentPath = '/dev/test.html';
    content = '<html><head></head><body><div>Some HTML</div></body></html>';
    options = {};

    logs = ['Line One', 'Line Two'];

    jest.spyOn(HTMLHint, 'verify').mockImplementation(() => results);
    jest.spyOn(HTMLHint, 'format').mockImplementation(() => logs);
  });

  function createTestTarget() {
    const target = new ZHtmlHint();
    return target;
  }

  it('returns a resolved promise if there are no hint messages.', async () => {
    // Arrange
    const target = createTestTarget();
    jest.spyOn(HTMLHint, 'verify').mockImplementation(() => []);
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
