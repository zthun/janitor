import type { IZJanitorOptions } from "@zthun/janitor-options";
import type { Mocked } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import type { IZConfigReader } from "../config/config-reader.mjs";
import type { IZLinter } from "../linter/linter.mjs";
import { ZLinterSilent } from "../linter/linter-silent.mjs";
import { ZJanitorLint } from "./janitor-lint.mjs";
import type { IZJanitorLintArgs } from "./janitor-lint-args.mjs";

describe("ZJanitorLint", () => {
  let args: IZJanitorLintArgs;
  let options: IZJanitorOptions;
  let config: Mocked<IZConfigReader<IZJanitorOptions>>;
  let logger: Console;

  function createTestTarget() {
    const target = new ZJanitorLint(logger);
    target.esLint = new ZLinterSilent();
    target.spellLint = new ZLinterSilent();
    target.prettyLint = new ZLinterSilent();
    target.config = config;
    return target;
  }

  beforeEach(() => {
    logger = mock<Console>();

    args = {
      config: "./cfg/janitor.json",
    };

    options = {
      lint: {
        esConfig: "@zthun/janitor-eslint-config",
        esFiles: ["**/*.js"],
        spellingConfig: "./cspell.json",
        spellingFiles: ["**/*.md"],
        spellingFilesExclude: ["**/exclude.md"],
        prettyConfig: "@zthun/janitor-prettier-config",
        prettyFiles: ["**/*.ts"],
        prettyFilesExclude: ["**/exclude.ts"],
      },
    };

    config = mock<IZConfigReader<IZJanitorOptions>>();
    config.read.mockResolvedValue(options);
  });

  describe("Linting", () => {
    async function assertLinterInvoked(
      linter: (t: ZJanitorLint) => IZLinter,
      files?: string[],
      config?: string,
      exclude?: string[],
    ) {
      // Arrange
      const target = createTestTarget();
      const expected = linter(target);
      vi.spyOn(expected, "lint");
      // Act
      await target.lint(options);
      // Assert
      expect(expected.lint).toHaveBeenCalledWith(files, config, exclude);
    }

    async function assertLinterNotInvoked(
      linter: (t: ZJanitorLint) => IZLinter,
    ) {
      // Arrange
      const target = createTestTarget();
      const expected = linter(target);
      vi.spyOn(expected, "lint");
      // Act
      await target.lint(options);
      // Assert
      expect(expected.lint).not.toHaveBeenCalled();
    }

    describe("EsLint", () => {
      it("invokes the linter if there are esFiles", async () => {
        await assertLinterInvoked(
          (t) => t.esLint,
          options.lint?.esFiles,
          options.lint?.esConfig,
          undefined,
        );
      });

      it("does not invoke the linter if there are no esFiles.", async () => {
        delete options.lint?.esFiles;
        await assertLinterNotInvoked((t) => t.esLint);
      });
    });

    describe("SpellingLint", () => {
      it("invokes the linter if there are spellingFiles", async () => {
        await assertLinterInvoked(
          (t) => t.spellLint,
          options.lint?.spellingFiles,
          options.lint?.spellingConfig,
          options.lint?.spellingFilesExclude,
        );
      });

      it("does not invoke the linter if there are no spellingFiles.", async () => {
        delete options.lint?.spellingFiles;
        await assertLinterNotInvoked((t) => t.spellLint);
      });
    });

    describe("PrettyLint", () => {
      it("invokes the linter if there are prettyFiles.", async () => {
        await assertLinterInvoked(
          (t) => t.prettyLint,
          options.lint?.prettyFiles,
          options.lint?.prettyConfig,
          options.lint?.prettyFilesExclude,
        );
      });

      it("does not invoke the linter if there are no prettyFiles.", async () => {
        delete options.lint?.prettyFiles;
        await assertLinterNotInvoked((t) => t.prettyLint);
      });
    });
  });

  describe("Running", () => {
    it("returns 0 if the linting is successful.", async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(0);
    });

    it("returns 0 if the config file is empty", async () => {
      // Arrange.
      config.read.mockResolvedValue({});
      const target = createTestTarget();

      // Act.
      const actual = await target.run(args);

      // Assert.
      expect(actual).toEqual(0);
    });

    it("returns 0 if the config lint options are empty", async () => {
      // Arrange.
      config.read.mockResolvedValue({ lint: {} });
      const target = createTestTarget();

      // Act.
      const actual = await target.run(args);

      // Assert.
      expect(actual).toEqual(0);
    });

    it("returns 1 if any linting fails.", async () => {
      // Arrange
      const target = createTestTarget();
      target.esLint = new ZLinterSilent(false);
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it("returns 1 if any parsing fails.", async () => {
      // Arrange
      const target = createTestTarget();
      config.read.mockRejectedValue("Failed to read config");
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it("logs parse errors.", async () => {
      // Arrange
      const target = createTestTarget();
      config.read.mockRejectedValue("Failed to read config");
      // Act
      await target.run(args);
      // Assert
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
