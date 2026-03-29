import { describe, expect, it } from "vitest";

import { ZJanitorOptionsBuilder } from "./janitor-options.mjs";
import { ZJanitorOptionsLintBuilder } from "./janitor-options-lint.mjs";

describe("ZJanitorOptions", () => {
  const createTestTarget = () => new ZJanitorOptionsBuilder();

  describe("Lint", () => {
    it("should set lint options", () => {
      // Arrange.
      const expected = new ZJanitorOptionsLintBuilder()
        .esFile(["**/*.js", "**/*.ts"])
        .build();

      // Act.
      const actual = createTestTarget().lint(expected).build();

      // Assert.
      expect(actual.lint).toEqual(expected);
    });
  });
});
