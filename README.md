# Description

This application is a collection of lint files and tools that easily allow you to validate coding standards without having to install a lot of different lint tools.

## Getting Started

```sh
npm install @zthun/lint-janitor --save-dev
```

In your package json, add the following

```sh
"scripts": {
    "lint": "lint-janitor"
},
"lint-janitor": {
    "esFiles": ["globs/to/js-files"],
    "tsFiles": ["globs/to/ts-files"],
    "styleFiles": ["globs/to/style-files"],
    "htmlFiles": ["globs/to/html-files"],
    "jsonFiles": ["glob/to/json-files"],
    "yamlFiles": ["globs/to/yaml-files"]
}
```

Now you can run linting with

```sh
npm run lint
```

## Usage

**lint-janitor** [options]

| Option    | Alias | Description                  | Type    |
| --------- | ----- | ---------------------------- | ------- |
| --version |       | Show version number          | boolean |
| --config  | -c    | Optional config file to use. | string  |
| --help    |       | Show help                    | boolean |
