import { check, FileInfoResult, getFileInfo, Options } from 'prettier';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZContentLinterPretty } from './content-linter-pretty.class';

vi.mock('prettier', () => ({
  getFileInfo: vi.fn(),
  check: vi.fn()
}));

describe('ZContentLinterPretty', () => {
  let options: Options;
  let info: FileInfoResult;
  let contentPath: string;
  let content: string;

  beforeEach(() => {
    contentPath = '/dev/test.json';
    content = '{ "key": "value" }';

    info = {
      ignored: false,
      inferredParser: 'json'
    };

    options = {};

    vi.mocked(getFileInfo).mockClear();
    vi.mocked(getFileInfo).mockResolvedValue(info);

    vi.mocked(check).mockClear();
    vi.mocked(check).mockReturnValue(true);
  });

  function createTestTarget() {
    return new ZContentLinterPretty();
  }

  it('returns a resolved promise if the content is formatted.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options)).resolves.toBeTruthy();
  });

  it('returns a rejected promise if the content is unformatted.', async () => {
    // Arrange
    const target = createTestTarget();
    vi.mocked(check).mockReturnValue(false);
    // Act
    // Assert
    await expect(target.lint(content, contentPath, options)).rejects.toBeTruthy();
  });

  it('checks the content with the appropriate parser.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    await target.lint(content, contentPath, options);
    // Assert
    expect(check).toHaveBeenCalledWith(content, expect.objectContaining({ parser: info.inferredParser }));
  });
});
