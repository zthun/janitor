import { defineConfig } from "vite";

import { projectMonorepo } from "./packages/janitor-vite/src/projects/project-monorepo.mjs";

export default defineConfig({ plugins: [projectMonorepo()] });
