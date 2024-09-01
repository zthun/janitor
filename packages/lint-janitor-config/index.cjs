module.exports = {
  configs: {
    eslint: require("./eslint"),
    eslintReact: require("./eslint-react"),
    htmlhint: require("./htmlhint"),
    markdownlint: require("./markdownlint.cjs"),
    prettier: require("./prettier.cjs"),
    stylelint: require("./stylelint.cjs"),
    stylelintLess: require("./stylelint-less.cjs"),
    stylelintSass: require("./stylelint-sass.cjs"),
  },
};
