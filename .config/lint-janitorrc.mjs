const generated = [
  "lerna.json",
  ".config/cspell.json",
  "**/CHANGELOG.md",
  "packages/**/dist/**",
  "packages/**/node_modules/**",
];

const esFiles = [
  "*.{js,cjs,mjs,ts,mts}",
  "packages/**/src/**/*.{ts,mts}",
  "packages/**/vite.config.ts",
  ".config/*.{js,cjs,mjs,ts,mts}",
];

const styleFiles = ["test/**/*.less", "test/**/*.scss"];
const htmlFiles = ["test/**/*.html"];
const markdownFiles = ["*.md", "packages/**/*.md", "packages/**/LICENSE"];
const jsonFiles = ["*.json", "packages/**/*.json", ".config/*.json"];
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
