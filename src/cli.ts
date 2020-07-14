#!/usr/bin/env node

import { usage } from 'yargs';
import { ZEsLint } from './es-lint/es-lint.class';
import { ZFileLint } from './file-lint/file-lint.class';
import { ZHtmlHint } from './html-hint/html-hint.class';
import { ZJsonLint } from './json-lint/json-lint.class';
import { ZConfigJsonParser } from './lint-config/config-json-parser.class';
import { ZConfigNullReader } from './lint-config/config-null-reader.class';
import { ZConfigReader } from './lint-config/config-reader.class';
import { IZLintArgs } from './lint/lint-args.interface';
import { ZLint } from './lint/lint.class';
import { ZSassLint } from './sass-lint/sass-lint.class';
import { ZTsLint } from './ts-lint/ts-lint.class';
import { ZYamlLint } from './yaml-lint/yaml-lint.class';

const args: IZLintArgs = usage('$0 [options]').alias('c', 'config').describe('c', 'Optional config file to use.').string('c').help().parse() as any;

const logger = console;
const nullConfigReader = new ZConfigNullReader();
const jsonConfigReader = new ZConfigReader(new ZConfigJsonParser());

const htmlHint = new ZHtmlHint();
const tsLint = new ZTsLint();
const jsonLint = new ZJsonLint();
const yamlLint = new ZYamlLint();

const zLint = new ZLint(logger);
zLint.esLint = new ZEsLint(logger);
zLint.sassLint = new ZSassLint(logger);
zLint.htmlHint = new ZFileLint(htmlHint, jsonConfigReader, logger, 'html');
zLint.tsLint = new ZFileLint(tsLint, jsonConfigReader, logger, 'ts');
zLint.jsonLint = new ZFileLint(jsonLint, nullConfigReader, logger, 'json');
zLint.yamlLint = new ZFileLint(yamlLint, nullConfigReader, logger, 'yaml');
zLint.run(args).then((result) => (process.exitCode = result));
