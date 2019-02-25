#!/usr/bin/env node

import * as yargs from 'yargs';
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
import { ZTsLint } from './zts-lint/zts-lint.class';
import { ZYamlLint } from './zyaml-lint/zyaml-lint.class';

const args: IZLintArgs = yargs.usage('$0 [options]')
  .alias('c', 'config')
  .describe('c', 'Optional config file to use.')
  .string('c')
  .help()
  .parse() as any;

const logger = console;
const nullConfigReader = new ZConfigNullReader();
const jsonConfigReader = new ZConfigReader(new ZConfigJsonParser());

const htmlhint = new ZHtmlHint();
const tslint = new ZTsLint();
const jsonlint = new ZJsonLint();
const yamllint = new ZYamlLint();

const zlint = new ZLint(logger);
zlint.eslint = new ZEsLint(logger);
zlint.sasslint = new ZSassLint(logger);
zlint.htmlhint = new ZFileLint(htmlhint, jsonConfigReader, logger, 'html');
zlint.tslint = new ZFileLint(tslint, jsonConfigReader, logger, 'ts');
zlint.jsonlint = new ZFileLint(jsonlint, nullConfigReader, logger, 'json');
zlint.yamllint = new ZFileLint(yamllint, nullConfigReader, logger, 'yaml');
zlint.run(args).then((result) => process.exitCode = result);
