import { describe, expect, it } from "vitest";
import { ZTypedocConfigBuilder } from "./typedoc-config-builder.mjs";

describe("TypedocConfigBuilder", () => {
  const createTestTarget = () => new ZTypedocConfigBuilder();

  describe("Out", () => {
    it("should set the output path to dist", () => {
      expect(createTestTarget().dist().build().out).toEqual(
        ZTypedocConfigBuilder.OutputDist,
      );
    });
  });

  describe("Entry Points", () => {
    it("should add entry points", () => {
      // Arrange.
      const index = "./src/index.mts";
      const entry = "./src/entry.ts";
      const target = createTestTarget();

      // Act.
      const config = target.index().entry(entry).build();
      const { entryPoints: actual } = config;

      // Assert.
      expect(actual).toHaveLength(2);
      expect(actual).toContain(index);
      expect(actual).toContain(entry);
    });
  });

  describe("Strategy", () => {
    it("should set the strategy to packages", () => {
      expect(createTestTarget().packages().build().entryPointStrategy).toEqual(
        "packages",
      );
    });

    it("should set the strategy to resolve", () => {
      expect(createTestTarget().resolve().build().entryPointStrategy).toEqual(
        "resolve",
      );
    });
  });

  describe("Options", () => {
    it("should set excludeNotDocumented", () => {
      expect(
        createTestTarget().excludeNotDocumented().build().excludeNotDocumented,
      ).toBeTruthy();
    });

    it("should set categorizeByGroup", () => {
      expect(
        createTestTarget().categorizeByGroup().build().categorizeByGroup,
      ).toBeTruthy();
    });

    it("should set the name", () => {
      const expected = "Janitor";
      expect(createTestTarget().name(expected).build().name).toEqual(expected);
    });

    it("should set the favicon", () => {
      const expected = "./favicon.ico";
      expect(createTestTarget().favicon(expected).build().favicon).toEqual(
        expected,
      );
    });
  });

  describe("Exclude", () => {
    it("should exclude paths", () => {
      // Arrange.
      const target = createTestTarget();
      const excludeAlpha = "./src/exclude.ts";
      const excludeBravo = "./src/another-exclude.ts";

      // Act.
      const config = target.exclude(excludeAlpha).exclude(excludeBravo).build();
      const { exclude: actual } = config;

      // Assert.
      expect(actual).toHaveLength(2);
      expect(actual).toContain(excludeAlpha);
      expect(actual).toContain(excludeBravo);
    });
  });

  describe("Project", () => {
    it("should set the strategy to resolve", () => {
      expect(createTestTarget().project().build().entryPointStrategy).toEqual(
        "resolve",
      );
    });

    it("should set the output path to dist", () => {
      expect(createTestTarget().project().build().out).toEqual(
        ZTypedocConfigBuilder.OutputDist,
      );
    });
  });

  describe("Web", () => {
    it("should set the strategy to packages", () => {
      expect(createTestTarget().web().build().entryPointStrategy).toEqual(
        "packages",
      );
    });

    it("should exclude undocumented", () => {
      expect(
        createTestTarget().web().build().excludeNotDocumented,
      ).toBeTruthy();
    });

    it("should categorize by group", () => {
      expect(createTestTarget().web().build().categorizeByGroup).toBeTruthy();
    });

    it("should set the output path to dist", () => {
      expect(createTestTarget().web().build().out).toEqual(
        ZTypedocConfigBuilder.OutputDist,
      );
    });

    it("should exclude the current directory", () => {
      expect(createTestTarget().web().build().exclude).toContain("./");
    });
  });
});
