# Janitor Vite

This is a set of common plugins for vite that simplifies build setup.

## Getting Started

```sh
# NPM
npm install @zthun/janitor-vite --save-dev
# Yarn
yarn add @zthun/janitor-vite --dev
```

## Projects

The first step is to pick your project type. What are you building?

| Type     | Description                                             |
| -------- | ------------------------------------------------------- |
| Node     | Basic node command line app.                            |
| CLI      | Same as node. Here for semantics.                       |
| NestJS   | Same as node. Here for semantics.                       |
| DOM      | A browser based application.                            |
| React    | A DOM application that uses react as the framework.     |
| Monorepo | You're building multiple things in the packages folder. |

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { projectMonorepo } from "@zthun/janitor-vite";

export default defineConfig({
  plugins: [projectMonorepo()],
});
```

## Extensions

After you have the type of project you're building, you can use available
extensions to modify the project with extra features.

| Type        | Description                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| Library     | Turns your project into an npm library. Usually only used with the base project or a dom project.           |
| Externalize | Externalizes your dependencies so they are not bundled. If you build a library, you get this automatically. |
| DevServer   | Adds a dev server. Usually paired with a dom project.                                                       |

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { project, extensionLibrary } from "@zthun/janitor-vite";

// Basic library for browsers and node.
export default defineConfig({
  plugins: [project(), extensionLibrary()],
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { projectReact, extensionLibrary } from "@zthun/janitor-vite";

// Builds a react library.
export default defineConfig({
  plugins: [projectReact(), extensionLibrary()],
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { projectCli, extensionExternalize } from "@zthun/janitor-vite";

// Builds a cli that does not bundle dependencies.
export default defineConfig({
  plugins: [projectCli(), extensionExternalize()],
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { projectReact, extensionDevServer } from "@zthun/janitor-vite";

// Basic react application
export default defineConfig({
  plugins: [projectReact(), extensionDevServer()],
});
```
