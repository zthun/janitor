import { resolve } from 'path';
import { ZSassLint } from './sass-lint.class';

describe('ZSassLint', () => {
  let config: string;
  let files: string[];
  let sasslint: any;
  let logger: Console;

  function createTestTarget() {
    const target = new ZSassLint(logger);
    target.sasslint = sasslint;
    return target;
  }

  beforeEach(() => {
    config = resolve(__dirname, '../../lint/.sass-lint.yml');
    logger = {} as any;
    logger.log = jest.fn();

    files = ['src/**/*.scss'];

    sasslint = require('sass-lint');
    jest.spyOn(sasslint, 'lintFiles').mockImplementation(() => ({}));
    jest.spyOn(sasslint, 'format').mockImplementation(() => 'Results');
    jest.spyOn(sasslint, 'errorCount').mockImplementation(() => ({ count: 0 }));
  });

  describe('Configuration', () => {
    it('uses the specified config file.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.lint(files, config);
      // Assert
      expect(sasslint.lintFiles).toHaveBeenCalledWith(expect.anything(), expect.anything(), config);
    });
  });

  describe('Linting', () => {
    it('returns true if there are no errors.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('returns false if there are errors.', async () => {
      // Arrange
      const target = createTestTarget();
      jest.spyOn(sasslint, 'errorCount').mockImplementation(() => ({ count: 1 }));
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('logs the output.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = sasslint.format();
      jest.spyOn(sasslint, 'errorCount').mockImplementation(() => 2);
      // Act
      const actual = await target.lint(files, config);
      // Assert
      expect(logger.log).toHaveBeenCalledWith(expected);
    });
  });
});
