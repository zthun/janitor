import { beforeEach, describe, expect, it, vi } from "vitest";
import { IZConfigExtender } from "./config-extender.mjs";
import { ZConfigReaderCosmic } from "./config-reader-cosmic.mjs";

describe("ZConfigCosmicReader", () => {
  let config: string;
  let extender: IZConfigExtender;

  function createTestTarget(name = "htmlhint", paths?: string[]) {
    return new ZConfigReaderCosmic(name, extender, paths);
  }

  beforeEach(() => {
    extender = {} as any;
    extender.extend = vi.fn((cfg) => Promise.resolve(cfg));

    config = "@zthun/janitor-htmlhint-config";
  });

  it("reads the config file.", async () => {
    // Arrange
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
    const actual = await target.read(null);

    // Assert
    expect(actual).toBeTruthy();
  });

  it("retrieves the config from the additional supported paths.", async () => {
    // Arrange
    const target = createTestTarget("markdownlint", [
      ".markdownlint-skip.json",
      ".markdownlint.json",
    ]);

    // Act
    const actual = await target.read(null);

    // Assert
    expect(actual).toBeTruthy();
  });

  it("throws an exception if the actual module cannot be resolved.", async () => {
    // Arrange
    const target = createTestTarget();
    config = "@zthun/janitor-htmlhint-config-does-not-exist";

    // Act
    const actual = target.read(config);

    // Assert
    await expect(actual).rejects.toBeDefined();
  });

  it("returns the empty config if there are no discovered config files.", async () => {
    // Arrange
    const target = createTestTarget("markdownlint", [
      ".markdownlint-missing",
      "markdown-skip",
    ]);

    // Act
    const actual = await target.read(null);

    // Assert
    expect(actual).toEqual({});
  });

  it("returns a file from the paths if one exists outside of the standard file array", async () => {
    // Arrange.
    const expected = "htmlhint.config.cjs";
    const target = createTestTarget("markdownlint", [expected]);

    // Act.
    const actual = await target.search();

    // Assert.
    expect(actual).toContain(expected);
  });
});
