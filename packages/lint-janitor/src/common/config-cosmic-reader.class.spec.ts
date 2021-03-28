/* eslint-disable require-jsdoc */
import { ZConfigCosmicReader } from './config-cosmic-reader.class';
import { IZConfigExtender } from './config-extender.interface';
import { cosmiconfig } from 'cosmiconfig';

jest.mock('cosmiconfig');

describe('ZConfigCosmicReader', () => {
  let config: string;
  let options: any;
  let extender: IZConfigExtender;
  let load: jest.Mock;
  let search: jest.Mock;

  function createTestTarget() {
    return new ZConfigCosmicReader('htmlhint', extender);
  }

  beforeEach(() => {
    extender = {} as any;
    extender.extend = jest.fn((cfg) => Promise.resolve(cfg));

    config = '.htmlhintrc';

    options = {
      'tagname-lowercase': true
    };

    search = jest.fn(() => Promise.resolve({ filepath: 'lint-janitor.config.js' }));
    load = jest.fn(() => Promise.resolve({ config: options }));
    (cosmiconfig as jest.Mock).mockReturnValue({ search, load });
  });

  it('reads the config file.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    await target.read(config);
    // Assert
    expect(load).toHaveBeenCalledWith(config);
  });

  it('reads the cosmiconfig file if no config specified.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read(null);
    // Assert
    expect(actual).toEqual(options);
  });

  it('retrieves the options directly if there is no key found in the config.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read(null);
    // Assert
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(options));
  });

  it('throws an exception if there are no config files.', async () => {
    // Arrange
    const target = createTestTarget();
    search = jest.fn(() => Promise.resolve(null));
    (cosmiconfig as jest.Mock).mockReturnValue({ search, load });
    // Act
    // Assert
    await expect(target.read(null)).rejects.toBeDefined();
  });

  it('throws an exception if the config file cannot be read.', async () => {
    // Arrange
    const target = createTestTarget();
    load = jest.fn(() => Promise.resolve(null));
    (cosmiconfig as jest.Mock).mockReturnValue({ search, load });
    // Act
    // Assert
    await expect(target.read(null)).rejects.toBeDefined();
  });
});
