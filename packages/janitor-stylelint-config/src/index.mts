import type { Config } from "stylelint";

const config: Config = {
  extends: ["stylelint-config-standard"],
  rules: {
    /**
     * We want to support the MUI style selectors which often do
     * ComponentName-root.
     *
     * We're just going to turn this off to support this.
     */
    "selector-class-pattern": null,
    /**
     * In general, it's best to avoid exotic fonts, but there
     * are a few that get used that can be pretty common.
     *
     * Material makes heavy use of the Roboto font, so that's
     * an exclusion that we are going to support.
     */
    "font-family-no-missing-generic-family-keyword": [
      true,
      { ignoreFontFamilies: ["Roboto"] },
    ],
  },
};

export default config;
