import { ZTypedocConfigBuilder } from "@zthun/janitor-build-config/typedoc";

const config = new ZTypedocConfigBuilder()
  .web()
  .entry("../*")
  .favicon("public/images/svg/janitor.svg")
  .build();

export default config;
