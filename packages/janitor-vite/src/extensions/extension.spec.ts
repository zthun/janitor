import { resolve } from "node:path";

import type { Plugin, UserConfig } from "vite";
import { describe, expect, it } from "vitest";

import type { ExtensionDevServerOptions } from "./extension-dev-server.mjs";
import { extensionDevServer } from "./extension-dev-server.mjs";
import type { ExternalizeOptions } from "./extension-externalize.mjs";
import { extensionExternalize } from "./extension-externalize.mjs";
import { extensionLibrary } from "./extension-library.mjs";
import { extensionTestSerially } from "./extension-test-serially.mjs";

describe("Extension", () => {
  const domain = "janitor";

  const shouldAddPlugin = (expected: string, fn: (args?: any) => Plugin[]) => {
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
    fn: Plugin[] | (() => Plugin[]),
  ) {
    // Arrange.
    const _fn = typeof fn === "function" ? fn : () => fn;

    // Act.
    const plugins = _fn();
    const plugin = plugins.find((p) => p.name === target);
    const config = plugin?.config as unknown as (() => UserConfig) | undefined;
    const configured = config?.();
    const actual = value(configured);

    // Assert.
    expect(actual).toEqual(expected);
  }

  describe("Externalize", () => {
    // Note that this test is ran at the root normally, so the root package.json
    // is used when not specified.
    const packageJson = resolve(import.meta.dirname, "../..", "package.json");

    const createTestTarget = (options?: ExternalizeOptions) => {
      const plugins = extensionExternalize(options);
      const plugin = plugins.find(
        (p) => p.name === `${domain}:extension-externalize`,
      )!;
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

    it("should add the externalize plugin", () => {
      shouldAddPlugin(`${domain}:extension-externalize`, extensionExternalize);
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
          shouldBeExternal(true, "lodash-es/some/child/module", {
            packageJson,
          });
        });
      });
    });

    describe("Node Builtins", () => {
      it("should be external for classic node", () => {
        shouldBeExternal(true, "path", { packageJson: false });
      });

      it("should be external for modern node", () => {
        shouldBeExternal(true, "node:fs", {
          packageJson: "/path/does/not/exist",
        });
      });

      it("should be. external for node with prefix only", () => {
        shouldBeExternal(true, "node:sqlite", {
          packageJson: import.meta.filename,
        });
      });
    });

    describe("Other", () => {
      it("should not be external", () => {
        shouldBeExternal(false, "../path/to/some/module.ts");
      });
    });
  });

  describe("Library", () => {
    it("should contain the externalize extension", () => {
      shouldAddPlugin(`${domain}:extension-externalize`, extensionLibrary);
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

  describe("Dev Server", () => {
    it("should add the plugin", () => {
      shouldAddPlugin(`${domain}:extension-dev-server`, extensionDevServer);
    });

    it("should bind to the correct host", () => {
      const options: ExtensionDevServerOptions = { host: "127.0.0.1" };
      shouldSetConfig(
        options.host,
        `${domain}:extension-dev-server`,
        (c) => c?.server?.host,
        extensionDevServer(options),
      );
    });

    it("should bind to the correct port", () => {
      const options: ExtensionDevServerOptions = { port: 5090 };

      shouldSetConfig(
        options.port,
        `${domain}:extension-dev-server`,
        (c) => c?.server?.port,
        extensionDevServer(options),
      );
    });
  });

  describe("Test Serially", () => {
    it("should add the plugin", () => {
      shouldAddPlugin(
        `${domain}:extension-test-serially`,
        extensionTestSerially,
      );
    });

    it("should turn off file parallelism", () => {
      shouldSetConfig(
        false,
        `${domain}:extension-test-serially`,
        (c) => c?.test?.fileParallelism,
        extensionTestSerially,
      );
    });

    it("should set max concurrency to 1", () => {
      shouldSetConfig(
        1,
        `${domain}:extension-test-serially`,
        (c) => c?.test?.maxConcurrency,
        extensionTestSerially,
      );
    });

    it("should run in isolate", () => {
      shouldSetConfig(
        true,
        `${domain}:extension-test-serially`,
        (c) => c?.test?.isolate,
        extensionTestSerially,
      );
    });
  });
});
