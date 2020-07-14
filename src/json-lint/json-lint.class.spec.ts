import { ZJsonLint } from './json-lint.class';

jest.mock('glob');
jest.mock('fs');

describe('ZJsonLint', () => {
  let json: any;

  beforeEach(() => {
    json = {
      keyA: 'key-a',
      keyB: 'key-b'
    };
  });

  function createTestTarget() {
    return new ZJsonLint();
  }

  it('returns a resolved promise if the json is valid.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint(JSON.stringify(json))).resolves.toBeTruthy();
  });

  it('returns a rejected promise if the json is not valid.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint('This is not valid json')).rejects.toBeTruthy();
  });
});
