# Description

This application is a collection of lint files and tools that easily allow you to validate coding standards without having to install a lot of different lint tools.

# Getting Started

```sh
npm install @zthun/linters --save-dev
```

You may want to create local lint files. The main purpose of this is to have maximum support with different editors.

```
ln -s node_modules/@zthun/linters/lint/.eslintrc .eslintrc
ln -s node_modules/@zthun/linters/lint/.sass-lint.yml .sass-lint.yml
ln -s node_modules/@zthun/linters/lint/.htmlhintrc .htmlhintrc
```

Alternatively, eslint, stylelint, and sass-lint allow you to create non soft linked files that extend other configs. This way is recommended for Windows users since windows doesn't really have the concept of symbolic links and can't really read them as shortcuts.

```
.eslintrc =>
{
    "extends": "./node_modules/@zthun/web-styles/lint/.eslintrc"
}

.sass-lint.yml =>
options:
    config-file: './node_modules/@zthun/web-styles/lint/.sass-lint.yml'
```

In your package json, add the following

```
"scripts": {
    "lint": "linters"
},
"linters": {
    "esFiles": ["globs/to/js-files"],
    "tsFiles": ["globs/to/ts-files"],
    "sassFiles": ["globs/to/sass-files"],
    "htmlFiles": ["globs/to/html-files"],
    "jsonFiles": ["glob/to/json-files"],
    "yamlFiles": ["globs/to/yaml-files"]
}
```

Now you can run linting with

```
npm run lint
```

# Contents

The following styling options are included in this package under the lint folder.

| Config File       | For        | Description                                                         |
| ----------------- | ---------- | ------------------------------------------------------------------- |
| .htmlhintrc       | HTML       | Used for [htmlhint](http://htmlhint.com/) checks.                   |
| .sass-lint.yml    | SASS       | Used for [sasslint](https://github.com/sasstools/sass-lint) checks. |
| .eslintrc         | Javascript | Used for [eslint](http://eslint.org/) checks.                       |
| .stylelintrc.json | Styles     | Used for [stylelint](https://stylelint.io/) checks.                 |

# Usage

**linters** [options]

| Option    | Alias | Description                  | Type    |
| --------- | ----- | ---------------------------- | ------- |
| --version |       | Show version number          | boolean |
| --config  | -c    | Optional config file to use. | string  |
| --help    |       | Show help                    | boolean |

# Config File

If you do not specify a config file on the command line, the linter will look at your package.json file for a key named **linters**.

Please note that having any values undefined will mean that the linter for those files will be skipped.

| Key         | Description                            | Type   | Default                                              |
| ----------- | -------------------------------------- | ------ | ---------------------------------------------------- |
| esConfig    | The path to the .eslintrc file         | string | node_modules/@zthun/lint-janitor/lint/.eslintrc      |
| sassConfig  | The path to the .sass-lint.yml file    | string | node_modules/@zthun/lint-janitor/lint/.sass-lint.yml |
| htmlConfig  | The path to the .htmlhintrc file       | string | node_modules/@zthun/lint-janitor/lint/.htmlhintrc    |
| styleConfig | The path to the .stylelintrc.json file | string | node_modules/@zthun/lint-janitor/lint.stylelintrc    |
| esFiles     | The javascript file globs to lint      | array  | undefined                                            |
| sassFiles   | The sass file globs to lint            | array  | undefined                                            |
| styleFiles  | The style file globs to lint           | array  | undefined                                            |
| htmlFiles   | The html file globs to lint            | array  | undefined                                            |
| jsonFiles   | The json file globs to lint            | array  | undefined                                            |
| yamlFiles   | The yml file globs to lint             | array  | undefined                                            |
