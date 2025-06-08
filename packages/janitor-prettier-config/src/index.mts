import type { Config } from "prettier";

const config: Config = {
  // Markdown will not format correct when ran through
  // prettier, so proseWrap is required always to enable
  // support for it.
  proseWrap: "always",
};

export default config;
