import { describe, expect, it } from "vitest";
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
  });

  describe("HTML", () => {
    it("should add an include glob", () => {
      // Arrange.
      const htmlGlobAlpha = "**/*.html";
      const htmlGlobBravo = "**/*.htm";
      const htmlGlobCharlie = "**/*.xhtml";
      const target = createTestTarget();

      // Act.
      const actual = target
        .htmlFile(htmlGlobAlpha)
        .htmlFile(htmlGlobBravo)
        .htmlFile(htmlGlobCharlie)
        .build();

      // Assert.
      expect(actual.htmlFiles).toContain(htmlGlobAlpha);
      expect(actual.htmlFiles).toContain(htmlGlobBravo);
      expect(actual.htmlFiles).toContain(htmlGlobCharlie);
    });

    it("should set the config", () => {
      // Arrange.
      const expected = "path/to/html/config.json";
      const target = createTestTarget();

      // Act.
      const actual = target.htmlConfig(expected).build();

      // Assert.
      expect(actual.htmlConfig).toEqual(expected);
    });

    it("should add an exclude glob", () => {
      // Arrange.
      const htmlExcludeAlpha = "**/exclude.html";
      const htmlExcludeBravo = "**/ignore.html";
      const target = createTestTarget();

      // Act.
      const actual = target
        .htmlExclude(htmlExcludeAlpha)
        .htmlExclude(htmlExcludeBravo)
        .build();

      // Assert.
      expect(actual.htmlFilesExclude).toContain(htmlExcludeAlpha);
      expect(actual.htmlFilesExclude).toContain(htmlExcludeBravo);
    });
  });

  describe("JSON", () => {
    it("should add an include glob", () => {
      // Arrange.
      const jsonGlobAlpha = "**/*.json";
      const jsonGlobBravo = "**/data/*.json";
      const jsonGlobCharlie = "**/config/*.json";
      const target = createTestTarget();

      // Act.
      const actual = target
        .jsonFile(jsonGlobAlpha)
        .jsonFile(jsonGlobBravo)
        .jsonFile(jsonGlobCharlie)
        .build();

      // Assert.
      expect(actual.jsonFiles).toContain(jsonGlobAlpha);
      expect(actual.jsonFiles).toContain(jsonGlobBravo);
      expect(actual.jsonFiles).toContain(jsonGlobCharlie);
    });

    it("should add an exclude glob", () => {
      // Arrange.
      const jsonExcludeAlpha = "**/exclude.json";
      const jsonExcludeBravo = "**/ignore.json";
      const target = createTestTarget();
      // Act.
      const actual = target
        .jsonExclude(jsonExcludeAlpha)
        .jsonExclude(jsonExcludeBravo)
        .build();
      // Assert.
      expect(actual.jsonFilesExclude).toContain(jsonExcludeAlpha);
      expect(actual.jsonFilesExclude).toContain(jsonExcludeBravo);
    });
  });

  describe("Markdown", () => {
    it("should add an include glob", () => {
      // Arrange.
      const markdownFileAlpha = "**/*.md";
      const markdownFileBravo = "**/*.markdown";
      const markdownFileCharlie = "**/docs/*.md";
      const target = createTestTarget();

      // Act.
      const actual = target
        .markdownFile(markdownFileAlpha)
        .markdownFile(markdownFileBravo)
        .markdownFile(markdownFileCharlie)
        .build();

      // Assert.
      expect(actual.markdownFiles).toContain(markdownFileAlpha);
      expect(actual.markdownFiles).toContain(markdownFileBravo);
      expect(actual.markdownFiles).toContain(markdownFileCharlie);
    });

    it("should add an exclude glob", () => {
      // Arrange.
      const markdownExcludeAlpha = "**/exclude.md";
      const markdownExcludeBravo = "**/ignore.md";
      const target = createTestTarget();

      // Act.
      const actual = target
        .markdownExclude(markdownExcludeAlpha)
        .markdownExclude(markdownExcludeBravo)
        .build();

      // Assert.
      expect(actual.markdownFilesExclude).toContain(markdownExcludeAlpha);
      expect(actual.markdownFilesExclude).toContain(markdownExcludeBravo);
    });

    it("should set the config", () => {
      // Arrange.
      const expected = "path/to/markdown/config.json";
      const target = createTestTarget();

      // Act.
      const actual = target.markdownConfig(expected).build();

      // Assert.
      expect(actual.markdownConfig).toEqual(expected);
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
  });

  describe("Style", () => {
    it("should add an include glob", () => {
      // Arrange.
      const styleFileAlpha = "**/*.css";
      const styleFileBravo = "**/*.scss";
      const target = createTestTarget();

      // Act.
      const actual = target
        .styleFile(styleFileAlpha)
        .styleFile(styleFileBravo)
        .build();

      // Assert.
      expect(actual.styleFiles).toContain(styleFileAlpha);
      expect(actual.styleFiles).toContain(styleFileBravo);
    });

    it("should set the config", () => {
      // Arrange.
      const expected = "path/to/style/config.json";

      // Act.
      const actual = createTestTarget().styleConfig(expected).build();

      // Assert.
      expect(actual.styleConfig).toEqual(expected);
    });
  });

  describe("YAML", () => {
    it("should add an include glob", () => {
      // Arrange.
      const yamlGlobAlpha = "**/*.yaml";
      const yamlGlobBravo = "**/*.yml";
      const target = createTestTarget();

      // Act.
      const actual = target
        .yamlFile(yamlGlobAlpha)
        .yamlFile(yamlGlobBravo)
        .build();

      // Assert.
      expect(actual.yamlFiles).toContain(yamlGlobAlpha);
      expect(actual.yamlFiles).toContain(yamlGlobBravo);
    });

    it("should add an exclude glob", () => {
      // Arrange.
      const yamlExcludeAlpha = "**/exclude.yaml";
      const yamlExcludeBravo = "**/ignore.yml";
      const target = createTestTarget();

      // Act.
      const actual = target
        .yamlExclude(yamlExcludeAlpha)
        .yamlExclude(yamlExcludeBravo)
        .build();

      // Assert.
      expect(actual.yamlFilesExclude).toContain(yamlExcludeAlpha);
      expect(actual.yamlFilesExclude).toContain(yamlExcludeBravo);
    });
  });
});
