# Description

This package contains shared tsconfig presets used across @zthun scoped projects.

The configs are stackable: start with `base.json` and layer on the
environment-specific presets you need.

## Install

```sh
# NPM
npm i @zthun/janitor-ts-config typescript --save-dev

# Yarn
yarn add @zthun/janitor-ts-config typescript --dev
```

## Available presets

- `base.json` — strict defaults aimed as the root for all possible configurations
- `node.json` — for node based projects.
- `browser.json` — for browser based projects.
- `react.json` — for projects that are browser based and use react as the framework
- `nest-js.json` — for node based projects that use nest-js as a framework.

## Usage examples

### Node Based - Libraries, CLIs, and Services

```json
{
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/node.json"
  ],
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src/**/*.ts"]
}
```

### Browser or React apps

```json
{
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/browser.json",
    "@zthun/janitor-ts-config/react.json"
  ],
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

### NestJS services

```json
{
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/node.json",
    "@zthun/janitor-ts-config/nest-js.json"
  ],
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src/**/*.ts"]
}
```

Adjust `include`, `paths`, and `baseUrl` to fit your project layout as needed.
