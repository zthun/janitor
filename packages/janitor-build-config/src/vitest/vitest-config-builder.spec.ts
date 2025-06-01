import { Plugin } from "vite";
import { describe, expect, it } from "vitest";
import { ZVitestConfigBuilder } from "./vitest-config-builder.mjs";

describe("Vitest Config Builder", () => {
  const createTestTarget = () => new ZVitestConfigBuilder(__dirname);

  const shouldAddPlugin = (
    expected: string,
    buildFn: (t: ZVitestConfigBuilder) => ZVitestConfigBuilder,
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

  describe("TypeScript", () => {
    it("should add the tsconfig paths plugin", () => {
      shouldAddPlugin("vite-tsconfig-paths", (t) => t.typescript());
    });
  });

  describe("Environment", () => {
    const shouldSetEnvironment = (
      expected: "node" | "happy-dom",
      buildFn: (t: ZVitestConfigBuilder) => ZVitestConfigBuilder,
    ) => {
      // Arrange.
      const target = createTestTarget();

      // Act.
      const config = buildFn(target).build();
      const { environment: actual } = config.test;

      // Assert.
      expect(actual).toEqual(expected);
    };

    it("should set node", () => {
      shouldSetEnvironment("node", (t) => t.node());
    });

    it("should set happy-dom for the browser", () => {
      shouldSetEnvironment("happy-dom", (t) => t.browser());
    });
  });

  describe("Coverage", () => {
    const shouldSetCoverage = (
      expected: "v8" | "istanbul",
      buildFn: (t: ZVitestConfigBuilder) => ZVitestConfigBuilder,
    ) => {
      // Arrange.
      const target = createTestTarget();

      // Act.
      const config = buildFn(target).build();
      const { coverage } = config.test;
      const { provider: actual } = coverage;

      // Assert.
      expect(actual).toEqual(expected);
    };

    it("should set v8", () => {
      shouldSetCoverage("v8", (t) => t.v8());
    });

    it("should set istanbul", () => {
      shouldSetCoverage("istanbul", (t) => t.istanbul());
    });
  });
});
