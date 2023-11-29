# Markdownlint Config

This is the shared markdownlint configuration for zthun scoped projects.

## Getting Started

```sh
# NPM
npm install @zthun/markdownlint-config --save-dev
# Yarn
yarn add @zthun/markdownlint-config --dev
```

## Usage

In the markdownlint config file, add the following

```json
{
  "extends": ["@zthun/markdownlint-config"]
}
```

That's it. You now have the recommended rules for zthun scoped projects when using lint-janitor.

If you are using the Atom or VSCode plugin, it may not recognize the imported js configuration style. Instead, you can
use the provided as-json.json file.

```json
{
  "extends": "@zthun/markdownlint-config/as-json.json"
}
```

That works just as well.
