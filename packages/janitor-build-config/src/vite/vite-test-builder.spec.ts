import { describe, expect, it } from "vitest";
import { ZViteTestBuilder } from "./vite-test-builder.mjs";

describe("Vite Test Builder", () => {
  const createTestTarget = () => new ZViteTestBuilder();

  describe("Environment", () => {
    const shouldSetEnvironment = (
      expected: "node" | "happy-dom",
      buildFn: (t: ZViteTestBuilder) => ZViteTestBuilder,
    ) => {
      // Arrange.
      const target = createTestTarget();

      // Act.
      const test = buildFn(target).build();
      const { environment: actual } = test;

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
      buildFn: (t: ZViteTestBuilder) => ZViteTestBuilder,
    ) => {
      // Arrange.
      const target = createTestTarget();

      // Act.
      const test = buildFn(target).build();
      const { coverage = {} } = test;
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

  describe("Projects", () => {
    it("should add a project", () => {
      // Arrange.
      const a = "/path/to/a/vite.config.ts";
      const b = "/path/to/b/vite.config.ts";
      const c = "/path/to/c/vite.config.ts";
      const target = createTestTarget();

      // Act.
      const config = target.project().project(a).project([b, c]).build();
      const { projects: actual } = config;

      // Assert.
      expect(actual).toEqual([a, b, c]);
    });
  });

  describe("Monorepo", () => {
    it("should construct a monorepo", () => {
      // Arrange.
      const target = createTestTarget();

      // Act.
      const config = target.monorepo().build();
      const { projects: actual } = config;

      // Assert.
      expect(actual).toContain("packages/*/vitest.config.{js,cjs,mjs,ts,mts}");
    });

    it("should construct a monorepo with a path to the packages folder", () => {
      // Arrange.
      const target = createTestTarget();
      const packages = "libs";

      // Act.
      const config = target.monorepo(packages).build();
      const { projects: actual } = config;

      // Assert.
      expect(actual).toContain(
        `${packages}/*/vitest.config.{js,cjs,mjs,ts,mts}`,
      );
    });
  });
});
