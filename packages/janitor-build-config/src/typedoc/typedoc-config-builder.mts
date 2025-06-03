import { cloneDeep } from "lodash-es";
import { EntryPointStrategy, TypeDocOptions } from "typedoc";

export class ZTypedocConfigBuilder {
  private typedoc: TypeDocOptions = {
    entryPoints: [],
    exclude: [],
  };

  public out(path: string) {
    this.typedoc.out = path;
    return this;
  }

  public dist = this.out.bind(this, "./dist");

  public entryPoints(globs: string[]) {
    this.typedoc.entryPoints = globs;
    return this;
  }

  public entry(glob: string) {
    const points = this.typedoc.entryPoints.concat(glob);
    return this.entryPoints(points);
  }

  public index = this.entry.bind(this, "./src/index.ts");

  public entryPointStrategy(strategy: EntryPointStrategy) {
    this.typedoc.entryPointStrategy = strategy;
    return this;
  }

  public entryPointResolve = this.entryPointStrategy.bind(this, "resolve");
  public entryPointPackages = this.entryPointStrategy.bind(this, "packages");

  public excludeNotDocumented() {
    this.typedoc.excludeNotDocumented = true;
    return this;
  }

  public categorizeByGroup() {
    this.typedoc.categorizeByGroup = true;
    return this;
  }

  public name(name: string) {
    this.typedoc.name = name;
    return this;
  }

  public favicon(path: string) {
    this.typedoc.favicon = path;
    return this;
  }

  public excludes(exclude: string[]) {
    this.typedoc.exclude = exclude;
    return this;
  }

  public exclude(glob: string) {
    const excludes = this.typedoc.exclude.concat(glob);
    return this.excludes(excludes);
  }

  public project() {
    return this.entryPointStrategy("resolve").out("./dist");
  }

  public web() {
    return this.entryPointPackages().excludeNotDocumented().categorizeByGroup();
  }

  public build() {
    return cloneDeep(this.typedoc);
  }
}
