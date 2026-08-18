import type { UserConfig } from "vite";

export function resolveCwd(current?: UserConfig): string {
  return current?.root || process.cwd();
}
