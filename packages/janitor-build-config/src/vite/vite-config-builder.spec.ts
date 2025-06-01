import { Plugin } from "vite";
import { describe, expect, it } from "vitest";
import { ZViteConfigBuilder } from "./vite-config-builder.mjs";
import { ZViteLibraryBuilder } from "./vite-library-builder.mjs";

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
  });

  describe("TypeScript", () => {
    it("should add the tsconfig paths plugin", () => {
      shouldAddPlugin("vite-tsconfig-paths", (t) => t.typescript());
    });

    it("should add the dts plugin", () => {
      shouldAddPlugin("vite:dts", (t) => t.typescript());
    });
  });
});
