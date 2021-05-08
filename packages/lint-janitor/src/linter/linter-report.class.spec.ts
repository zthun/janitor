/* eslint-disable require-jsdoc */
import { sync } from 'glob';
import { IZLinter } from './linter.interface';
import { ZLinterReport } from './linter-report.class';

jest.mock('glob');

describe('ZLinterReport', () => {
  let files: string[];
  let config: string;
  let child: IZLinter;
  let logger: Console;

  beforeEach(() => {
    config = 'config.json';

    logger = {} as Console;
    logger.log = jest.fn();

    child = {} as any;
    child.lint = jest.fn(() => Promise.resolve(true));

    files = ['/files/log-a.json', '/files/lob-b.json', '/files/log-c.json'];

    (sync as jest.Mock).mockImplementation(() => files);
  });

  function createTestTarget() {
    return new ZLinterReport(child, logger, 'generic');
  }

  it('lints through the child linter.', async () => {
    // Arrange
    const src = ['file-a.js', 'file-b.js'];
    const target = createTestTarget();
    // Act
    await target.lint(src);
    // Assert
    expect(child.lint).toHaveBeenCalledWith(src, undefined, undefined);
  });

  it('logs the total number of files.', async () => {
    // Arrange
    const src = ['file-a.js', 'file-b.js'];
    const target = createTestTarget();
    // Act
    await target.lint(src, config);
    // Assert
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining(`${files.length}`));
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
