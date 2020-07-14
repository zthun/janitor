import { ZSilentLint } from './silent-lint.class';

describe('ZSilentLint', () => {
  function createTestTarget() {
    return new ZSilentLint();
  }

  it('resolves to true.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.lint();
    // Assert
    expect(actual).toBeTruthy();
  });
});
