import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { IZConfigReader } from '../config/config-reader.interface';
import { ZLinterSilent } from '../linter/linter-silent.class';
import { IZLinter } from '../linter/linter.interface';
import { IZLintJanitorArgs } from './lint-janitor-args.interface';
import { IZLintJanitorOptions } from './lint-janitor-options.interface';
import { ZLintJanitor } from './lint-janitor.class';

describe('ZLintJanitor', () => {
  let args: IZLintJanitorArgs;
  let options: IZLintJanitorOptions;
  let config: Mocked<IZConfigReader>;
  let logger: Console;

  function createTestTarget() {
    const target = new ZLintJanitor(logger);
    target.esLint = new ZLinterSilent();
    target.htmlHint = new ZLinterSilent();
    target.jsonLint = new ZLinterSilent();
    target.yamlLint = new ZLinterSilent();
    target.styleLint = new ZLinterSilent();
    target.markdownLint = new ZLinterSilent();
    target.spellLint = new ZLinterSilent();
    target.prettyLint = new ZLinterSilent();
    target.config = config;
    return target;
  }

  beforeEach(() => {
    logger = {} as any;
    logger.log = vi.fn();
    logger.error = vi.fn();

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
      markdownFilesExclude: ['**/exclude.md'],
      htmlConfig: '@zthun/htmlhint-config',
      htmlFiles: ['**/*.html'],
      htmlFilesExclude: ['**/exclude.html'],
      jsonFiles: ['**/*.json'],
      jsonFilesExclude: ['**/exclude.json'],
      yamlFiles: ['**/*.yml'],
      yamlFilesExclude: ['**/exclude.yaml'],
      spellingConfig: './cspell.json',
      spellingFiles: ['**/*.md'],
      spellingFilesExclude: ['**/exclude.md'],
      prettyConfig: '@zthun/prettier-config',
      prettyFiles: ['**/*.ts'],
      prettyFilesExclude: ['**/exclude.ts']
    };

    config = {} as any;
    config.read = vi.fn();
    config.read.mockResolvedValue(options);
  });

  describe('Linting', () => {
    async function assertLinterInvoked(
      linter: (t: ZLintJanitor) => IZLinter,
      files: string[],
      config?: string,
      exclude?: string[]
    ) {
      // Arrange
      const target = createTestTarget();
      const expected = linter(target);
      vi.spyOn(expected, 'lint');
      // Act
      await target.lint(options);
      // Assert
      expect(expected.lint).toHaveBeenCalledWith(files, config, exclude);
    }

    async function assertLinterNotInvoked(linter: (t: ZLintJanitor) => IZLinter) {
      // Arrange
      const target = createTestTarget();
      const expected = linter(target);
      vi.spyOn(expected, 'lint');
      // Act
      await target.lint(options);
      // Assert
      expect(expected.lint).not.toHaveBeenCalled();
    }

    describe('EsLint', () => {
      it('invokes the linter if there are esFiles', async () => {
        await assertLinterInvoked((t) => t.esLint, options.esFiles, options.esConfig, null);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.esFiles;
        await assertLinterNotInvoked((t) => t.esLint);
      });
    });

    describe('StyleLint', () => {
      it('invokes the linter if there are styleFiles', async () => {
        await assertLinterInvoked((t) => t.styleLint, options.styleFiles, options.styleConfig, null);
      });

      it('does not invoke the linter if there are no styleFiles.', async () => {
        delete options.styleFiles;
        await assertLinterNotInvoked((t) => t.styleLint);
      });
    });

    describe('MarkdownLint', () => {
      it('invokes the linter if there are markdownFiles', async () => {
        await assertLinterInvoked(
          (t) => t.markdownLint,
          options.markdownFiles,
          options.markdownConfig,
          options.markdownFilesExclude
        );
      });

      it('does not invoke the linter if there are no styleFiles.', async () => {
        delete options.markdownFiles;
        await assertLinterNotInvoked((t) => t.markdownLint);
      });
    });

    describe('HtmlHint', () => {
      it('invokes the linter if there are htmlFiles', async () => {
        await assertLinterInvoked((t) => t.htmlHint, options.htmlFiles, options.htmlConfig, options.htmlFilesExclude);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.htmlFiles;
        await assertLinterNotInvoked((t) => t.htmlHint);
      });
    });

    describe('JsonLint', () => {
      it('invokes the linter if there are jsonFiles', async () => {
        await assertLinterInvoked((t) => t.jsonLint, options.jsonFiles, null, options.jsonFilesExclude);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.jsonFiles;
        await assertLinterNotInvoked((t) => t.jsonLint);
      });
    });

    describe('YamlLint', () => {
      it('invokes the linter if there are yamlFiles', async () => {
        await assertLinterInvoked((t) => t.yamlLint, options.yamlFiles, null, options.yamlFilesExclude);
      });

      it('does not invoke the linter if there are no esFiles.', async () => {
        delete options.yamlFiles;
        await assertLinterNotInvoked((t) => t.yamlLint);
      });
    });

    describe('SpellingLint', () => {
      it('invokes the linter if there are spellingFiles', async () => {
        await assertLinterInvoked(
          (t) => t.spellLint,
          options.spellingFiles,
          options.spellingConfig,
          options.spellingFilesExclude
        );
      });

      it('does not invoke the linter if there are no spellingFiles.', async () => {
        delete options.spellingFiles;
        await assertLinterNotInvoked((t) => t.spellLint);
      });
    });

    describe('PrettyLint', () => {
      it('invokes the linter if there are prettyFiles.', async () => {
        await assertLinterInvoked(
          (t) => t.prettyLint,
          options.prettyFiles,
          options.prettyConfig,
          options.prettyFilesExclude
        );
      });

      it('does not invoke the linter if there are no prettyFiles.', async () => {
        delete options.prettyFiles;
        await assertLinterNotInvoked((t) => t.prettyLint);
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
      target.esLint = new ZLinterSilent(false);
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
