/* eslint-disable require-jsdoc */
import { HTMLHint } from 'htmlhint';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZContentLinterHtml } from './content-linter-html.class';

describe('ZContentLinterHtml', () => {
  let contentPath: string;
  let content: string;
  let options: any;
  let resultA: any;
  let resultB: any;
  let results: any[];
  let logs: string[];

  beforeEach(() => {
    resultA = {};
    resultB = {};
    results = [resultA, resultB];

    contentPath = '/dev/test.html';
    content = '<html><head></head><body><div>Some HTML</div></body></html>';
    options = {};

    logs = ['Line One', 'Line Two'];

    vi.spyOn(HTMLHint, 'verify').mockImplementation(() => results);
    vi.spyOn(HTMLHint, 'format').mockImplementation(() => logs);
  });

  function createTestTarget() {
    const target = new ZContentLinterHtml();
    return target;
  }

  it('returns a resolved promise if there are no hint messages.', async () => {
    // Arrange
    const target = createTestTarget();
    vi.spyOn(HTMLHint, 'verify').mockImplementation(() => []);
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
