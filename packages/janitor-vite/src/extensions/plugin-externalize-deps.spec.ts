import { resolve } from "node:path";

import type { UserConfig } from "vite";
import { describe, expect, it } from "vitest";

import type { ExternalizeOptions } from "./plugin-externalize-deps.mjs";
import { externalizeDeps } from "./plugin-externalize-deps.mjs";

describe("Externalize Dependencies", () => {
  // Note that this test is ran at the root normally, so the root package.json
  // is used when not specified.
  const packageJson = resolve(import.meta.dirname, "../..", "package.json");

  const createTestTarget = (options?: ExternalizeOptions) => {
    const plugin = externalizeDeps(options);
    const { config } = plugin;
    const _config = config as unknown as () => UserConfig;
    const { build = {} } = _config();
    const { rolldownOptions = {} } = build;
    const { external } = rolldownOptions;
    return external as (source: string) => void;
  };

  const shouldBeExternal = (
    expected: boolean,
    source: string,
    options?: ExternalizeOptions,
  ) => {
    // Arrange.
    const target = createTestTarget(options);

    // Act.
    const actual = target(source);

    // Assert.
    expect(actual).toEqual(expected);
  };

  it("should throw an error if the package.json file does not exist", () => {
    const packageJson = "/path/to/package/json/does/not/exist";
    expect(() => createTestTarget({ packageJson })).toThrow(Error);
  });

  describe("Dependencies", () => {
    describe("Transitive", () => {
      it("should be external", () => {
        shouldBeExternal(true, "vite", { packageJson });
      });
    });

    describe("Development", () => {
      it("should be external", () => {
        shouldBeExternal(true, "@types/node");
      });
    });

    describe("Optional", () => {
      it("should be external", () => {
        shouldBeExternal(true, "vite");
      });
    });

    describe("Peer", () => {
      it("should be external", () => {
        shouldBeExternal(true, "vite");
      });
    });

    describe("DeepTransitive", () => {
      it("should be external", () => {
        shouldBeExternal(true, "lodash-es/some/child/module", { packageJson });
      });
    });
  });

  describe("Node Builtins", () => {
    it("should be external for classic node", () => {
      shouldBeExternal(true, "path");
    });

    it("should be external for modern node", () => {
      shouldBeExternal(true, "node:fs");
    });
  });

  describe("Other", () => {
    it("should not be external", () => {
      shouldBeExternal(false, "../path/to/some/module.ts");
    });
  });
});
