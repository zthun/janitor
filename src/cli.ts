#!/usr/bin/env node

import * as yargs from 'yargs';
import { ZEsLint } from './es-lint/es-lint.class';
import { ZFileLint } from './file-lint/file-lint.class';
import { ZHtmlHint } from './html-hint/html-hint.class';
import { ZJsonLint } from './json-lint/json-lint.class';
import { ZConfigJsonParser } from './lint-config/config-json-parser.class';
import { ZConfigNullReader } from './lint-config/config-null-reader.class';
import { ZConfigReader } from './lint-config/config-reader.class';
import { IZLintArgs } from './lint/lint-args.interface';
import { ZLint } from './lint/lint.class';
import { ZSassLint } from './zsass-lint/zsass-lint.class';
import { ZTsLint } from './ts-lint/ts-lint.class';
import { ZYamlLint } from './zyaml-lint/zyaml-lint.class';

const args: IZLintArgs = yargs.usage('$0 [options]').alias('c', 'config').describe('c', 'Optional config file to use.').string('c').help().parse() as any;

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
zlint.run(args).then((result) => (process.exitCode = result));
