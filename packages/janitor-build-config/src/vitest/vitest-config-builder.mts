import { cloneDeep } from "lodash-es";
import { basename } from "node:path";
import { UserConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitestEnvironment } from "vitest/node";

export class ZVitestConfigBuilder {
  private config: UserConfig;

  public constructor(private readonly _dirname: string) {
    this.config = {
      plugins: [],
      test: {
        name: basename(_dirname),
        environment: "node",
        testTimeout: 30000,
        coverage: {
          all: false,
          provider: undefined,
        },
      },
    };
  }

  public typescript() {
    this.config.plugins = [...this.config.plugins, tsConfigPaths()];
    return this;
  }

  public environment(environment: VitestEnvironment) {
    this.config.test.environment = environment;
    return this;
  }

  public node = this.environment.bind(this, "node");
  public browser = this.environment.bind(this, "happy-dom");

  public coverage(provider: "v8" | "istanbul") {
    this.config.test.coverage.provider = provider;
    return this;
  }

  public v8 = this.coverage.bind(this, "v8");
  public istanbul = this.coverage.bind(this, "istanbul");

  public build() {
    return cloneDeep(this.config);
  }
}
