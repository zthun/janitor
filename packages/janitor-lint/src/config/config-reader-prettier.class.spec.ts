import type { Options } from "prettier";
import { resolveConfig } from "prettier";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ZConfigReaderPrettier } from "./config-reader-prettier.mjs";
import { $resolve } from "./config-resolve.mjs";

vi.mock("prettier", () => ({
  resolveConfig: vi.fn(),
}));

describe("ZConfigReaderPrettier", () => {
  let options: Options;

  function createTestTarget() {
    return new ZConfigReaderPrettier();
  }

  beforeEach(() => {
    options = {
      singleQuote: true,
    };

    vi.mocked(resolveConfig).mockClear();
    vi.mocked(resolveConfig).mockResolvedValue(options);
  });

  it("reads the supplied config file if passed.", async () => {
    // Arrange
    const config = "@zthun/janitor-prettier-config";
    const target = createTestTarget();
    const expected = $resolve(config);
    // Act
    await target.read(config);
    // Assert
    expect(resolveConfig).toHaveBeenCalledWith(
      expect.stringContaining(process.cwd()),
      expect.objectContaining({ config: expected }),
    );
  });

  it("reads the config using a prettier config search for falsy config values.", async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    await target.read();
    // Assert
    expect(resolveConfig).toHaveBeenCalledWith(
      expect.stringContaining(process.cwd()),
      {},
    );
  });

  it("returns the options.", async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read();
    // Assert
    expect(actual).toBe(options);
  });

  it("uses the default options when the config does not exist.", async () => {
    // Arrange
    vi.mocked(resolveConfig).mockResolvedValue(null);
    const target = createTestTarget();

    // Act
    const actual = await target.read();

    // Assert
    expect(actual).toEqual({});
  });
});
