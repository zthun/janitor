# ESLint Config

This is the shared eslint configuration for zthun scoped projects.

## Getting Started

```sh
# NPM
npm install @zthun/janitor-eslint-config --save-dev
# Yarn
yarn add @zthun/janitor-eslint-config --dev
```

Make sure to install typescript and @typescript-eslint/eslint-plugin with all
peer dependencies.

## Usage

In the .eslintrc file, add the following

```json
{
  "extends": ["@zthun/janitor-eslint-config"]
}
```

That's it. You now have the recommended rules for zthun scoped projects with
typescript.
