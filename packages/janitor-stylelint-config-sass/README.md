# StyleLint Config

This is the shared stylelint configuration for zthun scoped projects using sass
instead of raw css.

## Getting Started

```sh
# NPM
npm install @zthun/janitor-stylelint-config-sass --save-dev
# Yarn
yarn add @zthun/janitor-stylelint-config-sass --dev
```

## Usage

In the stylelint config file, add the following

```json
{
  "extends": ["@zthun/janitor-stylelint-config-sass"]
}
```

That's it. You now have the recommended rules for zthun scoped projects.
