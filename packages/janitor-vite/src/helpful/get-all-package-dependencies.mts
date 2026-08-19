import { type PathLike, readFileSync } from "node:fs";

export function getAllPackageDependencies(pkg: PathLike): RegExp[] {
  try {
    const externals = new Set<RegExp>();

    const contents = readFileSync(pkg).toString();
    const {
      dependencies = [],
      devDependencies = [],
      optionalDependencies = [],
      peerDependencies = [],
    } = JSON.parse(contents) as Record<string, Record<string, string>>;

    const push = externals.add.bind(externals);

    Object.keys(dependencies)
      .concat(Object.keys(devDependencies))
      .concat(Object.keys(optionalDependencies))
      .concat(Object.keys(peerDependencies))
      .map((dep) => new RegExp(`^${dep}(?:/.+)?$`))
      .forEach(push);

    return Array.from(externals);
  } catch {
    return [];
  }
}
