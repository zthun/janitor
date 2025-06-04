// This first import is a little goofy -> basically, typedoc does't support
// typescript path configs, so directly importing the source is not
// possible, so we we have to do instead is go from the actual output
// build.  This one is a bit strange since it imports from itself.
// eslint-disable-next-line import/no-extraneous-dependencies
import { ZTypedocConfigBuilder } from "@zthun/janitor-build-config/typedoc";

const config = new ZTypedocConfigBuilder()
  .project()
  .entry("./src/typedoc/index.ts")
  .entry("./src/vite/index.ts")
  .build();
export default config;
