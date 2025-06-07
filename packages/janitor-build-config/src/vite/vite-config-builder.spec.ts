import type { LibraryOptions, Plugin } from "vite";
import { describe, expect, it } from "vitest";
import { ZViteConfigBuilder } from "./vite-config-builder.mjs";
import { ZViteLibraryBuilder } from "./vite-library-builder.mjs";
import { ZViteTestBuilder } from "./vite-test-builder.mjs";

describe("Vite Config Builder", () => {
  const createTestTarget = () => new ZViteConfigBuilder(__dirname);

  const shouldAddPlugin = (
    expected: string,
    buildFn: (t: ZViteConfigBuilder) => ZViteConfigBuilder,
  ) => {
    // Arrange.
    const target = createTestTarget();

    // Act.
    const config = buildFn(target).build();
    const { plugins } = config;
    const names = plugins.map((p) => p as Plugin).map((p) => p.name);
    const actual = names.indexOf(expected);

    // Assert.
    expect(actual).toBeGreaterThanOrEqual(0);
  };

  const shouldAddEntryPoint = (
    expected: string,
    buildFn: (t: ZViteConfigBuilder) => ZViteConfigBuilder,
  ) => {
    // Arrange.
    const target = createTestTarget();

    // Act.
    const config = buildFn(target).build();
    const { lib } = config.build;
    const { entry } = lib as LibraryOptions;
    const actual = Object.prototype.hasOwnProperty.call(entry, expected);

    // Assert.
    expect(actual).toBeTruthy();
  };

  describe("Library", () => {
    it("should set the library options", () => {
      const expected = new ZViteLibraryBuilder().index().build();
      expect(createTestTarget().library().build().build.lib).toEqual(expected);
    });

    it("should set custom library options", () => {
      const expected = new ZViteLibraryBuilder()
        .entry("custom", "path/to/custom.ts")
        .build();
      expect(createTestTarget().library(expected).build().build.lib).toEqual(
        expected,
      );
    });

    it("should turn on the source maps", () => {
      expect(createTestTarget().library().build().build.sourcemap).toBeTruthy();
    });

    it("should turn off minify", () => {
      expect(createTestTarget().library().build().build.minify).toBeFalsy();
    });

    it("should add the external dependencies plugin", () => {
      shouldAddPlugin("vite-plugin-externalize-deps", (t) => t.library());
    });

    it("should add the dts plugin", () => {
      shouldAddPlugin("vite:dts", (t) => t.library());
    });
  });

  describe("CLI", () => {
    it("should construct a library", () => {
      expect(createTestTarget().cli().build().build.lib).toBeTruthy();
    });

    it("should add an entry point for index", () => {
      shouldAddEntryPoint("index", (t) => t.cli());
    });

    it("should add an entry point for cli", () => {
      shouldAddEntryPoint("cli", (t) => t.cli());
    });
  });

  describe("Test", () => {
    it("should add the test config", () => {
      expect(createTestTarget().test().build().test).toBeTruthy();
    });

    it("should add a custom test config", () => {
      const expected = new ZViteTestBuilder().browser().v8().build();
      expect(createTestTarget().test(expected).build().test).toEqual(expected);
    });
  });
});
