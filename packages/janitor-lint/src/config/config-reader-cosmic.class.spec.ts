import { describe, expect, it } from "vitest";

import { ZConfigReaderCosmic } from "./config-reader-cosmic.mjs";

describe("ZConfigCosmicReader", () => {
  function createTestTarget(name = "prettier") {
    return new ZConfigReaderCosmic(name);
  }

  it("reads the config file.", async () => {
    // Arrange
    const config = "@zthun/janitor-prettier-config";
    const target = createTestTarget();

    // Act
    const actual = await target.read(config);

    // Assert
    expect(actual).toBeTruthy();
  });

  it("reads the cosmiconfig file if no config specified.", async () => {
    // Arrange
    const target = createTestTarget();

    // Act
    const actual = await target.read();

    // Assert
    expect(actual).toBeTruthy();
  });

  it("throws an exception if the actual module cannot be resolved.", async () => {
    // Arrange
    const target = createTestTarget();
    const config = "@zthun/janitor-htmlhint-config-does-not-exist";

    // Act
    const actual = target.read(config);

    // Assert
    await expect(actual).rejects.toBeDefined();
  });

  it("returns the empty config if there are no discovered config files.", async () => {
    // Arrange
    const target = createTestTarget("markdownlint");

    // Act
    const actual = await target.read();

    // Assert
    expect(actual).toEqual({});
  });
});
