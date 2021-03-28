/* eslint-disable require-jsdoc */
import { ZSilentLint } from './silent-lint.class';

describe('ZSilentLint', () => {
  it('resolves to true.', async () => {
    // Arrange
    const target = new ZSilentLint();
    // Act
    const actual = await target.lint();
    // Assert
    expect(actual).toBeTruthy();
  });

  it('resolves to false.', async () => {
    // Arrange
    const target = new ZSilentLint(false);
    // Act
    const actual = await target.lint();
    // Assert
    expect(actual).toBeFalsy();
  });
});
