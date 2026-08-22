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

| Name      | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| base      | Core file that should always be included                           |
| universal | Project libraries that output for both node and browsers           |
| node      | Specific to projects that output only for node                     |
| browser   | Specific to projects that only target the browser                  |
| nest-js.  | Specific to projects that target node using the nest-js framework  |
| react     | Specific to projects that target browsers with the react framework |

## Usage examples

### Universal libraries for node and browser

```json
{
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/universal.json"
  ],
  "include": ["**/*.ts", "**/*.mts"]
}
```

### Node apps

```json
{
  "extends": [
    "@zthun/janitor-ts-config/base.json",
    "@zthun/janitor-ts-config/node.json"
  ],
  "include": ["**/*.ts"]
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
  "include": ["**/*.ts", "**/*.tsx"]
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
  "include": ["**/*.ts"]
}
```

Adjust `include`, `paths`, and `baseUrl` to fit your project layout as needed.
