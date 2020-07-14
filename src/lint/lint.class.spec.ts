import { readFile } from 'fs';
import { cosmiconfig } from 'cosmiconfig';
import { IZLintArgs } from './lint-args.interface';
import { IZLintOptions } from './lint-options.interface';
import { ZLint } from './lint.class';
import { IZLinter } from './linter.interface';

jest.mock('cosmiconfig');
jest.mock('fs');

describe('ZLint', () => {
  let args: IZLintArgs;
  let options: IZLintOptions;
  let logger: Console;
  let esLint: IZLinter;
  let tsLint: IZLinter;
  let htmlHint: IZLinter;
  let sassLint: IZLinter;
  let jsonLint: IZLinter;
  let yamlLint: IZLinter;
  let styleLint: IZLinter;

  function createTestTarget() {
    const target = new ZLint(logger);
    target.esLint = esLint;
    target.tsLint = tsLint;
    target.htmlHint = htmlHint;
    target.sassLint = sassLint;
    target.jsonLint = jsonLint;
    target.yamlLint = yamlLint;
    target.styleLint = styleLint;
    return target;
  }

  beforeEach(() => {
    esLint = {} as any;
    esLint.lint = jest.fn(() => Promise.resolve(true));

    tsLint = {} as any;
    tsLint.lint = jest.fn(() => Promise.resolve(true));

    htmlHint = {} as any;
    htmlHint.lint = jest.fn(() => Promise.resolve(true));

    sassLint = {} as any;
    sassLint.lint = jest.fn(() => Promise.resolve(true));

    jsonLint = {} as any;
    jsonLint.lint = jest.fn(() => Promise.resolve(true));

    yamlLint = {} as any;
    yamlLint.lint = jest.fn(() => Promise.resolve(true));

    styleLint = {} as any;
    styleLint.lint = jest.fn(() => Promise.resolve(true));

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
      styleConfig: './.stylelintrc.json',
      styleFiles: ['**/*.css', '**/*.less'],
      htmlConfig: './.htmlhintrc',
      htmlFiles: ['**/*.html'],
      jsonFiles: ['**/*.json'],
      yamlFiles: ['**/*.yml']
    };

    ((readFile as unknown) as jest.Mock<any, any>).mockImplementation((path, opts, callback) => callback(null, JSON.stringify(options)));
  });

  describe('Parsing', () => {
    it('reads the config file.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.parse(args);
      // Assert
      expect(readFile).toHaveBeenCalledWith(args.config, ZLint.ConfigEncoding, expect.anything());
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
      expect(readFile).toHaveBeenCalledWith(expected, ZLint.ConfigEncoding, expect.anything());
    });

    it('retrieves the options if a key of zlint is found.', async () => {
      // Arrange
      const target = createTestTarget();
      (readFile as any).mockImplementation((path, opts, callback) => callback(null, JSON.stringify({ zlint: options })));
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
      (readFile as any).mockImplementation((file, encoding, callback) => callback('Cannot open file'));
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
        await assertLinterInvoked(esLint, options.esFiles, options.esConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.esConfig;
        await assertLinterInvoked(esLint, options.esFiles, ZLint.DefaultEsLintConfig);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.esFiles;
        await assertLinterNotInvoked(esLint);
      });
    });

    describe('TsLint', () => {
      it('invokes the linter if there are tsFiles', async () => {
        await assertLinterInvoked(tsLint, options.tsFiles, options.tsConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.tsConfig;
        await assertLinterInvoked(tsLint, options.tsFiles, ZLint.DefaultTsLintConfig);
      });

      it('does not invoke the linter if there are no tsFiles.', async () => {
        delete options.tsFiles;
        await assertLinterNotInvoked(tsLint);
      });
    });

    describe('SassLint', () => {
      it('invokes the linter if there are sassFiles', async () => {
        await assertLinterInvoked(sassLint, options.sassFiles, options.sassConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.sassConfig;
        await assertLinterInvoked(sassLint, options.sassFiles, ZLint.DefaultSassLintConfig);
      });

      it('does not invoke the linter if there are no sassFiles.', async () => {
        delete options.sassFiles;
        await assertLinterNotInvoked(sassLint);
      });
    });

    describe('StyleLint', () => {
      it('invokes the linter if there are styleFiles', async () => {
        await assertLinterInvoked(styleLint, options.styleFiles, options.styleConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.styleConfig;
        await assertLinterInvoked(styleLint, options.styleFiles, ZLint.DefaultStyleLintConfig);
      });

      it('does not invoke the linter if there are no styleFiles.', async () => {
        delete options.styleFiles;
        await assertLinterNotInvoked(styleLint);
      });
    });

    describe('HtmlHint', () => {
      it('invokes the linter if there are htmlFiles', async () => {
        await assertLinterInvoked(htmlHint, options.htmlFiles, options.htmlConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.htmlConfig;
        await assertLinterInvoked(htmlHint, options.htmlFiles, ZLint.DefaultHtmlHintConfig);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.htmlFiles;
        await assertLinterNotInvoked(htmlHint);
      });
    });

    describe('JsonLint', () => {
      it('invokes the linter if there are jsonFiles', async () => {
        await assertLinterInvoked(jsonLint, options.jsonFiles);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.jsonFiles;
        await assertLinterNotInvoked(jsonLint);
      });
    });

    describe('YamlLint', () => {
      it('invokes the linter if there are yamlFiles', async () => {
        await assertLinterInvoked(yamlLint, options.yamlFiles);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.yamlFiles;
        await assertLinterNotInvoked(yamlLint);
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
      esLint.lint = jest.fn(() => Promise.resolve(false));
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it('returns 1 if any parsing fails.', async () => {
      // Arrange
      const target = createTestTarget();
      (readFile as any).mockImplementation((file, enc, callback) => callback('Failed'));
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it('logs parse errors.', async () => {
      // Arrange
      const target = createTestTarget();
      (readFile as any).mockImplementation((file, enc, callback) => callback('Failed'));
      // Act
      await target.run(args);
      // Assert
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
