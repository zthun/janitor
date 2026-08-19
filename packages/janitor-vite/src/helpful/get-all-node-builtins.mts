import { builtinModules as modules } from "node:module";

export function getAllNodeBuiltins(): RegExp[] {
  return modules.map((m) => new RegExp(`^(?:node:)?${m}$`));
}
