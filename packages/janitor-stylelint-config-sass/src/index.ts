import { Config } from "stylelint";

const config: Config = {
  extends: [
    "stylelint-config-standard-sass",
    "@zthun/janitor-stylelint-config",
  ],
};

export default config;
