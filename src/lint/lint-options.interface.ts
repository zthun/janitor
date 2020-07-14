export interface IZLintOptions {
  esConfig?: string;
  sassConfig?: string;
  styleConfig?: string;
  htmlConfig?: string;

  esFiles?: string[];
  sassFiles?: string[];
  styleFiles?: string[];
  htmlFiles?: string[];
  jsonFiles?: string[];
  yamlFiles?: string[];
}
