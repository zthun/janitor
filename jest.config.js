module.exports = {
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  coverageDirectory: '../reports/coverage'
};
