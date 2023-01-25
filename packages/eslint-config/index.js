module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'import', 'tsdoc'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  rules: {
    'block-scoped-var': 'error',
    'eqeqeq': ['error', 'smart'],
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'strict': 'error',
    'no-undef': 'off',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true
      }
    ],
    'no-path-concat': 'error',
    'callback-return': 'error',
    'array-bracket-spacing': 'error',
    'array-element-newline': 'off',
    'block-spacing': 'error',
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'indent': 'off',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'line-comment-position': 'error',
    'linebreak-style': 'off',
    'lines-around-comment': 'off',
    'max-depth': 'error',
    'max-len': 'off',
    'max-lines': 'off',
    'max-nested-callbacks': 'off',
    'max-params': 'off',
    'max-statements': 'off',
    'max-statements-per-line': 'error',
    'multiline-ternary': 'off',
    'new-cap': 'off',
    'new-parens': 'error',
    'newline-per-chained-call': 'off',
    'no-array-constructor': 'error',
    'no-bitwise': 'off',
    'no-continue': 'off',
    'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    'no-mixed-operators': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': 'error',
    'no-negated-condition': 'off',
    'no-nested-ternary': 'off',
    'no-new-object': 'off',
    'no-plusplus': 'off',
    'no-tabs': 'error',
    'no-ternary': 'off',
    'no-trailing-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-newline': 'off',
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'off',
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': 'error',
    'operator-assignment': 'off',
    'operator-linebreak': 'off',
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': 'off',
    'quote-props': [
      'error',
      'consistent-as-needed',
      {
        keywords: false,
        numbers: true,
        unnecessary: true
      }
    ],
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'semi': 'error',
    'semi-spacing': 'error',
    'semi-style': 'error',
    'sort-keys': 'off',
    'sort-vars': 'off',
    'sort-imports': 'off',
    'space-before-blocks': 'error',
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': 'error',
    'switch-colon-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': 'off',
    'wrap-regex': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    'import/first': 'error',
    'import/no-absolute-path': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-deprecated': 'warn',

    'tsdoc/syntax': 'warn'
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    jasmine: true,
    mocha: true,
    jest: true,
    protractor: true,
    jquery: true
  }
};
