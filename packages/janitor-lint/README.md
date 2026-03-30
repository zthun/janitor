# Janitor Lint

Code gets messy. Most places you work will have a long backlog of tech-debt
tasks that never quite get addressed, and over time this becomes a maintenance
nightmare. Fixing old problems is expensive, and companies tend to focus on
short-term ROI — which means these issues often stay unresolved. New features
get built on top of messy foundations, and the software slowly begins to rot.

A common way to fight this is to start with linters. Linters scan your codebase
and notify you of issues. In a healthy development pipeline, they prevent
developers from creating a metaphorical messy room and encourage clean,
consistent code across the team. They’re not a silver bullet — messy solutions
can still appear — but linters eliminate most inconsistent patterns and
formatting errors. Good developers love them because they keep everyone aligned.

However, linters come with their own problems. There are so many of them. Each
has its own configuration style, quirks, and ecosystem. To cover your full
codebase, you often need multiple tools: ones for code quality, formatting,
spelling, applications, and more. It’s easy to feel overwhelmed, and maintaining
a stack of linters becomes its own form of tech debt.

Janitor Lint was created with the belief that there is beauty in simplicity. A
single tool that handles your linting needs is far better than stitching
together a pile of utilities, each with its own configuration and upkeep. Let
Janitor Lint take on the heavy lifting so you can keep your codebase clean — and
your developers happy.

## Install

```sh
yarn add -D @zthun/janitor-lint
# Optionally pull in the shared rules
yarn add -D @zthun/janitor-lint-config
```

## CLI

```sh
janitor-lint
```

- `--config` is optional. Without it, the CLI searches for a `janitor` config
  using cosmiconfig (in order: `package.json#janitor`, `janitorrc`,
  `janitorrc.json`, `janitorrc.yaml|yml`, `janitorrc.mjs`).
- Exit code is `0` when every enabled linter passes and `1` when any fail.

## Configuration shape

Janitor Lint reads a `janitor` options config object with a `lint` section.
Every field is optional—only the linters you configure will run. You can
configure this manually, OR you can use the package, @zthun/janitor-options, to
just build a configuration.

```ts
/**
 * Represents options for linting in the zthunworks janitor system.
 */
export interface IZJanitorOptionsLint {
  /**
   * The path to the config file for eslint.
   */
  esConfig?: string;
  /**
   * The path to the config file for markdownlint.
   */
  markdownConfig?: string;
  /**
   * The path to the config file for prettier.
   */
  prettyConfig?: string;
  /**
   * The path to the config file for cspell.
   */
  spellingConfig?: string;

  /**
   * The file globs to lint with eslint.
   */
  esFiles?: string[];
  /**
   * The file globs to lint with json.
   */
  jsonFiles?: string[];
  /**
   * The file globs to lint with markdownlint.
   */
  markdownFiles?: string[];
  /**
   * The file globs to lint with prettier.
   */
  prettyFiles?: string[];
  /**
   * The file globs to lint with cspell.
   */
  spellingFiles?: string[];
  /**
   * The file globs to lint with yaml.
   */
  yamlFiles?: string[];

  /**
   * The files globs to exclude from linting with json.
   */
  jsonFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with markdownlint.
   */
  markdownFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with prettier.
   */
  prettyFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with cspell.
   */
  spellingFilesExclude?: string[];
  /**
   * The files globs to exclude from linting with yaml.
   */
  yamlFilesExclude?: string[];
}

/**
 * Options for the zthunworks janitor system.
 */
export interface IZJanitorOptions {
  /**
   * Linting options for janitor-lint.
   */
  lint?: IZJanitorOptionsLint;
}
```

The value of each `*Config` can be a local path or a shared module such as
`@zthun/janitor-*-config`.

## Example config

The repo keeps its settings in `.config/janitorrc.mjs`:

```js
// .config/janitorrc.mjs
import {
  ZJanitorOptionsBuilder,
  ZJanitorOptionsLintBuilder,
} from "@zthun/janitor-options";

const lint = new ZJanitorOptionsLintBuilder()
  // Conventional globs for this workspace
  .commonEsFiles()
  .commonYamlFiles()
  // Reuse the same files for spell checks and format checks
  .generateSpellingFiles()
  .generatePrettyFiles()
  // Ignore build artifacts and vendored content
  .commonExcludes()
  .build();

export default new ZJanitorOptionsBuilder().lint(lint).build();
```

Point to shared configs if you want opinionated defaults:

```js
const lint = new ZJanitorOptionsLintBuilder()
  .esConfig("@zthun/janitor-eslint-config")
  .markdownConfig("@zthun/janitor-markdownlint-config")
  .prettyConfig("@zthun/janitor-prettier-config")
  .build();
```
