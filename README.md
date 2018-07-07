Description
===

Zthun's web styles is a collection of lint files that can be used with build tools to validate coding styles.

Getting Started
===

```sh
npm install @zthun/web-styles --save-dev
```
In your package.json, add any of the following scripts.

```
"lint:js": "eslint src/**/*.js --config=node_modules/@zthun/web-styles/lint/.eslintrc",
"lint:ts": "tslint src/**/*.ts -c node_modules/@zthun/web-styles/lint/tslint.json",
"lint:sass": "sass-lint src/**/*.scss --config=node_modules/zwebstyles/.sasslint.yml -v -q",
"lint:html": "htmlhint src/**/*.html --config=node_modules/zwebstyles/.htmlhintrc",
"lint": "npm run lint:js && npm run lint:ts && npm run lint:sass && npm run lint:html"
```

You can now run the linters in your project directory.

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
