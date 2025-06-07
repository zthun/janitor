import type { IZJanitorOptions } from "@zthun/janitor-options";
import chalk from "chalk";
import { ZConfigExtender } from "../config/config-extender.mjs";
import { ZConfigReaderCosmic } from "../config/config-reader-cosmic.mjs";
import { ZConfigReaderNull } from "../config/config-reader-null.mjs";
import { ZConfigReaderPrettier } from "../config/config-reader-prettier.mjs";
import type { IZConfigReader } from "../config/config-reader.mjs";
import { ZContentLinterHtml } from "../content/content-linter-html.mjs";
import { ZContentLinterJson } from "../content/content-linter-json.mjs";
import { ZContentLinterPretty } from "../content/content-linter-pretty.mjs";
import { ZContentLinterYaml } from "../content/content-linter-yaml.mjs";
import { ZLinterEs } from "../linter/linter-es.mjs";
import { ZLinterFile } from "../linter/linter-file.mjs";
import { ZLinterMarkdown } from "../linter/linter-markdown.mjs";
import { ZLinterReport } from "../linter/linter-report.mjs";
import { ZLinterSpelling } from "../linter/linter-spelling.mjs";
import { ZLinterStyle } from "../linter/linter-style.mjs";
import type { IZLinter } from "../linter/linter.mjs";
import type { IZJanitorLintArgs } from "./janitor-lint-args.mjs";

/**
 * Represents the main entry point object for the application.
 */
export class ZJanitorLint {
  /**
   * The linter for js files.
   */
  public esLint: IZLinter;

  /**
   * The linter for cspell.  Useful for multiple file types.
   */
  public spellLint: IZLinter;

  /**
   * The linter for prettier formatting checks.
   */
  public prettyLint: IZLinter;

  /**
   * The linter for style files.
   */
  public styleLint: IZLinter;

  /**
   * The linter for html files.
   *
   * Currently, htmlhint has no support for cosmiconfig based paths, so we're going to
   * add them here.
   */
  public htmlHint: IZLinter;

  /**
   * The linter for json files.
   */
  public jsonLint: IZLinter;

  /**
   * The linter for yaml files.
   */
  public yamlLint: IZLinter;

  /**
   * The linter for markdown files.
   *
   * Markdownlint is a bit annoying with this.  They
   * don't really fully support the cosmiconfig standard,
   * and they only support the config files that are named
   * .markdownlint.yaml, .markdownlint.json, and .markdownlint.cjs
   */
  public markdownLint: IZLinter;

  /**
   * The configuration reader.
   */
  public config: IZConfigReader;

  /**
   * Initializes a new instance of this object.
   *
   * @param _logger -
   *        The logger to use when formatting output.
   */
  public constructor(private readonly _logger: Console) {
    this.esLint = new ZLinterReport(
      new ZLinterEs(this._logger),
      this._logger,
      "es",
    );
    this.spellLint = new ZLinterReport(
      new ZLinterSpelling(this._logger),
      this._logger,
      "various",
    );
    this.prettyLint = new ZLinterFile(
      new ZContentLinterPretty(),
      new ZConfigReaderPrettier(),
      this._logger,
      "pretty",
    );
    this.styleLint = new ZLinterReport(
      new ZLinterStyle(this._logger),
      this._logger,
      "style",
    );
    this.htmlHint = new ZLinterFile(
      new ZContentLinterHtml(),
      new ZConfigReaderCosmic("htmlhint", new ZConfigExtender()),
      this._logger,
      "html",
    );
    this.jsonLint = new ZLinterFile(
      new ZContentLinterJson(),
      new ZConfigReaderNull(),
      this._logger,
      "json",
    );
    this.yamlLint = new ZLinterFile(
      new ZContentLinterYaml(),
      new ZConfigReaderNull(),
      this._logger,
      "yaml",
    );
    this.markdownLint = new ZLinterReport(
      new ZLinterMarkdown(
        this._logger,
        new ZConfigReaderCosmic("markdownlint", new ZConfigExtender(), [
          ".markdownlint.json",
          ".markdownlint.yaml",
          ".markdownlint.cjs",
        ]),
      ),
      this._logger,
      "markdown",
    );
    this.config = new ZConfigReaderCosmic("janitor", new ZConfigExtender());
  }

  /**
   * Runs the lint given the required options.
   *
   * @param options -
   *        The lint options.
   *
   * @returns
   *        A promise that returns 0 if all linting was successful,
   *        and 1 if any of the linting failed.
   */
  public async lint(options: IZJanitorOptions): Promise<number> {
    let current = true;
    let result = true;
    const { lint = {} } = options;
    const {
      jsonFiles,
      jsonFilesExclude,
      yamlFiles,
      yamlFilesExclude,
      markdownConfig,
      markdownFiles,
      markdownFilesExclude,
      esConfig,
      esFiles,
      styleConfig,
      styleFiles,
      htmlConfig,
      htmlFiles,
      htmlFilesExclude,
      spellingConfig,
      spellingFiles,
      spellingFilesExclude,
      prettyConfig,
      prettyFiles,
      prettyFilesExclude,
    } = lint;

    if (jsonFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Linting json files from ${jsonFiles.length} globs.`,
        ),
      );
      current = await this.jsonLint.lint(jsonFiles, null, jsonFilesExclude);
      result = result && current;
    }

    if (yamlFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Linting yaml files from ${yamlFiles.length} globs.`,
        ),
      );
      current = await this.yamlLint.lint(yamlFiles, null, yamlFilesExclude);
      result = result && current;
    }

    if (markdownFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Linting markdown files from ${markdownFiles.length} globs.`,
        ),
      );
      current = await this.markdownLint.lint(
        markdownFiles,
        markdownConfig,
        markdownFilesExclude,
      );
      result = result && current;
    }

    if (esFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Linting ecmaScript files from ${esFiles.length} globs.`,
        ),
      );
      current = await this.esLint.lint(esFiles, esConfig, null);
      result = result && current;
    }

    if (styleFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Linting style files from ${styleFiles.length} globs.`,
        ),
      );
      current = await this.styleLint.lint(styleFiles, styleConfig, null);
      result = result && current;
    }

    if (htmlFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Linting html files from ${htmlFiles.length} globs.`,
        ),
      );
      current = await this.htmlHint.lint(
        htmlFiles,
        htmlConfig,
        htmlFilesExclude,
      );
      result = result && current;
    }

    if (spellingFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Checking spelling for ${spellingFiles.length} globs.`,
        ),
      );
      current = await this.spellLint.lint(
        spellingFiles,
        spellingConfig,
        spellingFilesExclude,
      );
      result = result && current;
    }

    if (prettyFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Checking formatting for ${prettyFiles.length} globs.`,
        ),
      );
      current = await this.prettyLint.lint(
        prettyFiles,
        prettyConfig,
        prettyFilesExclude,
      );
      result = result && current;
    }

    return result ? 0 : 1;
  }

  /**
   * Runs the application.
   *
   * @param args -
   *        The command line arguments.
   *
   * @returns
   *        A promise that returns 0 if all linting was
   *        successful, and 1 if any of the linting failed.
   */
  public async run(args: IZJanitorLintArgs): Promise<number> {
    try {
      const options = await this.config.read(args.config);
      return this.lint(options);
    } catch (err) {
      this._logger.error(err);
      return 1;
    }
  }
}
