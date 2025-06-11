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
  .commonHtmlFiles()
  .commonMarkdownFiles()
  .commonJsonFiles()
  .commonYamlFiles()
  .generateSpellingFiles()
  .generatePrettyFiles()
  .commonExcludes()
  .build();

const config = new ZJanitorOptionsBuilder().lint(lint).build();
export default config;
