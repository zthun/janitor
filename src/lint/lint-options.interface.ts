export interface IZLintOptions {
  esConfig?: string;
  tsConfig?: string;
  sassConfig?: string;
  styleConfig?: string;
  htmlConfig?: string;

  esFiles?: string[];
  tsFiles?: string[];
  sassFiles?: string[];
  styleFiles?: string[];
  htmlFiles?: string[];
  jsonFiles?: string[];
  yamlFiles?: string[];
}
