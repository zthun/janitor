# HTMLHint Config

This is the shared htmlhint configuration for zthun scoped projects. Note that currently, as of htmlhint 0.14.x,
extendable configs are not supported, but lint-janitor indirectly adds support for it.

## Getting Started

```sh
# NPM
npm install @zthun/htmlhint-config --save-dev
# Yarn
yarn add @zthun/htmlhint-config --dev
```

## Usage

In the htmlhint config file, add the following

```json
{
  "extends": ["@zthun/htmlhint-config"]
}
```

That's it. You now have the recommended rules for zthun scoped projects.

## HTMLHint

The actual HTMLHint application does NOT support the extends pattern without lint-janitor.
