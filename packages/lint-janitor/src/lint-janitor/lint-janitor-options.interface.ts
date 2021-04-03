export interface IZLintJanitorOptions {
  esConfig?: string;
  styleConfig?: string;
  htmlConfig?: string;
  markdownConfig?: string;
  spellingConfig?: string;

  esFiles?: string[];
  styleFiles?: string[];
  htmlFiles?: string[];
  markdownFiles?: string[];
  jsonFiles?: string[];
  yamlFiles?: string[];
  spellingFiles?: string[];
}
