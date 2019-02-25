Description
===
Zthun's web styles is a collection of lint files and tools that easily allow you to validate coding standards.

Getting Started
===
```sh
npm install @zthun/web-styles --save-dev
```

You may want to create local lint files.  The main purpose of this is to have maximum support with different editors.

```
ln -s node_modules/@zthun/web-styles/lint/.eslintrc .eslintrc
ln -s node_modules/@zthun/web-styles/lint/.tslint.json tslint.json
ln -s node_modules/@zthun/web-styles/lint/.sass-lint.yml .sass-lint.yml
ln -s node_modules/@zthun/web-styles/lint/.htmlhintrc .htmlhintrc
```

Alternatively, eslint, tslint, and sass-lint allow you to create non soft linked files that extend other configs.  This way is recommended for Windows users since windows doesn't really have the concept of symbolic links and can't really read them as shortcuts.

```
.eslintrc =>
{
    "extends": "./node_modules/@zthun/web-styles/lint/.eslintrc"
}

tslint.json =>
{
    "extends": "./node_modules/@zthun/web-styles/lint/tslint.json"
}

.sass-lint.yml =>
options:
    config-file: './node_modules/@zthun/web-styles/lint/.sass-lint.yml'
```

In your package json, add the following

```
"scripts": {
    "lint": "zlint"
},
"zlint": {
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

Contents
===
The following styling options are included in this package under the lint folder.

|Config File|For|Description|
|-----------|---|-----------|
|.htmlhintrc|HTML|Used for [htmlhint](http://htmlhint.com/) checks.|
|.sass-lint.yml|SASS|Used for [sasslint](https://github.com/sasstools/sass-lint) checks.|
|.eslintrc|Javascript|Used for [eslint](http://eslint.org/) checks.|
|tslint.json|Typescript|Used for [tslint](https://palantir.github.io/tslint/) checks.|

Usage
===
**zlint** [options]

|Option|Alias|Description|Type|
|------|-----|-----------|----|
|--version||Show version number|boolean|
|--config |-c|Optional config file to use.|string|
|--help||Show help|boolean|

Config File
===
If you do not specify a config file on the command line, the linter will look at your package.json file for a key named **zlint**.

Please note that having any values undefined will mean that the linter for those files will be skipped.

|Key|Description|Type|Default|
|---|-----------|----|-------|
|esConfig|The path to the .eslintrc file|string|node_modules/@zthun/web-styles/lint/.eslintrc|
|tsConfig|The path to the tslint.json file|string|node_modules/@zthun/web-styles/lint/tslint.json|
|sassConfig|The path to the .sass-lint.yml file|string|node_modules/@zthun/web-styles/lint/.sass-lint.yml|
|htmlConfig|The path to the .htmlhintrc file|string|node_modules/@zthun/web-styles/lint/.htmlhintrc|
|esFiles|The javascript file globs to lint|array|undefined|
|tsFiles|The typescript file globs to lint|array|undefined|
|sassFiles|The sass file globs to lint|array|undefined|
|htmlFiles|The html file globs to lint|array|undefined|
|jsonFiles|The json file globs to lint|array|undefined|
|yamlFiles|The yml file globs to lint|array|undefined|
