Description
===

Zthun's web styles is a collection of lint files that can be used with build tools to validate coding styles.

Getting Started
===

```sh
npm install @zthun/web-styles --save-dev
```

You'll want to create local lint files.  The main purpose of this is to have maximum support with different editors.  The local files will have the minimum amount of content needed but will also allow you to locally modify project settings if needed.

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

.htmlhintrc =>
ln -s node_modules/@zthun/web-styles/lint/.htmlhintrc .htmlhintrc
```

In your package.json, add any of the following scripts.

```
"lint:js": "eslint src/**/*.js",
"lint:ts": "tslint src/**/*.ts",
"lint:sass": "sass-lint src/**/*.scss -v -q",
"lint:html": "htmlhint src/**/*.html",
"lint": "npm run lint:js && npm run lint:ts && npm run lint:sass && npm run lint:html"
```

You can now run the linters in your project directory as well as get hints in your editors given the project rules.

```sh
npm run lint
```

Contents
===
The following styling options are included in this package under the lint folder.

|Config File|For|Description|
|-----------|---|-----------|
|.htmlhintrc|HTML|Used for [htmlhint](http://htmlhint.com/) checks.|
|.sasslint.yml|SASS|Used for [sasslint](https://github.com/sasstools/sass-lint) checks.|
|.eslintrc|Javascript|Used for [eslint](http://eslint.org/) checks.|
|tslint.json|Typescript|Used for [tslint](https://palantir.github.io/tslint/) checks.|

You will also automatically receive all of the tools necessary for running lint checks along with this package so you do not need to install additional tools to use the linters.
