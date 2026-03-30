import { describe, expect, it } from "vitest";

import type { IZJanitorOptionsLint } from "./janitor-options-lint.mjs";
import { ZJanitorOptionsLintBuilder } from "./janitor-options-lint.mjs";

describe("ZJanitorOptionsLint", () => {
  const createTestTarget = () => new ZJanitorOptionsLintBuilder();

  describe("ECMAScript", () => {
    it("should add an include glob", () => {
      // Arrange.
      const esGlobAlpha = "**/*.js";
      const esGlobBravo = "**/*.ts";
      const esGlobCharlie = "**/*.mts";
      const target = createTestTarget();

      // Act.
      const actual = target
        .esFile()
        .esFile(esGlobAlpha)
        .esFile(esGlobBravo)
        .esFile(esGlobCharlie)
        .build();

      // Assert.
      expect(actual.esFiles).toContain(esGlobAlpha);
      expect(actual.esFiles).toContain(esGlobBravo);
      expect(actual.esFiles).toContain(esGlobCharlie);
    });

    it("should set the config", () => {
      // Arrange.
      const expected = "path/to/es/config.json";
      const target = createTestTarget();

      // Act.
      const actual = target.esConfig(expected).build();

      // Assert.
      expect(actual.esConfig).toEqual(expected);
    });

    describe("Common", () => {
      it("should add files", () => {
        expect(createTestTarget().commonEsFiles().build().esFiles).toBeTruthy();
      });
    });
  });

  describe("Pretty", () => {
    it("should add an include glob", () => {
      // Arrange.
      const prettyFileAlpha = "**/*.md";
      const prettyFileBravo = "**/*.markdown";
      const prettyFileCharlie = "**/docs/*.md";
      const target = createTestTarget();

      // Act.
      const actual = target
        .prettyFile()
        .prettyFile(prettyFileAlpha)
        .prettyFile(prettyFileBravo)
        .prettyFile(prettyFileCharlie)
        .build();

      // Assert.
      expect(actual.prettyFiles).toContain(prettyFileAlpha);
      expect(actual.prettyFiles).toContain(prettyFileBravo);
      expect(actual.prettyFiles).toContain(prettyFileCharlie);
    });

    it("should add an exclude glob", () => {
      // Arrange.
      const prettyExcludeAlpha = "**/exclude.md";
      const prettyExcludeBravo = "**/ignore.md";
      const target = createTestTarget();

      // Act.
      const actual = target
        .prettyExclude()
        .prettyExclude(prettyExcludeAlpha)
        .prettyExclude(prettyExcludeBravo)
        .build();

      // Assert.
      expect(actual.prettyFilesExclude).toContain(prettyExcludeAlpha);
      expect(actual.prettyFilesExclude).toContain(prettyExcludeBravo);
    });

    it("should set the config", () => {
      // Arrange.
      const expected = "path/to/pretty/config.json";
      const target = createTestTarget();

      // Act.
      const actual = target.prettyConfig(expected).build();

      // Assert.
      expect(actual.prettyConfig).toEqual(expected);
    });

    describe("Generate", () => {
      const shouldAddPrettyFiles = (
        appendFn: (
          target: ZJanitorOptionsLintBuilder,
          file: string,
        ) => ZJanitorOptionsLintBuilder,
      ) => {
        // Arrange.
        const file = "**/*.js";
        const target = createTestTarget();

        // Act.
        const config = appendFn(target, file).generatePrettyFiles().build();
        const { prettyFiles: actual } = config;

        // Assert.
        expect(actual).toContain(file);
      };

      it("should add es files to generated pretty files", () => {
        shouldAddPrettyFiles((t, f) => t.esFile(f));
      });
    });
  });

  describe("Spelling", () => {
    it("should add an include glob", () => {
      // Arrange.
      const spellingFileAlpha = "**/*.txt";
      const spellingFileBravo = "**/*.md";
      const spellingFileCharlie = "**/docs/*.txt";
      const target = createTestTarget();
      // Act.
      const actual = target
        .spellingFile()
        .spellingFile(spellingFileAlpha)
        .spellingFile(spellingFileBravo)
        .spellingFile(spellingFileCharlie)
        .build();
      // Assert.
      expect(actual.spellingFiles).toContain(spellingFileAlpha);
      expect(actual.spellingFiles).toContain(spellingFileBravo);
      expect(actual.spellingFiles).toContain(spellingFileCharlie);
    });

    it("should add an exclude glob", () => {
      // Arrange.
      const spellingExcludeAlpha = "**/exclude.txt";
      const spellingExcludeBravo = "**/ignore.txt";
      const target = createTestTarget();

      // Act.
      const actual = target
        .spellingExclude()
        .spellingExclude(spellingExcludeAlpha)
        .spellingExclude(spellingExcludeBravo)
        .build();

      // Assert.
      expect(actual.spellingFilesExclude).toContain(spellingExcludeAlpha);
      expect(actual.spellingFilesExclude).toContain(spellingExcludeBravo);
    });

    it("should set the config", () => {
      // Arrange.
      const expected = "path/to/spelling/config.json";

      // Act.
      const actual = createTestTarget().spellingConfig(expected).build();

      // Assert.
      expect(actual.spellingConfig).toEqual(expected);
    });

    describe("Generate", () => {
      const shouldAddSpellingFiles = (
        appendFn: (
          target: ZJanitorOptionsLintBuilder,
          file: string,
        ) => ZJanitorOptionsLintBuilder,
      ) => {
        // Arrange.
        const file = "**/*.js";
        const target = createTestTarget();

        // Act.
        const config = appendFn(target, file).generateSpellingFiles().build();
        const { spellingFiles: actual } = config;

        // Assert.
        expect(actual).toContain(file);
      };

      it("should add es files to generated spelling files", () => {
        shouldAddSpellingFiles((t, f) => t.esFile(f));
      });
    });
  });

  describe("Exclude All", () => {
    const shouldAddFilesToExclude = (
      filesFn: (config: IZJanitorOptionsLint) => string[] | undefined,
    ) => {
      // Arrange.
      const globalExcludeAlpha = "lerna.json";
      const globalExcludeBravo = "cspell.json";
      const globalExcludeCharlie = "node_modules";
      const target = createTestTarget();

      // Act.
      const config = target
        .excludeAll()
        .excludeAll(globalExcludeAlpha)
        .excludeAll(globalExcludeBravo)
        .excludeAll(globalExcludeCharlie)
        .build();
      const actual = filesFn(config);

      // Assert.
      expect(actual).toContain(globalExcludeAlpha);
      expect(actual).toContain(globalExcludeBravo);
      expect(actual).toContain(globalExcludeCharlie);
    };

    it("should add files to exclude pretty", () => {
      shouldAddFilesToExclude((c) => c.prettyFilesExclude);
    });

    it("should add files to exclude spelling", () => {
      shouldAddFilesToExclude((c) => c.spellingFilesExclude);
    });

    describe("Common", () => {
      it("should add node_modules", () => {
        // Arrange.
        const target = createTestTarget();

        // Act.
        const { prettyFilesExclude } = target.commonExcludes().build();
        const actual = prettyFilesExclude?.find((p) =>
          p.includes("**/node_modules/**"),
        );

        // Assert.
        expect(actual).toBeTruthy();
      });
    });
  });
});
