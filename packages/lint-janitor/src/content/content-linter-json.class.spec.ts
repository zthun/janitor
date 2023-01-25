import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZContentLinterJson } from './content-linter-json.class';

vi.mock('glob');
vi.mock('fs');

describe('ZContentLinterJson', () => {
  let json: any;

  beforeEach(() => {
    json = {
      keyA: 'key-a',
      keyB: 'key-b'
    };
  });

  function createTestTarget() {
    return new ZContentLinterJson();
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
