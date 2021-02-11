/* eslint-disable require-jsdoc */
import { ZConfigNullReader } from './config-null-reader.class';

describe('ZConfigNullReader', () => {
  function createTestTarget() {
    return new ZConfigNullReader();
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
