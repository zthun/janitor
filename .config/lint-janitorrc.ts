const generated = [
  "lerna.json",
  "**/CHANGELOG.md",
  "packages/**/dist/**",
  "packages/**/docs/**",
  "packages/**/node_modules/**",
];

const esFiles = [
  "packages/**/src/**/*.ts",
  "packages/**/src/**/*.mts",
  ".config/*.ts",
];

const styleFiles = ["test/**/*.less", "test/**/*.scss"];
const htmlFiles = ["test/**/*.html"];
const markdownFiles = ["*.md", "packages/**/*.md", "packages/**/LICENSE"];
const jsonFiles = ["*.json", "packages/**/*.json"];
const yamlFiles = ["*.yml", ".circleci/*.yml"];

const spellingFiles = esFiles
  .concat(styleFiles)
  .concat(htmlFiles)
  .concat(markdownFiles)
  .concat(jsonFiles)
  .concat(yamlFiles);
const prettyFiles = spellingFiles.slice();

export default {
  esFiles,
  styleFiles,
  htmlFiles,
  markdownFiles,
  markdownFilesExclude: generated,
  jsonFiles,
  yamlFiles,
  spellingFiles,
  spellingFilesExclude: generated,
  prettyFiles,
  prettyFilesExclude: generated,
};
