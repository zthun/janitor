import { cloneDeep } from "lodash-es";
import { InlineConfig, VitestEnvironment } from "vitest/node";

export class ZViteTestBuilder {
  private test: InlineConfig;

  public constructor() {
    this.test = {
      environment: "node",
      testTimeout: 30000,
      coverage: {
        all: false,
        provider: undefined,
      },
    };
  }

  public name(name: string) {
    this.test.name = name;
    return this;
  }

  public environment(environment: VitestEnvironment) {
    this.test.environment = environment;
    return this;
  }

  public node = this.environment.bind(this, "node");
  public browser = this.environment.bind(this, "happy-dom");

  public coverage(provider: "v8" | "istanbul") {
    this.test.coverage.provider = provider;
    return this;
  }

  public v8 = this.coverage.bind(this, "v8");
  public istanbul = this.coverage.bind(this, "istanbul");

  public build() {
    return cloneDeep(this.test);
  }
}
