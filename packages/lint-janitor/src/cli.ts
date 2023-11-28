#!/usr/bin/env node

import usage from 'yargs';
import { IZLintJanitorArgs } from './lint-janitor/lint-janitor-args.mjs';
import { ZLintJanitor } from './lint-janitor/lint-janitor.mjs';

const args: IZLintJanitorArgs = usage('$0 [options]')
  .alias('c', 'config')
  .describe('c', 'Optional config file to use.')
  .string('c')
  .help()
  .parse() as any;
const janitor = new ZLintJanitor(console);
janitor.run(args).then((result) => (process.exitCode = result));
