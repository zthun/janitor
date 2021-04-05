# Lint Janitor

Code gets messy. You will find that most places you work at will always have a big long list of tech debt tasks that need to be taken care of and this becomes a maintenance nightmare as it becomes very expensive to fix. Companies rarely want to let developers fix these issues because they tend to only look at the short term ROI, which isn't high for this kind of task. What then happens is that more functional, but messy, code gets introduced and the software begins to rot.

One way to fix something like this is to start with linters. Linters will scour through your code base and notify you that you have various issues. In a good development pipeline, they will prevent developers from generating a messy room and will force them to write clean consistent code with the rest of the development team. They aren't a silver bullet, and messy solutions can still crop up, but linters take care of most of the inconsistent and formatting errors that can develop in a code base. Good developers love them - it keeps the entire team consistent in their code structure.

Of course, linters are not without their issues as well. There's an outrageous amount of them out there and you have to be well versed in each one of them in order to set each one of them up and run them in your pipeline to verify all of the different code files you have. There's linters for code, applications, spelling, and formatting; it's easy to get overwhelmed.

**Lint Janitor** was created under the guise that there is beauty in simplicity. Having a single application that takes care of ones needs leads to greater happiness then having to piece meal together tons of tools, each with individual needs and maintainability issues. Just let **Lint Janitor** do the heavy lifting for you.

## Getting Started

```sh
# NPM
npm install @zthun/lint-janitor --save-dev
# Yarn
yarn add @zthun/lint-janitor --dev
```

## Configuration

Lint Janitor uses an opt-in approach to linting, meaning that it will not lint any files that you do not tell it to lint. You will need to add a configuration file that describes the list of files to lint and the sub configurations of each internal linter. Each linter is described in further detail. In the end, the expectation is that you will provide you're own collection of shared configurations that you can reuse in all your projects.

Lint Janitor uses the [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) standard for loading its configuration. In short, it will search the current working directory for the following files:

1. A property in your package.json named **lint-janitor**.
1. A json file or yaml file named **lint-janitorrc**.
1. A json file named **lint-janitorrc.json**.
1. A yaml file named **lint-janitorrc.yaml** or **lint-janitorrc.yml**.
1. A javascript file named **lint-janitorrc.js**, **lint-janitor.config.js**.

> It is highly recommended to use a config.js convention for these types of configurations. The main reason is that config.js offers the most flexible way to configure an application and also naturally allows you to use the module syntax to import other configurations.

The configuration file uses the following schema.

```ts
{
  // The configuration file or module for ECMAScript based linting.
  esConfig?: string;
  // The configuration file or module for CSS, Less, and Sass based linting.
  styleConfig?: string;
  // The configuration file or module for HTML linting.
  htmlConfig?: string;
  // The configuration file or module for Markdown based linting
  markdownConfig?: string;
  // The configuration file or module for Spelling checks
  spellingConfig?: string;
  // The configuration file or module for formatting checks
  prettyConfig?: string;

  // The white list of ECMAScript globs to lint.  This should include
  // JavaScript and TypeScript based files
  esFiles?: string[];
  // The white list of CSS, Less, and Sass globs to lint.
  styleFiles?: string[];
  // The white list of HTML globs to lint.
  htmlFiles?: string[];
  // The white list of Markdown globs to lint.
  markdownFiles?: string[];
  // The white list of JSON globs to lint.
  jsonFiles?: string[];
  // The white list of YAML globs to lint.
  yamlFiles?: string[];
  // The white list of globs to check for spelling errors.
  spellingFiles?: string[];
  // The white list of globs to check for code formatting.
  prettyFiles?: string[];
}
```

The following is an example configuration that lint-janitor will read.

```js
// lint-janitor.config.js

module.exports = {
  // Configurations are generally optional and will load using the
  // default rules of the application if not specified.  However, you
  // can always override the configurations in this file.
  esConfig: 'configs/.eslintrc',
  // Using globs to find files
  esFiles: ['packages/**/src/**/*.ts'],
  // The configurations can also be shared configuration modules
  // found in node_modules if you're not using IDE extensions.
  styleConfig: '@zthun/stylelint-config';
  // Globs are relative to the current working directory.
  styleFiles: ['packages/**/src/**/*.less'],
  // See notes on html below
  htmlFiles: ['packages/**/src/**/*.html'],
  // You can have as many globs as you want.
  markdownFiles: ['packages/**/*.md', '*.md'],
  // You can also specify specific files - json and yaml have no
  // configurations as they are very specific formats.
  jsonFiles: ['package.json'],
  // Removes the linter
  spellingFiles: null
};
```

In your package json, add the following

```sh
"scripts": {
    "lint": "lint-janitor"
}
```

Now you can lint everything with a single command.

```sh
# NPM
npm run lint
# Yarn
yarn lint
# NPX
npx lint-janitor
```

## Command Line

You can always run lint-janitor on the command line using npx or if it is installed globally, which is not recommended. There are very few command line options, as lint-janitor intends to be fully driven by the config file.

**lint-janitor** [options]

| Option    | Alias | Description                  | Type    |
| --------- | ----- | ---------------------------- | ------- |
| --version |       | Show version number          | boolean |
| --config  | -c    | Optional config file to use. | string  |
| --help    |       | Show help                    | boolean |

## Linters

### Shared Configurations

While you can always recreate individual configurations for each linter, it is **HIGHLY** recommended to create a set of shared configurations for your organization. Most linters supported by Lint Janitor have some form of support for extending configurations and sharing them so you don't need to reinvent the wheel. In the place that such extensions are missing, Lint Janitor attempts to bridge this gap but it will not add support for IDE based tooling and extensions. You'll have to decide what's best for your project and your organization.

One note is that the housing repository for lint-janitor contains multiple shared configurations used by @zthun scoped projects. You can use them, but it is recommended for your organization to create it's own set of configurations that meets its needs.

### JSON and YAML

JSON does not use an external tool. It's impossible to have lint errors in JSON as if there are, it wouldn't be valid JSON and you won't be able to parse it. Thus, when we talk about linting JSON, it's really just a parse check to make sure you're JSON is valid.

For YAML, the same rule applies. It's just a parse check, but since YAML isn't supported in JavaScript out of the box, it uses [js-yaml](https://www.npmjs.com/package/js-yaml) under the hood to parse and check your files.

Neither of these checks verify schemas so be warned about that.

### ECMAScript

The linter of choice for ECMAScript, is [ESLint](https://eslint.org/). ESLint has a very large eco system with support for shared configurations and plugins. It supports both TypeScript and JavaScript so it covers the entire feature spectrum. The configuration file for ESLint uses something similar to a [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) standard but it's more restrictive. Instead, it looks for the following files in the current working directory.

1. .eslintrc.js
1. .eslintrc.cjs
1. .eslintrc.yaml
1. .eslintrc.yml
1. .eslintrc.json
1. package.json

There is also a [VisualStudio Code plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) that will give you highlighting for any linting errors while you type. This makes ESLint the go to linter for web based ECMAScript code.

For the configuration schema, you can find it [here](https://eslint.org/docs/user-guide/configuring/). If you create a shared configuration, as recommended, you can simply add that to the extends key in the ESLint configuration file to share configuration throughout your organization.

```js
// .eslintrc.js
module.exports = require('@zthun/eslint-config');
```

### Styles (CSS, Less, SASS)

There are several linters for style based files.

1. [CSSLint](https://github.com/CSSLint/csslint)
2. [SassLint](https://github.com/sasstools/sass-lint)
3. [StyleLint](https://stylelint.io/)

CSSLint and SassLint are no longer actively maintained. Thus, for linting style based files, Lint Janitor uses StyleLint under the hood.

StyleLint is similar to [ESLint](https://eslint.org/). It too, has a nice ecosystem of plugins and it supports shared configurations. Stylelint, unlike ESLint, does support the [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) standard, but it is recommended to use .stylelintrc.json convention. The main reason is that the actual [VisualStudio Code plugin](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) specifically looks for this file so you can get lint errors directly in your IDE.

You can find the configuration schema [here](https://stylelint.io/user-guide/configure) and you can use the extends key in the configuration to load a shared configuration.

```jsonc
// .stylelintrc.json
{
  "extends": ["@zthun/stylelint-config"]
}
```

As usual, the list of html rules are [here](https://htmlhint.com/docs/user-guide/list-rules).

### HTML

There is not a lot of support for HTML linters. There is only really one that is used and it is somewhat old and doesn't have a lot of support. A promise of a 1.0.0 release has been made, but we will have to wait and see what happens. That application is [HTMLHint](https://github.com/htmlhint/HTMLHint).

HTMLHint does NOT support shared configurations at all. To do that, [this issue](https://github.com/htmlhint/HTMLHint/issues/621) would need to be approved and supported. In the meantime, Lint Janitor bridges this gap by sending just the content to HTMLHint instead of the file list. This allows Lint Janitor to implement a [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) standard for loading and extending the configuration to support shared configs. It will be up to you if you want to do this because the [VisualStudio Code plugin](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint) does not support this and expects the standard json file to be at the root of your project.

If you do choose to use a shared configuration, you can just use a htmlhint.config.js file at the root of your repository.

```js
//htmlhint.config.js
module.exports = require('@zthun/htmlhint-config');
```

### Markdown

Good old markdown has a couple of linters available, but considering that [MarkdownLint](https://github.com/DavidAnson/markdownlint) has a working [VisualStudio Code plugin](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint), that's the one that Lint Janitor uses.

MarkdownLint searches for the following configuration files at the root of your repository.

1. .markdownlint.json
1. .markdownlint.yaml or .markdownlint.yml
1. .markdownlintrc

Strangely enough, if you are using the vscode plugin, then it is recommended to just use the .markdownlintrc name because that seems to be the only one that the plugin will respect. There's not a lot of rules to markdown. You can find the list of rules [here](https://github.com/DavidAnson/markdownlint). While it's not documented, MarkdownLint does have support for shared configurations, but there is a gotcha with it. The actual shared configuration MUST be in a json format. If you are creating a shared configuration for markdown, you will want to export a module of it and also have an actual json formatted file that comes along with it.

```json
{
  "extends": "@zthun/markdownlint-config/as-json"
}

// node_modules/@zthun/markdownlint-config/as-json.json
{
  "line-length": false,
  "no-inline-html": false,
  "no-duplicate-heading": false
}
```

You can still export a node module that has your shared configuration.

```js
// index.js
module.exports = require('./as-json.json');
```

### Spelling

This one is pretty optional, but it's useful in that it keeps you honest. With spelling, you won't use a shared configuration as this is truly unique across all projects. It is not possible to have a be all end all language that knows every word in existence so this will look for the [CSpell](https://www.npmjs.com/package/cspell) configuration at the root of the repository. If you combine this with the [VisualStudio Code plugin](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker), it's pretty powerful and lets you add words as the repository vocabulary grows. When using spelling here, you'll need to decide if there are words you want to support, what dictionaries your repository is going to support, and what are your forbidden words and phrases. There are no rules here, just lists of allowed words and dictionaries.

You may want to consider having a shared dictionary for your organizations custom lingo. You can do this through the dictionaryDefinitions key, but you'll have to export a txt file for reuse.

```json
// cspell.json
{
  "version": "0.1",
  "$schema": "https://raw.githubusercontent.com/streetsidesoftware/cspell/master/cspell.schema.json",
  "language": "en",
  "words": ["errored"],
  "dictionaries": ["typescript", "en_US"]
}
```

### Formatting

Finally, and possibly most importantly, is code formatting consistency. There are generally two tools that are used for this.

1. [EditorConfig](https://editorconfig.org/)
1. [Prettier](https://prettier.io/)

For code formatting, Lint Janitor went with Prettier since it supports all the features of EditorConfig and a bunch of others. Prettier also supports shared configurations and is highly recommended to use them because the [VisualStudio Code plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) has support to auto format your files when you save them, making sure that your teams formatting is completely consistent.

It's file lookup is similar to that of ESLint, but we recommended using .prettierrc.js to enable support for shared configurations.

```js
//.prettierrc.js
module.exports = require('@zthun/prettier-config');
```

Options are [here](https://prettier.io/docs/en/options.html), and there's not a lot of them. See [why](https://prettier.io/docs/en/option-philosophy.html), as there's a good reason for this.

When doing formatting linting, only the formatting is checked and you are notified if the files are formatted or unformatted. The best way to prevent these issues all together is to just use the Prettier IDE extension and auto format as you type.

### FAQ

Q. Can this support my other favorite linter?

A. Possibly, but whether or not Lint Janitor will bother at the moment depends on a few factors:

1. Is there an IDE plugin that makes it so you can validate, lint, and cleanup while you go along so you're not left with a lot of surprises at the end?
1. Does the linter support shared configuration to not reinvent the wheel everywhere? Does Lint Janitor have to bridge that gap?
1. Is the linter in question a node linter that has its API exported and can be integrated into a node application? **Important!**

If you answered No to the last question, then the answer is No. Lint Janitor does not invoke external command lines of linters and instead calls into their node API directly. This is how Lint Janitor succeeds in not having you worry about what tools to install and what versions; it uses transitive dependencies.

If the last question is a Yes, then it becomes a question of, is it worth it? That'll need to be prioritized. For the most part, using [Prettier](https://prettier.io/) takes care of almost all linting issues so you may not need more than what is available here. If you need the mother of all linters, there is the heavy [Mega Linter](https://github.com/nvuillam/mega-linter) which aggregates every linter in existence. Very cool, but a bit overkill for the solution we are trying to solve with Lint Janitor.

Q. Is there an IDE plugin for Lint Janitor?

A. Not yet. That would solve the issue of wanting an IDE plugin for each individual linter and would allow you to just have a single lint-janitor.config.js file at the root of your repository that would handle all linting needs. There is one planned, but it still need to be researched and scoped out.
