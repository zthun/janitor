import type { IZJanitorOptions } from "@zthun/janitor-options";
import chalk from "chalk";
import { ZConfigReaderCosmic } from "../config/config-reader-cosmic.mjs";
import { ZConfigReaderNull } from "../config/config-reader-null.mjs";
import { ZConfigReaderPrettier } from "../config/config-reader-prettier.mjs";
import type { IZConfigReader } from "../config/config-reader.mjs";
import { ZContentLinterJson } from "../content/content-linter-json.mjs";
import { ZContentLinterPretty } from "../content/content-linter-pretty.mjs";
import { ZContentLinterYaml } from "../content/content-linter-yaml.mjs";
import { ZLinterEs } from "../linter/linter-es.mjs";
import { ZLinterFile } from "../linter/linter-file.mjs";
import { ZLinterReport } from "../linter/linter-report.mjs";
import { ZLinterSpelling } from "../linter/linter-spelling.mjs";
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
   * The linter for json files.
   */
  public jsonLint: IZLinter;

  /**
   * The linter for yaml files.
   */
  public yamlLint: IZLinter;

  /**
   * The configuration reader.
   */
  public config: IZConfigReader<IZJanitorOptions>;

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

    this.config = new ZConfigReaderCosmic("janitor");
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
      esConfig,
      esFiles,
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
      current = await this.jsonLint.lint(
        jsonFiles,
        undefined,
        jsonFilesExclude,
      );
      result = result && current;
    }

    if (yamlFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Linting yaml files from ${yamlFiles.length} globs.`,
        ),
      );
      current = await this.yamlLint.lint(
        yamlFiles,
        undefined,
        yamlFilesExclude,
      );
      result = result && current;
    }

    if (esFiles) {
      this._logger.log(
        chalk.magenta.underline(
          `Linting ecmaScript files from ${esFiles.length} globs.`,
        ),
      );
      current = await this.esLint.lint(esFiles, esConfig, undefined);
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
