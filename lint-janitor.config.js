var generated = ['**/CHANGELOG.md', 'packages/**/dist/**', 'packages/**/docs/**'];

module.exports = {
  esFiles: ['*.js', 'packages/**/src/**/*.ts', 'packages/*-config/index.js'],
  styleFiles: ['test/**/*.less', 'test/**/*.scss'],
  htmlFiles: ['test/**/*.html'],
  markdownFiles: ['*.md', 'packages/**/*.md'],
  markdownFilesExclude: generated,
  jsonFiles: ['*.json', 'packages/**/*.json'],
  yamlFiles: ['*.yml'],
  spellingFiles: ['packages/**/src/**/*.ts', '*.md', 'packages/**/*.md', 'packages/**/*.json'],
  spellingFilesExclude: generated,
  prettyFiles: ['packages/**/src/**/*.ts', '*.md', 'packages/**/*.json'],
  prettyFilesExclude: generated
};
