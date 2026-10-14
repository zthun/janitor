# ESLint Config

This is the shared eslint configuration for zthun scoped projects.

## Getting Started

```sh
# NPM
npm install @zthun/janitor-eslint-config eslint prettier --save-dev

# Yarn
yarn add @zthun/janitor-eslint-config eslint prettier --dev
```

## Usage

This package is only for a flat config. The legacy config is no longer
supported.

The lint files are divided into multiple configurations for each project, but
for zthun scoped projects, you'll just use the recommended.

In your eslint.config.mjs file, add the following.

```ts
import { environments, recommended } from "@zthun/janitor-eslint-config";

export default [...recommended, ...environment.node];
```

That's it. You now have the recommended rules for zthun scoped projects with
typescript.

## Available configs

| Config | For | In Recommended |
| ------ | --- | -------------- |

## Environments

You will probably need to add at least one environment to your eslint config.
There are two main environments. You can add plugins for various globals by
adding fields from the environment structure.

| Environment                               | For                                 |
| ----------------------------------------- | ----------------------------------- |
| [browser](./lib/configs/environments.mjs) | Adds browser based globals          |
| [node](./lib/configs/environments.mjs)    | Adds node globals and node builtins |
