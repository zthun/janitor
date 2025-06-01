import { Plugin } from "vite";
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

  describe("Library", () => {
    it("should set the library options", () => {
      const expected = new ZViteLibraryBuilder().index(__dirname).build();
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
