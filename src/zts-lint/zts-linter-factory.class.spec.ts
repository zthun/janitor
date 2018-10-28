import { Linter } from 'tslint';
import { ZTsLinterFactory } from './zts-linter-factory.class';

describe('ZTsLinterFactory', () => {

  function createTestTarget() {
    return new ZTsLinterFactory();
  }

  it('returns a new linter.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const linter = target.create();
    // Assert
    expect(Object.getPrototypeOf(linter)).toBe(Linter.prototype);
  });
});
