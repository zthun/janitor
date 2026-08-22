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

> Note that there is no @types support for intersection between node and
> browsers, thus universal just uses the default types, which does include some
> exclusive apis. You will need to have the discipline to not use browser or
> node exclusive apis at the moment, and if you do, you will be responsible for
> fixing it until an intersection package is available. For today, universal is
> the same as base, but is just included for semantics so those reading the
> tsconfig know that the project is meant to run against node and browsers.

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

### React Apps

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
