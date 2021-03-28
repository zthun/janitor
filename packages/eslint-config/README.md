# Description

This is the shared eslint configuration for @zthun scoped projects. Note that @zthun scoped projects, by default, use TypeScript so @typescript-eslint/eslint-plugin is required for this configuration.

## Getting Started

```sh
# NPM
npm install @zthun/eslint-config --save-dev
# Yarn
yarn add @zthun/eslint-config --dev
```

Make sure to install typescript and @typescript-eslint/eslint-plugin with all peer dependencies.

## Usage

In the .eslintrc file, add the following

```json
{
  "extends": ["@zthun"]
}
```

That's it. You now have the recommended rules for @zthun scoped projects with typescript.
