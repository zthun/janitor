import { ZEsLintEngineFactory } from './zes-lint-engine-factory.class';

describe('ZEsLintEngineFactory', () => {
  function createTestTarget() {
    return new ZEsLintEngineFactory();
  }

  it('constructs the engine.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.create({});
    // Assert
    expect(actual).toBeTruthy();
  });
});
