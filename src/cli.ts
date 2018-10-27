#!/usr/bin/env node

import * as yargs from 'yargs';
import { ZEsLintEngineFactory } from './zes-lint/zes-lint-engine-factory.class';
import { ZEsLint } from './zes-lint/zes-lint.class';
import { ZFileLint } from './zfile-lint/zfile-lint.class';
import { ZHtmlHint } from './zhtml-hint/zhtml-hint.class';
import { ZJsonLint } from './zjson-lint/zjson-lint.class';
import { ZConfigJsonParser } from './zlint-config/zconfig-json-parser.class';
import { ZConfigNullReader } from './zlint-config/zconfig-null-reader.class';
import { ZConfigReader } from './zlint-config/zconfig-reader.class';
import { IZLintArgs } from './zlint/zlint-args.interface';
import { ZLint } from './zlint/zlint.class';
import { ZSassLint } from './zsass-lint/zsass-lint.class';
import { ZYamlLint } from './zyaml-lint/zyaml-lint.class';

const args: IZLintArgs = yargs.usage('$0 [args]')
  .alias('c', 'config')
  .describe('c', 'Optional config file to use.')
  .string('c')
  .help()
  .parse() as any;

const zlint = new ZLint(console);
zlint.eslint = new ZEsLint(new ZEsLintEngineFactory(), console);
zlint.sasslint = new ZSassLint(require('sass-lint'), console);
zlint.htmlhint = new ZFileLint(new ZHtmlHint(), new ZConfigReader(new ZConfigJsonParser()), console, 'html');
zlint.jsonlint = new ZFileLint(new ZJsonLint(), new ZConfigNullReader(), console, 'json');
zlint.yamllint = new ZFileLint(new ZYamlLint(), new ZConfigNullReader(), console, 'yaml');
zlint.run(args).then((result) => process.exitCode = result);
