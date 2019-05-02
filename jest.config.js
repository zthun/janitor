module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.spec.json'
    }
  },
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
};
