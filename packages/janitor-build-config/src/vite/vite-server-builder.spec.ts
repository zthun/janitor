import { describe, expect, it } from "vitest";

import { ZViteServerBuilder } from "./vite-server-builder.mjs";

describe("Vite Server Builder", () => {
  const createTestTarget = () => new ZViteServerBuilder();

  describe("Allowed Hosts", () => {
    it("should set the allowed hosts to true", () => {
      expect(createTestTarget().allowedHost(true).build().allowedHosts).toBe(
        true,
      );
    });

    it("should add allowed hosts", () => {
      const hostA = ".zthunworks.com";
      const hostB = ".z.com";
      expect(
        createTestTarget().allowedHost(hostA).allowedHost([hostB]).build()
          .allowedHosts,
      ).toEqual([hostA, hostB]);
    });

    it("should keep allowed hosts to true once it is true", () => {
      expect(
        createTestTarget()
          .denyAllHosts()
          .allowedHost(true)
          .allowedHost(".zthunworks.com")
          .build().allowedHosts,
      ).toBe(true);
    });
  });

  describe("Dev", () => {
    it("should set strict port", () => {
      expect(createTestTarget().dev().build().strictPort).toBe(true);
    });

    it("should set the host to 0.0.0.0 for remote docker debug support", () => {
      expect(createTestTarget().dev().build().host).toEqual("0.0.0.0");
    });

    it("should allow all hosts", () => {
      expect(createTestTarget().dev().build().allowedHosts).toBe(true);
    });
  });

  describe("Port", () => {
    it("should set the port", () => {
      const expected = 8956;
      expect(createTestTarget().port(expected).build().port).toEqual(expected);
    });

    it("should remove the port", () => {
      expect(createTestTarget().port(443).port().build().port).toBeUndefined();
    });
  });
});
