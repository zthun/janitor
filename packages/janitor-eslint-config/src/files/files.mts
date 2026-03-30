// JavaScript and TypeScript based
export const ExtJs = "js,cjs,mjs";
export const ExtTs = "ts,mts,cts";
export const ExtJsx = "jsx,mjsx,cjsx";
export const ExtTsx = "tsx,mtsx,ctsx";
// Css styles
export const ExtCss = "css";
// HTML
export const ExtHtml = "html,htm";

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
  return extensions.map((ext) => `**/*.{${ext}}`);
}
