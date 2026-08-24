# Description

This package contains shared tsconfig presets used across @zthun scoped
projects.

The configs are composable: start with `base.json` and layer on the
environment-specific presets you need.

## Install

```sh
# NPM
npm i @zthun/janitor-ts-config typescript --save-dev

# Yarn
yarn add @zthun/janitor-ts-config typescript --dev
```

## Available presets

| Project | Description                                                                                   |
| ------- | --------------------------------------------------------------------------------------------- |
| base    | Strict defaults aimed as the root for all possible configurations                             |
| node    | Node based projects. Removes the DOM lib. Should always be paired with base.                  |
| browser | Browser based projects. Should always be paired with base                                     |
| nest-js | Node based projects with the NestJS framework. Should always be paired with node and base     |
| react   | Browser based project with the React framework. Should always be paired with browser and base |

## Usage examples

### Library for both browser and node

```json
{
  "$schema": "https://www.schemastore.org/tsconfig",
  "extends": ["@zthun/janitor-ts-config/base.json"]
}
```

### Browser

```json
{
  "$schema": "https://www.schemastore.org/tsconfig",
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/browser.json"
  ]
}
```

### React

```json
{
  "$schema": "https://www.schemastore.org/tsconfig",
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/browser.json",
    "@zthun/janitor-ts-config/react.json"
  ]
}
```

### Node

Note that for node, you may need to be explicit when using @types/node globals.

```json
{
  "$schema": "https://www.schemastore.org/tsconfig",
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/node.json"
  ],
  "compilerOptions": {
    "types": ["node"]
  }
}
```

### NestJS

```json
{
  "$schema": "https://www.schemastore.org/tsconfig",
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/node.json",
    "@zthun/janitor-ts-config/nest-js.json"
  ]
}
```
