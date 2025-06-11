// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ZJanitorOptionsBuilder,
  ZJanitorOptionsLintBuilder,
} from "@zthun/janitor-options";

const lint = new ZJanitorOptionsLintBuilder()
  .commonEsFiles()
  .commonCssFiles()
  .commonLessFiles()
  .commonSassFiles()
  .styleFile("test/**/*.{less,scss,sass,css}")
  .htmlFile("test/**/*.html")
  .markdownFile("*.md")
  .markdownFile("packages/**/*.md")
  .markdownFile("packages/**/LICENSE")
  .jsonFile("*.json")
  .jsonFile("packages/**/*.json")
  .jsonFile(".config/*.json")
  .yamlFile("*.yml")
  .yamlFile(".circleci/*.yml")
  .generateSpellingFiles()
  .generatePrettyFiles()
  .excludeAll("lerna.json")
  .excludeAll(".config/cspell.json")
  .excludeAll("**/CHANGELOG.md")
  .excludeAll("packages/**/dist/**")
  .excludeAll("packages/**/node_modules/**")
  .build();

const config = new ZJanitorOptionsBuilder().lint(lint).build();
export default config;
