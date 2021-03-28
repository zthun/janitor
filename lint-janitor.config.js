module.exports = {
  esFiles: ['packages/**/src/**/*.ts', 'packages/*-config/index.js'],
  styleFiles: ['test/**/*.less', 'test/**/*.scss'],
  htmlFiles: ['test/**/*.html'],
  markdownFiles: ['./*.md'],
  jsonFiles: ['*.json', '.eslintrc', '.htmlhintrc', 'lint/.htmlhintrc', 'packages/**/*.json'],
  yamlFiles: ['./.travis.yml']
};
