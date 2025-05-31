import { Config } from "stylelint";

const config: Config = {
  extends: [
    "stylelint-config-standard-less",
    "@zthun/janitor-stylelint-config",
  ],
};

export default config;
