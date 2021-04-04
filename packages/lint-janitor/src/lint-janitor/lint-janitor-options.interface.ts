export interface IZLintJanitorOptions {
  esConfig?: string;
  styleConfig?: string;
  htmlConfig?: string;
  markdownConfig?: string;
  spellingConfig?: string;
  prettyConfig?: string;

  esFiles?: string[];
  styleFiles?: string[];
  htmlFiles?: string[];
  markdownFiles?: string[];
  jsonFiles?: string[];
  yamlFiles?: string[];
  spellingFiles?: string[];
  prettyFiles?: string[];
}
