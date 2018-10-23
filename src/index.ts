import * as yargs from 'yargs';
import { ZEsLintEngineFactory } from './zeslint/zeslint-engine-factory.class';
import { ZEsLint } from './zeslint/zeslint.class';
import { IZLintArgs } from './zlint/zlint-args.interface';
import { ZLint } from './zlint/zlint.class';

const args: IZLintArgs = yargs.usage('$0 [args]')
  .alias('c', 'config')
  .describe('c', 'Optional config file to use.')
  .string('c')
  .help()
  .parse() as any;

const zlint = new ZLint(console);
zlint.eslint = new ZEsLint(new ZEsLintEngineFactory(), console);
zlint.run(args).then((result) => process.exitCode = result);
