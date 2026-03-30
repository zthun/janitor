/**
 * JavaScript specific extensions.
 */
export const ExtJs = ["js", "cjs", "mjs"];

/**
 * TypeScript specific extensions.
 */
export const ExtTs = ["ts", "mts", "cts"];

/**
 * JSX (React) specific extensions.
 */
export const ExtJsx = ["jsx", "mjsx", "cjsx"];

/**
 * TSX (React) specific extensions.
 */
export const ExtTsx = ["tsx", "mtsx", "ctsx"];

/**
 * A combination of all the JavaScript language based extensions.
 */
export const ExtEs = [...ExtJs, ...ExtJsx, ...ExtTs, ...ExtTsx];

/**
 * CSS specific extensions
 */
export const ExtCss = ["css"];

/**
 * HTML specific extensions
 */
export const ExtHtml = ["html", "htm"];

/**
 * Markdown specific extensions
 */
export const ExtMd = ["md"];

/**
 * Json specific extensions
 */
export const ExtJson = ["json", "jsonc", "json5"];

/**
 * Yaml specific extensions
 */
export const ExtYaml = ["yml", "yaml"];

/**
 * Generates the file patterns for the given extensions.
 *
 * @param extensions -
 *        The extensions to generate the file patterns for.
 *
 * @returns
 *        A glob pattern for each extension string provided.
 */
export function files(...extensions: string[]) {
  return extensions.map((ext) => `**/*.${ext}`);
}

/**
 * Generates the test file patterns for given extensions.
 *
 * @param extensions -
 *        The extensions to generate the test file patterns for.
 *
 * @returns
 *        A glob pattern for test files for each extension string provided.
 */
export function filesTest(...extensions: string[]) {
  return extensions.flatMap((ext) => [`**/*.test.${ext}`, `**/*.spec.${ext}`]);
}
