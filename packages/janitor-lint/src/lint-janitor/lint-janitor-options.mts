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
  htmlFilesExclude?: string[];
  markdownFiles?: string[];
  markdownFilesExclude?: string[];
  jsonFiles?: string[];
  jsonFilesExclude?: string[];
  yamlFiles?: string[];
  yamlFilesExclude?: string[];
  spellingFiles?: string[];
  spellingFilesExclude?: string[];
  prettyFiles?: string[];
  prettyFilesExclude?: string[];
}
