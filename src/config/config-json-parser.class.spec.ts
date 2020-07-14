import { ZConfigJsonParser } from './config-json-parser.class';

describe('ZConfigJsonParser', () => {
  function createTestTarget() {
    return new ZConfigJsonParser();
  }

  it('returns the parsed json.', async () => {
    // Arrange
    const json = JSON.stringify({ key: 'value' });
    const target = createTestTarget();
    // Act
    const actual = await target.parse(json);
    // Assert
    expect(JSON.stringify(actual)).toEqual(json);
  });

  it('rejects if the json is invalid.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.parse('This is not valid json')).rejects.toBeTruthy();
  });
});
