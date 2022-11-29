/* eslint-disable require-jsdoc */
import { sync } from 'glob';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZLinterReport } from './linter-report.class';
import { IZLinter } from './linter.interface';

vi.mock('glob', () => ({
  sync: vi.fn()
}));

describe('ZLinterReport', () => {
  let expanded: string[];
  let config: string;
  let child: IZLinter;
  let logger: Console;

  beforeEach(() => {
    config = 'config.json';

    logger = {} as Console;
    logger.log = vi.fn();

    child = {} as any;
    child.lint = vi.fn(() => Promise.resolve(true));

    expanded = ['/files/log-a.json', '/files/lob-b.json', '/files/log-c.json'];

    vi.mocked(sync).mockReturnValue(expanded);
  });

  afterEach(() => {
    vi.mocked(sync).mockReset();
  });

  function createTestTarget() {
    return new ZLinterReport(child, logger, 'generic');
  }

  it('lints through the child linter.', async () => {
    // Arrange
    const src = ['*.json', '**/*.json'];
    const target = createTestTarget();
    // Act
    await target.lint(src);
    // Assert
    expect(child.lint).toHaveBeenCalledWith(src, undefined, undefined);
  });

  it('logs the total number of distinct files.', async () => {
    // Arrange
    const src = ['*.json', '**/*.json'];
    const target = createTestTarget();
    // Act
    await target.lint(src, config);
    // Assert
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining(`${expanded.length}`));
  });

  it('returns true if there are no files to lint.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.lint([], config);
    // Assert
    expect(actual).toBeTruthy();
  });
});
