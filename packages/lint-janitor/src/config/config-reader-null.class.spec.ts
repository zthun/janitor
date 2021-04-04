/* eslint-disable require-jsdoc */
import { ZConfigReaderNull } from './config-reader-null.class';

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
