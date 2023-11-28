import { describe, expect, it } from 'vitest';
import { ZConfigReaderNull } from './config-reader-null.mjs';

describe('ZConfigReaderNull', () => {
  function createTestTarget() {
    return new ZConfigReaderNull();
  }

  it('returns null on read.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read();
    // Assert
    expect(actual).toBeNull();
  });
});
