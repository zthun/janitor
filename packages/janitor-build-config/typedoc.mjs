// This first import is a little goofy -> basically, typedoc does't support
// typescript path configs, so directly importing the source is not
// possible, so we we have to do instead is go from the actual output
// build.  This one is a bit strange since it imports from itself.

import { ZTypedocConfigBuilder } from "@zthun/janitor-build-config/typedoc";

const config = new ZTypedocConfigBuilder()
  .project()
  .entry("./src/typedoc/index.mts")
  .entry("./src/vite/index.mts")
  .build();
export default config;
