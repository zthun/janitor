import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IZConfigExtender } from './config-extender.interface';
import { ZConfigReaderCosmic } from './config-reader-cosmic.mjs';

describe('ZConfigCosmicReader', () => {
  let config: string;
  let extender: IZConfigExtender;

  function createTestTarget(name = 'htmlhint', paths?: string[]) {
    return new ZConfigReaderCosmic(name, extender, paths);
  }

  beforeEach(() => {
    extender = {} as any;
    extender.extend = vi.fn((cfg) => Promise.resolve(cfg));

    config = '@zthun/htmlhint-config';
  });

  it('reads the config file.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read(config);
    // Assert
    expect(actual).toBeTruthy();
  });

  it('reads the cosmiconfig file if no config specified.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read(null);
    // Assert
    expect(actual).toBeTruthy();
  });

  it('retrieves the config from the additional supported paths.', async () => {
    // Arrange
    const target = createTestTarget('markdownlint', ['.markdownlint-skip.json', '.markdownlint.json']);
    // Act
    const actual = await target.read(null);
    // Assert
    expect(actual).toBeTruthy();
  });

  it('throws an exception if the actual module cannot be resolved.', async () => {
    // Arrange
    const target = createTestTarget();
    config = '@zthun/htmlhint-config-does-not-exist';
    // Act
    // Assert
    await expect(target.read(config)).rejects.toBeDefined();
  });

  it('throws an exception if there are no config files.', async () => {
    // Arrange
    const target = createTestTarget('markdownlint', ['.markdownlint-missing', 'markdown-skip']);
    // Act
    // Assert
    await expect(target.read(null)).rejects.toBeDefined();
  });
});
