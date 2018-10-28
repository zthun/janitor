export interface IZLintOptions {
  esConfig?: string;
  tsConfig?: string;
  sassConfig?: string;
  htmlConfig?: string;

  esFiles?: string[];
  tsFiles?: string[];
  sassFiles?: string[];
  htmlFiles?: string[];
  jsonFiles?: string[];
  yamlFiles?: string[];
}
