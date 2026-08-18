import { resolve } from "node:path";
import { cwd } from "node:process";

import type { LibraryOptions, Plugin, UserConfig } from "vite";
import { describe, expect, it } from "vitest";

import { project } from "./project.mjs";
import { projectCli } from "./project-cli.mjs";
import { projectDom } from "./project-dom.mjs";
import { projectNestJs } from "./project-nestjs.mjs";
import { projectNode } from "./project-node.mjs";
import { projectReact } from "./project-react.mjs";

describe("Project", () => {
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

  describe("Base", () => {
    it("should contain the plugin", () => {
      shouldAddPlugin(`${domain}:project`, project);
    });

    it("should minify the app", () => {
      shouldSetConfig(
        true,
        `${domain}:project`,
        (c) => c?.build?.minify,
        project,
      );
    });

    it("should not generate source maps", () => {
      shouldSetConfig(
        false,
        `${domain}:project`,
        (c) => c?.build?.sourcemap,
        project,
      );
    });

    it("should respect typescript paths", () => {
      shouldSetConfig(
        true,
        `${domain}:project`,
        (c) => c?.resolve?.tsconfigPaths,
        project,
      );
    });
  });

  describe("Dom", () => {
    it("should contain the base plugin", () => {
      shouldAddPlugin(`${domain}:project`, projectDom);
    });

    it("should contain the plugin", () => {
      shouldAddPlugin(`${domain}:project-dom`, projectDom);
    });

    it("should set the test environment to happy-dom", () => {
      shouldSetConfig(
        "happy-dom",
        `${domain}:project-dom`,
        (c) => c?.test?.environment,
        projectDom,
      );
    });
  });

  describe("React", () => {
    it("should contain the base plugin", () => {
      shouldAddPlugin(`${domain}:project`, projectReact);
    });

    it("should contain the dom plugin", () => {
      shouldAddPlugin(`${domain}:project-dom`, projectReact);
    });

    it("should contain the plugin", () => {
      shouldAddPlugin(`${domain}:project-react`, projectReact);
    });
  });

  describe("Node", () => {
    it("should contain the base plugin", () => {
      shouldAddPlugin(`${domain}:project`, projectNode);
    });

    it("should contain the plugin", () => {
      shouldAddPlugin(`${domain}:project-node`, projectNode);
    });

    it("should enter into the app at main.mts under the source folder", () => {
      const expected = resolve(cwd(), "./src/main.mts");
      shouldSetConfig(
        expected,
        `${domain}:project-node`,
        (c) => (c?.build?.lib as LibraryOptions).entry,
        projectNode,
      );
    });
  });

  describe("Cli", () => {
    it("should contain the base plugin", () => {
      shouldAddPlugin(`${domain}:project`, projectCli);
    });

    it("should contain the node plugin", () => {
      shouldAddPlugin(`${domain}:project-node`, projectCli);
    });

    it("should contain the plugin", () => {
      shouldAddPlugin(`${domain}:project-cli`, projectCli);
    });
  });

  describe("NestJs", () => {
    it("should contain the base plugin", () => {
      shouldAddPlugin(`${domain}:project`, projectNestJs);
    });

    it("should contain the node plugin", () => {
      shouldAddPlugin(`${domain}:project-node`, projectNestJs);
    });

    it("should contain the plugin", () => {
      shouldAddPlugin(`${domain}:project-nestjs`, projectNestJs);
    });
  });
});
