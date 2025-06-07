import { describe, expect, it } from "vitest";
import { ZLinterSilent } from "./linter-silent.mjs";

describe("ZLinterSilent", () => {
  it("resolves to true.", async () => {
    // Arrange
    const target = new ZLinterSilent();
    // Act
    const actual = await target.lint();
    // Assert
    expect(actual).toBeTruthy();
  });

  it("resolves to false.", async () => {
    // Arrange
    const target = new ZLinterSilent(false);
    // Act
    const actual = await target.lint();
    // Assert
    expect(actual).toBeFalsy();
  });
});
