import { CLIEngine } from 'eslint';
import { IZEsLintEngineFactory } from './zeslint-engine-factory.interface';

/**
 * Represents a basic factory that constructs the eslint cli engine.
 */
export class ZEsLintEngineFactory implements IZEsLintEngineFactory {
  /**
   * Creates the cli engine.
   * 
   * @param options The options to the engine.
   * 
   * @return A new instance of a CLIEngine object. 
   */
  public create(options: CLIEngine.Options): CLIEngine {
    return new CLIEngine(options);
  }
}
