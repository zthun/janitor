import { ZSilentLinter } from './silent-linter.class';

describe('ZSilentLinter', () => {
  function createTestTarget() {
    return new ZSilentLinter();
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
