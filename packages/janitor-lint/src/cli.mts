#!/usr/bin/env node

import usage from "yargs";
import type { IZJanitorLintArgs } from "./app/janitor-lint-args.mjs";
import { ZJanitorLint } from "./app/janitor-lint.mjs";

const args: IZJanitorLintArgs = usage("$0 [options]")
  .alias("c", "config")
  .describe("c", "Optional config file to use.")
  .string("c")
  .help()
  .parse() as IZJanitorLintArgs;

const janitor = new ZJanitorLint(console);
void janitor.run(args).then((result) => {
  process.exitCode = result;
});
