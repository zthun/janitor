# Description

This application is a collection of lint files and tools that easily allow you to validate coding standards without having to install a lot of different lint tools.

## Getting Started

```sh
npm install @zthun/lint-janitor --save-dev
```

You may want to create local lint files. The main purpose of this is to have maximum support with different editors. Eslint, stylelint, and markdownlint allow you to create files that extend other configs.

```sh
.eslintrc =>
{
    "extends": "./node_modules/@zthun/lint-janitor/lint/.eslintrc"
}

.stylelintrc =>
{
    "extends": "./node_modules/@zthun/lint-janitor/lint/.stylelintrc"
}

.markdownlintrc =>
{
    "extends": "./node_modules/@zthun/lint-janitor/lint/.markdownlintrc"
}
```

In your package json, add the following

```sh
"scripts": {
    "lint": "lint-janitor"
},
"lint-janitor": {
    "esFiles": ["globs/to/js-files"],
    "tsFiles": ["globs/to/ts-files"],
    "sassFiles": ["globs/to/sass-files"],
    "htmlFiles": ["globs/to/html-files"],
    "jsonFiles": ["glob/to/json-files"],
    "yamlFiles": ["globs/to/yaml-files"]
}
```

Now you can run linting with

```sh
npm run lint
```

## Contents

The following styling options are included in this package under the lint folder.

| Config File     | For        | Description                                                             |
| --------------- | ---------- | ----------------------------------------------------------------------- |
| .htmlhintrc     | HTML       | Used for [htmlhint](http://htmlhint.com/) checks.                       |
| .eslintrc       | Javascript | Used for [eslint](http://eslint.org/) checks.                           |
| .stylelintrc    | Styles     | Used for [stylelint](https://stylelint.io/) checks.                     |
| .markdownlintrc | Markdown   | Used for [markdown](https://github.com/DavidAnson/markdownlint) checks. |

## Usage

**lint-janitor** [options]

| Option    | Alias | Description                  | Type    |
| --------- | ----- | ---------------------------- | ------- |
| --version |       | Show version number          | boolean |
| --config  | -c    | Optional config file to use. | string  |
| --help    |       | Show help                    | boolean |

## Config File

If you do not specify a config file on the command line, the linter will look at your package.json file for a key named **lint-janitor**.

Please note that having any values undefined will mean that the linter for those files will be skipped.

| Key            | Description                          | Type   | Default                                               |
| -------------- | ------------------------------------ | ------ | ----------------------------------------------------- |
| esConfig       | The path to the .eslintrc file       | string | node_modules/@zthun/lint-janitor/lint/.eslintrc       |
| htmlConfig     | The path to the .htmlhintrc file     | string | node_modules/@zthun/lint-janitor/lint/.htmlhintrc     |
| styleConfig    | The path to the .stylelintrc file    | string | node_modules/@zthun/lint-janitor/lint/.stylelintrc    |
| markdownConfig | The path to the .markdownlintrc file | string | node_modules/@zthun/lint-janitor/lint/.markdownlintrc |
| esFiles        | The javascript file globs to lint    | array  | undefined                                             |
| styleFiles     | The style file globs to lint         | array  | undefined                                             |
| htmlFiles      | The html file globs to lint          | array  | undefined                                             |
| jsonFiles      | The json file globs to lint          | array  | undefined                                             |
| yamlFiles      | The yml file globs to lint           | array  | undefined                                             |
| markdownFiles  | The markdown file globs to lint      | array  | undefined                                             |
