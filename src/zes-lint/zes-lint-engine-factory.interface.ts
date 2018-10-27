import { CLIEngine } from 'eslint';

export interface IZEsLintEngineFactory {
  create(options: CLIEngine.Options): CLIEngine;
}
