import type { UserConfig } from "vite";

import { extensionLibrary, project } from "./src/index.mjs";

export default function config(): UserConfig {
  return {
    plugins: [project(), extensionLibrary()],
  };
}
