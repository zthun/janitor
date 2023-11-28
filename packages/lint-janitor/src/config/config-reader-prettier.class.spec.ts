import { Options, resolveConfig } from 'prettier';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZConfigReaderPrettier } from './config-reader-prettier.mjs';

vi.mock('prettier', () => ({
  resolveConfig: vi.fn()
}));

describe('ZConfigReaderPrettier', () => {
  let options: Options;

  function createTestTarget() {
    return new ZConfigReaderPrettier();
  }

  beforeEach(() => {
    options = {
      singleQuote: true
    };

    vi.mocked(resolveConfig).mockClear();
    vi.mocked(resolveConfig).mockResolvedValue(options);
  });

  it('reads the supplied config file if passed.', async () => {
    // Arrange
    const config = '@zthun/prettier-config';
    const target = createTestTarget();
    const expected = require.resolve(config);
    // Act
    await target.read(config);
    // Assert
    expect(resolveConfig).toHaveBeenCalledWith(process.cwd(), expect.objectContaining({ config: expected }));
  });

  it('reads the config using a prettier config search for falsy config values.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    await target.read(null);
    // Assert
    expect(resolveConfig).toHaveBeenCalledWith(process.cwd(), { config: null });
  });

  it('returns the options.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read(null);
    // Assert
    expect(actual).toBe(options);
  });

  it('returns a rejected promise if no options can be loaded.', async () => {
    // Arrange
    vi.mocked(resolveConfig).mockResolvedValue(null);
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.read(null)).rejects.toBeTruthy();
  });
});
