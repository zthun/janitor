import {
  environments,
  react,
  recommended,
} from "@zthun/janitor-lint-config/eslint";

export default [
  ...recommended,
  ...react,
  ...environments.node,
  ...environments.browser,
];
