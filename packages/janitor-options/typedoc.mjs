import { ZTypedocConfigBuilder } from "@zthun/janitor-build-config/typedoc";

const config = new ZTypedocConfigBuilder().project().index().build();
export default config;
