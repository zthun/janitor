import type { Plugin, UserConfig } from "vite";
import { describe, expect, it } from "vitest";

import { extensionLibrary } from "./extension-library.mjs";

describe("Extension", () => {
  const domain = "janitor";

  const shouldAddPlugin = (expected: string, fn: () => Plugin[]) => {
    // Arrange.

    // Act.
    const plugins = fn();
    const names = plugins.map((p) => p.name);

    // Assert.
    expect(names).toContain(expected);
  };

  function shouldSetConfig<T>(
    expected: T,
    target: string,
    value: (c: UserConfig | undefined) => T,
    fn: () => Plugin[],
  ) {
    // Arrange.

    // Act.
    const plugins = fn();
    const plugin = plugins.find((p) => p.name === target);
    const config = plugin?.config as unknown as (() => UserConfig) | undefined;
    const configured = config?.();
    const actual = value(configured);

    // Assert.
    expect(actual).toEqual(expected);
  }

  describe("Library", () => {
    it("should externalize dependencies", () => {
      shouldAddPlugin(`${domain}:plugin-externalize-deps`, extensionLibrary);
    });

    it("should contain the plugin", () => {
      shouldAddPlugin(`${domain}:extension-library`, extensionLibrary);
    });

    it("should turn minification off", () => {
      shouldSetConfig(
        false,
        `${domain}:extension-library`,
        (c) => c?.build?.minify,
        extensionLibrary,
      );
    });

    it("should generate source maps", () => {
      shouldSetConfig(
        true,
        `${domain}:extension-library`,
        (c) => c?.build?.sourcemap,
        extensionLibrary,
      );
    });
  });
});
