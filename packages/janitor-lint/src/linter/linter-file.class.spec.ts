import { readFile } from "node:fs/promises";

import { sync } from "glob";
import type { Mocked } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import type { IZConfigReader } from "../config/config-reader.mjs";
import type { IZContentLinter } from "../content/content-linter.mjs";
import { ZLinterFile } from "./linter-file.mjs";

vi.mock("glob", () => ({
  sync: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
  readFile: vi.fn(),
}));

describe("ZLinterFile", () => {
  let files: string[];
  let config: string;
  let options: unknown;
  let contentLint: Mocked<IZContentLinter>;
  let configReader: Mocked<IZConfigReader>;
  let logger: Console;

  beforeEach(() => {
    config = "config.json";

    options = {
      key: "value",
    };

    logger = {} as Console;
    logger.error = vi.fn();
    logger.log = vi.fn();

    configReader = mock<IZConfigReader>();
    configReader.read.mockResolvedValue(options);

    contentLint = mock<IZContentLinter>();
    contentLint.lint.mockResolvedValue(true);

    files = ["/files/log-a.json", "/files/lob-b.json", "/files/log-c.json"];

    vi.mocked(sync).mockImplementation(() => files);
    vi.mocked(readFile).mockResolvedValue(Buffer.from("FileContent"));
  });

  function createTestTarget() {
    return new ZLinterFile(contentLint, configReader, logger, "generic");
  }

  describe("Without config", () => {
    it("returns true if there are no files.", async () => {
      // Arrange
      const target = createTestTarget();
      files = [];

      // Act
      const actual = await target.lint(files);

      // Assert
      expect(actual).toBeTruthy();
    });

    it("returns true if all files pass.", async () => {
      // Arrange
      const target = createTestTarget();

      // Act
      const actual = await target.lint(files);

      // Assert
      expect(actual).toBeTruthy();
    });

    it("returns false if any file cannot be read.", async () => {
      // Arrange
      const target = createTestTarget();
      vi.mocked(readFile).mockRejectedValue(new Error("Cannot read"));

      // Act
      const actual = await target.lint(files);

      // Assert
      expect(actual).toBeFalsy();
    });

    it("returns false if any file fail the lint.", async () => {
      // Arrange
      const error = new Error("Lint failed");
      const target = createTestTarget();
      contentLint.lint.mockRejectedValue(error);

      // Act
      const actual = await target.lint(files);

      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe("With config", () => {
    it("returns true if all files pass.", async () => {
      // Arrange
      const target = createTestTarget();

      // Act
      const actual = await target.lint(files, config);

      // Assert
      expect(actual).toBeTruthy();
    });

    it("reads the config and passes it to the content linter.", async () => {
      // Arrange
      const target = createTestTarget();

      // Act
      await target.lint(files, config);

      // Assert
      expect(contentLint.lint).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        options,
        config,
      );
    });

    it("returns false if the config cannot be read.", async () => {
      // Arrange
      const target = createTestTarget();
      configReader.read.mockRejectedValue(new Error("Cannot read file"));
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe("Logging", () => {
    let cfg: { errors: string | string[] };

    beforeEach(() => {
      cfg = {
        errors: "File is bad",
      };

      contentLint.lint.mockRejectedValue(cfg.errors);
    });

    async function assertLogged(logs: string[] | (string | string[])[]) {
      // Arrange
      const target = createTestTarget();

      // Act
      await target.lint(files, config);

      // Assert
      logs.forEach((log) =>
        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining(log)),
      );
    }

    it("logs all errors on separate lines if an array is passed.", async () => {
      cfg.errors = ["Bad line one", "Bad line two", "Bad line three"];
      contentLint.lint.mockRejectedValue(cfg.errors);
      await assertLogged(cfg.errors);
    });

    it("logs the error directly if it is not an array.", async () => {
      await assertLogged([cfg.errors]);
    });
  });
});
