import {
  environments,
  react,
  recommended,
} from "@zthun/lint-janitor-config/eslint";

export default [
  ...recommended,
  ...react,
  ...environments.node,
  ...environments.browser,
];
