import { describe, expect, it } from "vitest";

import { ZViteLibraryBuilder } from "./vite-library-builder.mjs";

describe("Vite Library Builder", () => {
  const createTestTarget = () => new ZViteLibraryBuilder();

  describe("Entry", () => {
    it("should add the index entry", () => {
      // Arrange.
      const target = createTestTarget();
      const name = "index";
      const path = "./src/index.mts";

      // Act.
      const actual = target.index().build();

      // Assert.
      expect(actual.entry[name]).toEqual(path);
    });

    it("should add a new entry", () => {
      // Arrange.
      const target = createTestTarget();
      const name = "lol-wut";
      const path = "lol/wut.mts";

      // Act.
      const actual = target.index().entry(name, path).build();
      const { entry } = actual;

      // Assert.
      expect(Object.keys(entry).length).toEqual(2);
      expect(entry[name]).toEqual(path);
    });
  });
});
