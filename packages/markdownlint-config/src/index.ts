import { Configuration } from "markdownlint";

const config: Configuration = {
  // We actually want support sometimes for custom html and images in
  // markdown so we need to allow it.
  "no-inline-html": false,
};

export default config;
