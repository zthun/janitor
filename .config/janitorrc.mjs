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
  .commonMarkdownFiles()
  .commonJsonFiles()
  .yamlFile("*.yml")
  .yamlFile(".circleci/*.yml")
  .generateSpellingFiles()
  .generatePrettyFiles()
  .excludeAll("lerna.json")
  .excludeAll(".config/cspell.json")
  .excludeAll("**/CHANGELOG.md")
  .excludeAll("packages/**/dist/**")
  .excludeAll("packages/**/node_modules/**")
  .excludeAll("**/node_modules/**")
  .excludeAll("**/dist/**")
  .build();

const config = new ZJanitorOptionsBuilder().lint(lint).build();
export default config;
