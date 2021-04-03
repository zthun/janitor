/* eslint-disable require-jsdoc */
import { IZConfigReader } from '../common/config-reader.interface';
import { IZLinter } from '../common/linter.interface';
import { ZSilentLint } from '../silent-lint/silent-lint.class';
import { IZLintJanitorArgs } from './lint-janitor-args.interface';
import { IZLintJanitorOptions } from './lint-janitor-options.interface';
import { ZLintJanitor } from './lint-janitor.class';

describe('ZLintJanitor', () => {
  let args: IZLintJanitorArgs;
  let options: IZLintJanitorOptions;
  let config: jest.Mocked<IZConfigReader>;
  let logger: Console;

  function createTestTarget() {
    const target = new ZLintJanitor(logger);
    target.esLint = new ZSilentLint();
    target.htmlHint = new ZSilentLint();
    target.jsonLint = new ZSilentLint();
    target.yamlLint = new ZSilentLint();
    target.styleLint = new ZSilentLint();
    target.markdownLint = new ZSilentLint();
    target.spellLint = new ZSilentLint();
    target.config = config;
    return target;
  }

  beforeEach(() => {
    logger = {} as any;
    logger.log = jest.fn();
    logger.error = jest.fn();

    args = {
      config: './cfg/lint-janitor.json'
    };

    options = {
      esConfig: '@zthun/eslint-config',
      esFiles: ['**/*.js'],
      styleConfig: '@zthun/stylelint-config',
      styleFiles: ['**/*.css', '**/*.less', '**/*.scss', '**/*.sass'],
      markdownConfig: '@zthun/markdownlint-config',
      markdownFiles: ['**/*.md'],
      htmlConfig: '@zthun/htmlhint-config',
      htmlFiles: ['**/*.html'],
      jsonFiles: ['**/*.json'],
      yamlFiles: ['**/*.yml'],
      spellingConfig: './cspell.json',
      spellingFiles: ['**/*.md']
    };

    config = {} as any;
    config.read = jest.fn();
    config.read.mockResolvedValue(options);
  });

  describe('Linting', () => {
    async function assertLinterInvoked(linter: (t: ZLintJanitor) => IZLinter, files: string[], config?: string) {
      // Arrange
      const target = createTestTarget();
      const expected = linter(target);
      jest.spyOn(expected, 'lint');
      // Act
      await target.lint(options);
      // Assert
      if (config !== undefined) {
        expect(expected.lint).toHaveBeenCalledWith(files, config);
      } else {
        expect(expected.lint).toHaveBeenCalledWith(files);
      }
    }

    async function assertLinterNotInvoked(linter: (t: ZLintJanitor) => IZLinter) {
      // Arrange
      const target = createTestTarget();
      const expected = linter(target);
      jest.spyOn(expected, 'lint');
      // Act
      await target.lint(options);
      // Assert
      expect(expected.lint).not.toHaveBeenCalled();
    }

    describe('EsLint', () => {
      it('invokes the linter if there are esFiles', async () => {
        await assertLinterInvoked((t) => t.esLint, options.esFiles, options.esConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.esConfig;
        await assertLinterInvoked((t) => t.esLint, options.esFiles, null);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.esFiles;
        await assertLinterNotInvoked((t) => t.esLint);
      });
    });

    describe('StyleLint', () => {
      it('invokes the linter if there are styleFiles', async () => {
        await assertLinterInvoked((t) => t.styleLint, options.styleFiles, options.styleConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.styleConfig;
        await assertLinterInvoked((t) => t.styleLint, options.styleFiles, null);
      });

      it('does not invoke the linter if there are no styleFiles.', async () => {
        delete options.styleFiles;
        await assertLinterNotInvoked((t) => t.styleLint);
      });
    });

    describe('MarkdownLint', () => {
      it('invokes the linter if there are markdownFiles', async () => {
        await assertLinterInvoked((t) => t.markdownLint, options.markdownFiles, options.markdownConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.markdownConfig;
        await assertLinterInvoked((t) => t.markdownLint, options.markdownFiles, null);
      });

      it('does not invoke the linter if there are no styleFiles.', async () => {
        delete options.markdownFiles;
        await assertLinterNotInvoked((t) => t.markdownLint);
      });
    });

    describe('HtmlHint', () => {
      it('invokes the linter if there are htmlFiles', async () => {
        await assertLinterInvoked((t) => t.htmlHint, options.htmlFiles, options.htmlConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.htmlConfig;
        await assertLinterInvoked((t) => t.htmlHint, options.htmlFiles, null);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.htmlFiles;
        await assertLinterNotInvoked((t) => t.htmlHint);
      });
    });

    describe('JsonLint', () => {
      it('invokes the linter if there are jsonFiles', async () => {
        await assertLinterInvoked((t) => t.jsonLint, options.jsonFiles);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.jsonFiles;
        await assertLinterNotInvoked((t) => t.jsonLint);
      });
    });

    describe('YamlLint', () => {
      it('invokes the linter if there are yamlFiles', async () => {
        await assertLinterInvoked((t) => t.yamlLint, options.yamlFiles);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.yamlFiles;
        await assertLinterNotInvoked((t) => t.yamlLint);
      });
    });

    describe('SpellingLint', () => {
      it('invokes the linter if there are spellingFiles', async () => {
        await assertLinterInvoked((t) => t.spellLint, options.spellingFiles, options.spellingConfig);
      });

      it('uses the default config if no config is specified.', async () => {
        delete options.spellingConfig;
        await assertLinterInvoked((t) => t.spellLint, options.spellingFiles, null);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.spellingFiles;
        await assertLinterNotInvoked((t) => t.spellLint);
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
      target.esLint = new ZSilentLint(false);
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it('returns 1 if any parsing fails.', async () => {
      // Arrange
      const target = createTestTarget();
      config.read.mockRejectedValue('Failed to read config');
      // Act
      const actual = await target.run(args);
      // Assert
      expect(actual).toEqual(1);
    });

    it('logs parse errors.', async () => {
      // Arrange
      const target = createTestTarget();
      config.read.mockRejectedValue('Failed to read config');
      // Act
      await target.run(args);
      // Assert
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
