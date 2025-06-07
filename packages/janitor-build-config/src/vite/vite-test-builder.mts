import { cloneDeep } from "lodash-es";
import type { InlineConfig, VitestEnvironment } from "vitest/node";

/**
 * A builder for test configurations found in vite's defineConfig test field.
 */
export class ZViteTestBuilder {
  private test: InlineConfig;

  /**
   * Initializes a new instance of this object.
   */
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

  /**
   * Sets the test environment.
   *
   * @param environment -
   *        The test environment to use.
   *
   * @returns
   *        This object.
   */
  public environment(environment: VitestEnvironment) {
    this.test.environment = environment;
    return this;
  }

  /**
   * Sets the test environment to "node".
   *
   * @returns
   *        This object.
   */
  public node = this.environment.bind(this, "node");

  /**
   * Sets the test environment to "happy-dom".
   *
   * @returns
   *        This object.
   */
  public browser = this.environment.bind(this, "happy-dom");

  /**
   * Sets the test coverage provider.
   *
   * @param provider -
   *        The test coverage provider to use.
   *
   * @returns
   *        This object.
   */
  public coverage(provider: "v8" | "istanbul") {
    this.test.coverage.provider = provider;
    return this;
  }

  /**
   * Sets the test coverage provider to "v8".
   *
   * @returns
   *        This object.
   */
  public v8 = this.coverage.bind(this, "v8");

  /**
   * Sets the test coverage provider to "istanbul".
   *
   * @returns
   *        This object.
   */
  public istanbul = this.coverage.bind(this, "istanbul");

  /**
   * Adds to the list of projects.
   *
   * @param project -
   *        The list of projects.
   *
   * @returns
   *        This object.
   */
  public project(project: string | string[] = []) {
    const projects = this.test.projects || [];
    this.test.projects = projects.concat(project);
    return this;
  }

  /**
   * Adds monorepo support to the test builder.
   *
   * @param packages -
   *        The path to the package directory.
   *
   * @returns
   *        This object.
   */
  public monorepo(packages = "packages") {
    return this.project(`${packages}/*/vitest.config.{js,cjs,mjs,ts,mts}`);
  }

  /**
   * Returns the built test configuration.
   *
   * @returns
   *        A deep clone of the test configuration.
   */
  public build() {
    return cloneDeep(this.test);
  }
}
