/* eslint-disable require-jsdoc */
import { beforeEach, describe, expect, it } from 'vitest';
import { ZConfigExtender } from './config-extender.class';

/*
 * A note on these.  These are more integration tests since we are going to be importing real data.
 * The reason for the extender is mostly geared towards HTMLHint.  HTMLHint has no support for extendable
 * configs, so we want to add that in for lint-janitor support.  Once HTMLHint adds some kind of support
 * for this (later), then we can actually get rid of most of this.
 */
describe('ZConfigExtender', () => {
  let htmlhint: any;

  function createTestTarget(key?: string) {
    return new ZConfigExtender(key);
  }

  beforeEach(() => {
    htmlhint = {
      extends: ['@zthun/htmlhint-config']
    };
  });

  it('should return the original config if the key is missing.', async () => {
    // Arrange
    const target = createTestTarget('inherits');
    // Act
    const actual = await target.extend(htmlhint);
    // Assert
    expect(actual).toBe(htmlhint);
  });

  it('should extend just a string.', async () => {
    const target = createTestTarget();
    htmlhint.extends = htmlhint.extends[0];
    // Act
    const actual = await target.extend(htmlhint);
    // Assert
    expect(Object.keys(actual).length).toBeGreaterThanOrEqual(2);
  });

  it('should respect the appropriate extends key.', async () => {
    // Arrange
    const target = createTestTarget('inherits');
    htmlhint.inherits = htmlhint.extends;
    delete htmlhint.extends;
    // Act
    const actual = await target.extend(htmlhint);
    // Assert
    expect(Object.keys(actual).length).toBeGreaterThanOrEqual(2);
  });

  it('should delete the key from the config.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const config = await target.extend(htmlhint);
    const actual = Object.hasOwnProperty.call(config, 'extends');
    // Assert
    expect(actual).toBeFalsy();
  });

  it('should throw an error if any of the extension modules are not strings.', async () => {
    // Arrange
    const target = createTestTarget();
    htmlhint.extends = ['@zthun/htmlhint-config', 4];
    // Act
    // Assert
    await expect(target.extend(htmlhint)).rejects.toBeTruthy();
  });

  it('should throw an error if any of the extension modules do not exist.', async () => {
    // Arrange
    const target = createTestTarget();
    htmlhint.extends = ['this-is-not-a-valid-module'];
    // Act
    // Assert
    await expect(target.extend(htmlhint)).rejects.toBeTruthy();
  });

  it('should keep configuration in the reverse order.', async () => {
    // Arrange
    const target = createTestTarget();
    htmlhint['tagname-lowercase'] = false;
    // Act
    const expanded = await target.extend(htmlhint);
    const actual = expanded['tagname-lowercase'];
    // Assert
    expect(actual).toBeFalsy();
  });

  it('should keep additional configuration not found in the extension', async () => {
    // Arrange
    const target = createTestTarget();
    htmlhint['some-legacy-property'] = true;
    // Act
    const expanded = await target.extend(htmlhint);
    const actual = expanded['some-legacy-property'];
    // Assert
    expect(actual).toBeTruthy();
  });
});
