/* eslint-disable require-jsdoc */
import { cosmiconfig } from 'cosmiconfig';
import { IZLintJanitorArgs } from './lint-janitor-args.interface';
import { IZLintJanitorOptions } from './lint-janitor-options.interface';
import { ZLintJanitor } from './lint-janitor.class';
import { IZLinter } from '../common/linter.interface';

jest.mock('cosmiconfig');

describe('ZLintJanitor', () => {
  let args: IZLintJanitorArgs;
  let options: IZLintJanitorOptions;
  let logger: Console;
  let esLint: IZLinter;
  let tsLint: IZLinter;
  let htmlHint: IZLinter;
  let sassLint: IZLinter;
  let jsonLint: IZLinter;
  let yamlLint: IZLinter;
  let styleLint: IZLinter;
  let markdownLint: IZLinter;
  let load: jest.Mock;
  let search: jest.Mock;

  function createTestTarget() {
    const target = new ZLintJanitor(logger);
    target.esLint = esLint;
    target.htmlHint = htmlHint;
    target.jsonLint = jsonLint;
    target.yamlLint = yamlLint;
    target.styleLint = styleLint;
    target.markdownLint = markdownLint;
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

    markdownLint = {} as any;
    markdownLint.lint = jest.fn(() => Promise.resolve(true));

    logger = {} as any;
    logger.log = jest.fn();
    logger.error = jest.fn();

    args = {
      config: './cfg/lint-janitor.json'
    };

    options = {
      esConfig: './.eslintrc',
      esFiles: ['**/*.js'],
      styleConfig: './.stylelintrc',
      styleFiles: ['**/*.css', '**/*.less', '**/*.scss', '**/*.sass'],
      markdownConfig: './.markdownlintrc',
      markdownFiles: ['**/*.md'],
      htmlConfig: './.htmlhintrc',
      htmlFiles: ['**/*.html'],
      jsonFiles: ['**/*.json'],
      yamlFiles: ['**/*.yml']
    };

    search = jest.fn(() => Promise.resolve({ filepath: 'lint-janitor.config.js' }));
    load = jest.fn(() => Promise.resolve({ config: options }));
    (cosmiconfig as jest.Mock).mockReturnValue({ search, load });
  });

  describe('Parsing', () => {
    it('reads the config file.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.parse(args);
      // Assert
      expect(load).toHaveBeenCalledWith(args.config);
    });

    it('reads the cosmiconfig file if no config specified.', async () => {
      // Arrange
      const target = createTestTarget();
      delete args.config;
      // Act
      const actual = await target.parse(args);
      // Assert
      expect(actual).toEqual(options);
    });

    it('retrieves the options directly if there is no key found in the config.', async () => {
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
      search = jest.fn(() => Promise.resolve(null));
      (cosmiconfig as jest.Mock).mockReturnValue({ search, load });
      // Act
      // Assert
      expect(target.parse(args)).rejects.toBeDefined();
    });

    it('throws an exception if the config file cannot be read.', async () => {
      // Arrange
      const target = createTestTarget();
      load = jest.fn(() => Promise.resolve(null));
      (cosmiconfig as jest.Mock).mockReturnValue({ search, load });
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
        await assertLinterInvoked(esLint, options.esFiles, ZLintJanitor.DefaultEsLintConfig);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.esFiles;
        await assertLinterNotInvoked(esLint);
      });
    });

    describe('StyleLint', () => {
      it('invokes the linter if there are styleFiles', async () => {
        await assertLinterInvoked(styleLint, options.styleFiles, options.styleConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.styleConfig;
        await assertLinterInvoked(styleLint, options.styleFiles, ZLintJanitor.DefaultStyleLintConfig);
      });

      it('does not invoke the linter if there are no styleFiles.', async () => {
        delete options.styleFiles;
        await assertLinterNotInvoked(styleLint);
      });
    });

    describe('MarkdownLint', () => {
      it('invokes the linter if there are markdownFiles', async () => {
        await assertLinterInvoked(markdownLint, options.markdownFiles, options.markdownConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.markdownConfig;
        await assertLinterInvoked(markdownLint, options.markdownFiles, ZLintJanitor.DefaultMarkdownLintConfig);
      });

      it('does not invoke the linter if there are no styleFiles.', async () => {
        delete options.markdownFiles;
        await assertLinterNotInvoked(markdownLint);
      });
    });

    describe('HtmlHint', () => {
      it('invokes the linter if there are htmlFiles', async () => {
        await assertLinterInvoked(htmlHint, options.htmlFiles, options.htmlConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.htmlConfig;
        await assertLinterInvoked(htmlHint, options.htmlFiles, ZLintJanitor.DefaultHtmlHintConfig);
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
      delete args.config;
      search = jest.fn(() => Promise.resolve(null));
      (cosmiconfig as jest.Mock).mockReturnValue({ search, load });
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it('logs parse errors.', async () => {
      // Arrange
      const target = createTestTarget();
      delete args.config;
      search = jest.fn(() => Promise.resolve(null));
      (cosmiconfig as jest.Mock).mockReturnValue({ search, load });
      // Act
      await target.run(args);
      // Assert
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
