# ESLint Config

This is the shared eslint configuration for zthun scoped projects.

## Getting Started

```sh
# NPM
npm install @zthun/janitor-eslint-config eslint --save-dev

# Yarn
yarn add @zthun/janitor-eslint-config eslint --dev
```

## Usage

This package is only for a flat config. The legacy config is no longer
supported.

The lint files are divided into multiple configurations for each project, but
for zthun scoped projects, you'll just use the recommended.

In your eslint.config.mjs file, add the following.

```ts
import { environments, recommended } from "@zthun/janitor-eslint-config";

export default [...recommended, ...environments.node];
```

That's it. You now have the recommended rules for zthun scoped projects with
typescript. Note that using recommended also requires the prettier and
typescript node packages to be installed.

## Available configs

| Config                                     | For                                                                                           | Recommended |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- | ----------- |
| [html](./lib/configs/html.mjs)             | HTML linting                                                                                  | ✅          |
| [ignores](./lib/configs/ignores.mjs)       | Standard global ignores for generated files and build outputs                                 | ✅          |
| [javascript](./lib/configs/javascript.mjs) | JavaScript linting and import sorting                                                         | ✅          |
| [json](./lib/configs/json.mjs)             | JSON, JSONC, and JSON5 linting                                                                | ✅          |
| [markdown](./lib/configs/markdown.mjs)     | Markdown linting                                                                              | ✅          |
| [prettier](./lib/configs/prettier.mjs)     | Code formatting with Prettier. Requires [prettier](https://prettier.io/)                      | ✅          |
| [react](./lib/configs/react.mjs)           | React linting. Requires [react](https://react.dev/)                                           |             |
| [spelling](./lib/configs/spelling.mjs)     | Spell checking with a project dictionary                                                      | ✅          |
| [styles](./lib/configs/styles.mjs)         | CSS linting                                                                                   | ✅          |
| [test](./lib/configs/test.mjs)             | Vitest test linting                                                                           | ✅          |
| [typescript](./lib/configs/typescript.mjs) | TypeScript linting with type checking. Requires [typescript](https://www.typescriptlang.org/) | ✅          |
| [yaml](./lib/configs/yaml.mjs)             | YAML linting                                                                                  | ✅          |

## Environments

You will probably need to add at least one environment to your eslint config.
There are two main environments. You can add plugins for various globals by
adding fields from the environment structure.

| Environment                               | For                                 |
| ----------------------------------------- | ----------------------------------- |
| [browser](./lib/configs/environments.mjs) | Adds browser based globals          |
| [node](./lib/configs/environments.mjs)    | Adds node globals and node builtins |
