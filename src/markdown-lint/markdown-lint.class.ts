import chalk from 'chalk';
import { IOptions, sync } from 'glob';
import { some, values } from 'lodash';
import markdownlint, { Options } from 'markdownlint';
import { promisify } from 'util';
import { IZConfigReader } from '../common/config-reader.interface';
import { IZLinter } from '../common/linter.interface';

export class ZMarkdownLint implements IZLinter {
  private _globOptions: IOptions = { dot: true };

  public constructor(private readonly _logger: Console, private readonly _reader: IZConfigReader) {}

  public async lint(src: string[], cfg: string): Promise<boolean> {
    let config: any;

    try {
      config = await this._reader.read(cfg);
    } catch (err) {
      this._logger.error(chalk.red(err));
      return false;
    }

    let files: string[] = [];
    src.forEach((pattern) => (files = files.concat(sync(pattern, this._globOptions))));
    const options: Options = { files, config };
    const markdownLintAsync = promisify(markdownlint);
    const result = await markdownLintAsync(options);
    this._logger.log(`${result.toString().trim()}`);
    return !some(values(result), (val) => val.length > 0);
  }
}
