import * as fs from 'fs';
import { IZLintArgs } from './zlint-args.interface';
import { IZLintOptions } from './zlint-options.interface';
import { ZLint } from './zlint.class';
import { IZLinter } from './zlinter.interface';

import cosmiconfig = require('cosmiconfig');

jest.mock('cosmiconfig');
jest.mock('fs');

describe('ZLint', () => {
  let args: IZLintArgs;
  let options: IZLintOptions;
  let logger: Console;
  let eslint: IZLinter;
  let tslint: IZLinter;
  let htmlhint: IZLinter;
  let sasslint: IZLinter;
  let jsonlint: IZLinter;
  let yamllint: IZLinter;

  function createTestTarget() {
    const target = new ZLint(logger);
    target.eslint = eslint;
    target.tslint = tslint;
    target.htmlhint = htmlhint;
    target.sasslint = sasslint;
    target.jsonlint = jsonlint;
    target.yamllint = yamllint;
    return target;
  }

  beforeEach(() => {
    eslint = {} as any;
    eslint.lint = jest.fn(() => Promise.resolve(true));

    tslint = {} as any;
    tslint.lint = jest.fn(() => Promise.resolve(true));

    htmlhint = {} as any;
    htmlhint.lint = jest.fn(() => Promise.resolve(true));

    sasslint = {} as any;
    sasslint.lint = jest.fn(() => Promise.resolve(true));

    jsonlint = {} as any;
    jsonlint.lint = jest.fn(() => Promise.resolve(true));

    yamllint = {} as any;
    yamllint.lint = jest.fn(() => Promise.resolve(true));

    logger = {} as any;
    logger.log = jest.fn();
    logger.error = jest.fn();

    args = {
      config: './cfg/zlint.json'
    };

    options = {
      esConfig: './.eslintrc',
      esFiles: ['**/*.js'],
      tsConfig: './tslint.json',
      tsFiles: ['**/*.ts'],
      sassConfig: './.sass-lint.yml',
      sassFiles: ['**/*.scss'],
      htmlConfig: './.htmlhintrc',
      htmlFiles: ['**/*.html'],
      jsonFiles: ['**/*.json'],
      yamlFiles: ['**/*.yml']
    };

    (fs.readFile as any).mockImplementation((path, opts, callback) => callback(null, JSON.stringify(options)));
  });

  describe('Parsing', () => {
    it('reads the config file.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.parse(args);
      // Assert
      expect(fs.readFile).toHaveBeenCalledWith(args.config, ZLint.ConfigEncoding, expect.anything());
    });

    it('reads the cosmiconfig file if no config specified.', async () => {
      // Arrange
      const expected = './zlintrc';
      const target = createTestTarget();
      delete args.config;
      const search = jest.fn(() => Promise.resolve({ filepath: expected }));
      (cosmiconfig as any).mockImplementation(() => ({ search }));
      // Act
      await target.parse(args);
      // Assert
      expect(fs.readFile).toHaveBeenCalledWith(expected, ZLint.ConfigEncoding, expect.anything());
    });

    it('retrieves the options if a key of zlint is found.', async () => {
      // Arrange
      const target = createTestTarget();
      (fs.readFile as any).mockImplementation((path, opts, callback) => callback(null, JSON.stringify({ zlint: options })));
      // Act
      const actual = await target.parse(args);
      // Assert
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(options));
    });

    it('retrieves the options directly if there is no zlint key found in the config.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.parse(args);
      // Assert
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(options));
    });

    it('throws an exception if there are no config files.', async () => {
      // Arrange
      const target = createTestTarget();
      delete args.config;
      const search = jest.fn(() => Promise.resolve(null));
      (cosmiconfig as any).mockImplementation(() => ({ search }));
      // Act
      // Assert
      expect(target.parse(args)).rejects.toBeDefined();
    });

    it('throws an exception if the config file cannot be read.', async () => {
      // Arrange
      const target = createTestTarget();
      (fs.readFile as any).mockImplementation((file, encoding, callback) => callback('Cannot open file'));
      // Act
      // Assert
      expect(target.parse(args)).rejects.toBeDefined();
    });
  });

  describe('Linting', () => {
    async function assertLinterInvoked(linter: IZLinter, files: string[], config?: string) {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(options);
      // Assert
      if (config) {
        expect(linter.lint).toHaveBeenCalledWith(files, config);
      } else {
        expect(linter.lint).toHaveBeenCalledWith(files);
      }
    }

    async function assertLinterNotInvoked(linter: IZLinter) {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(options);
      // Assert
      expect(linter.lint).not.toHaveBeenCalled();
    }

    describe('EsLint', () => {
      it('invokes the linter if there are esFiles', async () => {
        await assertLinterInvoked(eslint, options.esFiles, options.esConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.esConfig;
        await assertLinterInvoked(eslint, options.esFiles, ZLint.DefaultEsLintConfig);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.esFiles;
        await assertLinterNotInvoked(eslint);
      });
    });

    describe('TsLint', () => {
      it('invokes the linter if there are tsFiles', async () => {
        await assertLinterInvoked(tslint, options.tsFiles, options.tsConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.tsConfig;
        await assertLinterInvoked(tslint, options.tsFiles, ZLint.DefaultTsLintConfig);
      });

      it('does not invoke the linter if there are no tsFiles.', async () => {
        delete options.tsFiles;
        await assertLinterNotInvoked(tslint);
      });
    });

    describe('SassLint', () => {
      it('invokes the linter if there are sassFiles', async () => {
        await assertLinterInvoked(sasslint, options.sassFiles, options.sassConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.sassConfig;
        await assertLinterInvoked(sasslint, options.sassFiles, ZLint.DefaultSassLintConfig);
      });

      it('does not invoke the linter if there are no sassFiles.', async () => {
        delete options.sassFiles;
        await assertLinterNotInvoked(sasslint);
      });
    });

    describe('HtmlHint', () => {
      it('invokes the linter if there are htmlFiles', async () => {
        await assertLinterInvoked(htmlhint, options.htmlFiles, options.htmlConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.htmlConfig;
        await assertLinterInvoked(htmlhint, options.htmlFiles, ZLint.DefaultHtmlHintConfig);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.htmlFiles;
        await assertLinterNotInvoked(htmlhint);
      });
    });

    describe('JsonLint', () => {
      it('invokes the linter if there are jsonFiles', async () => {
        await assertLinterInvoked(jsonlint, options.jsonFiles);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.jsonFiles;
        await assertLinterNotInvoked(jsonlint);
      });
    });

    describe('YamlLint', () => {
      it('invokes the linter if there are yamlFiles', async () => {
        await assertLinterInvoked(yamllint, options.yamlFiles);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.yamlFiles;
        await assertLinterNotInvoked(yamllint);
      });
    });
  });

  describe('Running', () => {
    it('returns 0 if the linting is successful.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(0);
    });

    it('returns 1 if any linting fails.', async () => {
      // Arrange
      const target = createTestTarget();
      eslint.lint = jest.fn(() => Promise.resolve(false));
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it('returns 1 if any parsing fails.', async () => {
      // Arrange
      const target = createTestTarget();
      (fs.readFile as any).mockImplementation((file, enc, callback) => callback('Failed'));
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it('logs parse errors.', async () => {
      // Arrange
      const target = createTestTarget();
      (fs.readFile as any).mockImplementation((file, enc, callback) => callback('Failed'));
      // Act
      await target.run(args);
      // Assert
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
