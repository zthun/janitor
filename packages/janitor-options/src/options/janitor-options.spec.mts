import { describe, expect, it } from "vitest";
import { ZJanitorOptionsLintBuilder } from "./janitor-options-lint.mjs";
import { ZJanitorOptionsBuilder } from "./janitor-options.mjs";

describe("ZJanitorOptions", () => {
  const createTestTarget = () => new ZJanitorOptionsBuilder();

  describe("Lint", () => {
    it("should set lint options", () => {
      // Arrange.
      const expected = new ZJanitorOptionsLintBuilder()
        .esFiles(["**/*.js", "**/*.ts"])
        .styleFiles(["**/*.css", "**/*.scss"])
        .build();

      // Act.
      const actual = createTestTarget().lint(expected).build();

      // Assert.
      expect(actual.lint).toEqual(expected);
    });
  });
});
